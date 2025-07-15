// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@chainlink/contracts/src/v0.8/automation/interfaces/AutomationCompatibleInterface.sol";


contract KampHostel is ReentrancyGuard{
    // student
    struct Student {
        uint256 balance;
        address student;
        bool hasActiveHostel;
        bool isRegistered;
    }
    mapping(address => Student) public studentProfile;

    struct HostelOwner {
        uint256 balance;
        address user;
        bool isRegistered;
        bool hasHostel;
    }
    mapping(address => HostelOwner) public hostelOwnerProfile;
// property struct
    struct Hostel{
            uint256 hostelId;
            address owner;
            string location;
            uint256 roomNo;
            uint256 rentAmount;
            address requestedBy;
            bool isRegistered;
            bool isRequested;
            bool isOccupied;
            string hostelName;
        }
        uint256 public indexedHostel;
        Hostel[] public listedHostels;
        mapping(bytes32 => bool) public isHostelRegistered;
    // studentProfileReceipt
    struct IssuedReceipt {
    uint256 hostelId;
    uint256 startDate;
    uint256 endDate;
    uint256 roomNo;
    address owner;
    address student;
    bool isSigned;
    bool isPaid;
    string hostelName;
}
     mapping(uint256 => IssuedReceipt) public issuedReceipts; // propertyId => receipt

    //  ========== vents =========
    event HostelOwnerRegistered(address indexed owner, bool isRegistered);
    event PropertyRegistered(address indexed owner, bool isRegistered);
    event StudentRegistered(address indexed student, bool isRegistered);
    event HostelRequested(address indexed student, uint256 proertyId);
    event ReceiptSigned(address indexed owner, address indexed student, uint256 hostelId);
    event Withdrawn(address indexed user, uint256 amount);
    event RentPaid(address indexed owner, address indexed student, uint256 amount);
    // =========== modifiers =====
     modifier onlyHostelOwner(){
        require(hostelOwnerProfile[msg.sender].isRegistered, "Unregistered HostelOwner");
        require(hostelOwnerProfile[msg.sender].user == msg.sender, "Not HostelOwner");
        _;
     }
     modifier onlyStudent(){
        require(studentProfile[msg.sender].isRegistered, "Student Unregistered");
        require(studentProfile[msg.sender].student == msg.sender, "Unregistered Student");
        _;
     }
    // =========== main functions ========
     //  **** registering HostelOwner ****
     function registerHostelOwner() external {
        require(!hostelOwnerProfile[msg.sender].isRegistered, "HostelOwner registered");
        hostelOwnerProfile[msg.sender] = HostelOwner( 0, msg.sender, true, false);
        emit HostelOwnerRegistered(msg.sender, true);
     }

      // *** Registering prperties ***
     function registerHostel(
        string memory _location, uint256 _roomNo, uint256 _amount, string memory _name)
         external onlyHostelOwner {
        //creating a unique key for the property
        bytes32 propertyKey = keccak256(abi.encodePacked(msg.sender, _location, _amount));
        require(!isHostelRegistered[propertyKey], "Hostel registered");

        listedHostels.push(Hostel(indexedHostel++, msg.sender, _location, _roomNo, _amount, address(0), true, false, false, _name));
        isHostelRegistered[propertyKey] = true;
        hostelOwnerProfile[msg.sender].hasHostel = true;
        emit PropertyRegistered(msg.sender, true);
     }

     //  *** registering a student ****
    function registerStudent() external{
        require(!studentProfile[msg.sender].isRegistered, "Student registered");
        require(!studentProfile[msg.sender].hasActiveHostel, "Student registered");
        studentProfile[msg.sender] = Student( 0, msg.sender, false, true );

        emit StudentRegistered(msg.sender, true);
    }

     // **** student function to request rental *****
    function hostelRentRequest(uint256 _hostelId) external onlyStudent{
        require(_hostelId < listedHostels.length, "Invalid hostel Id");
        Hostel storage hostel = listedHostels[_hostelId];

        require(!hostel.isOccupied, "Hostel occupied");
        require(!hostel.isRequested, "Taken");
        require(studentProfile[msg.sender].balance >= hostel.rentAmount, "Insufficient Funds");

        hostel.isRequested = true;
        hostel.requestedBy = msg.sender;
        emit HostelRequested(msg.sender, _hostelId);
    }

    // ****** sign hostel receipt =====
    function signHostelReceipt(uint256 _hostelId, uint256 _durationInDays) external onlyHostelOwner nonReentrant() {
    require(_hostelId < listedHostels.length, "Invalid Property ID");

    Hostel storage hostel = listedHostels[_hostelId];
    require(hostel.owner == msg.sender, "Not owner of this hostel");
    require(hostel.requestedBy != address(0), "No student requested it");
    require(hostel.isRequested == true, "No active request");
    require(!hostel.isOccupied, "Already occupied");

    address studentAddr = hostel.requestedBy;
    require(studentProfile[studentAddr].isRegistered, "Student not registered");
    issuedReceipts[hostel.hostelId] = IssuedReceipt({
        hostelId: hostel.hostelId,
        startDate: block.timestamp,
        endDate: block.timestamp + (_durationInDays * 1 days),
        roomNo: hostel.roomNo,
        owner: msg.sender,
        student: studentAddr,
        isSigned: true,
        isPaid: false,
        hostelName: hostel.hostelName

    });
    hostel.isOccupied = true;
    studentProfile[studentAddr].hasActiveHostel = true;

    emit ReceiptSigned(msg.sender, studentAddr, hostel.hostelId);
}

//    function to automate payment
    function autoHostelPayment(uint256 _hostelId) public nonReentrant {
    require(_hostelId < listedHostels.length, "Invalid hostelId");

    Hostel storage hostel = listedHostels[_hostelId];
    IssuedReceipt storage rent = issuedReceipts[_hostelId];

    require(rent.isSigned, "Receipt not signed");
    require(!rent.isPaid, "Already paid");
    require(rent.startDate > 0 && rent.endDate > rent.startDate, "Invalid period");
    require(studentProfile[rent.student].balance >= hostel.rentAmount, "Insufficient balance");

    // Perform payment
    studentProfile[rent.student].balance -= hostel.rentAmount;
    hostelOwnerProfile[rent.owner].balance += hostel.rentAmount;
    rent.isPaid = true;

    emit RentPaid(rent.owner, rent.student, hostel.rentAmount);
}

    //  reset verything after the renting period
    function timedStateReset() external {
    for(uint256 i = 0; i < listedHostels.length; i++){
        Hostel storage hostel = listedHostels[i];
        IssuedReceipt storage rent = issuedReceipts[hostel.hostelId];

        address newStudent = rent.student;
         rent.isSigned = false;
         rent.isPaid = false;
         rent.student = address(0);
         rent.startDate = 0;
         rent.endDate = 0;
         rent.roomNo = 0;
         rent.hostelName = "";

         hostel.isOccupied = false;
         hostel.isRequested = false;
         hostel.requestedBy = address(0);

        if(newStudent != address(0)){
            studentProfile[newStudent].hasActiveHostel = false;
        }
    }
}

// ====== student deposit function ========
    function studentDeposit() external payable onlyStudent nonReentrant{
        require(msg.value > 0, "Invalid Input");
        studentProfile[msg.sender].balance += msg.value;
    }
    // ========== withdraw ========
    function userWithdraw(uint256 _amount) external nonReentrant{
        require(_amount > 0, "Invalid amount");

        if(studentProfile[msg.sender].isRegistered){
            require(studentProfile[msg.sender].balance >= _amount, "insufficient funds ");
            studentProfile[msg.sender].balance -= _amount;
        }else if(hostelOwnerProfile[msg.sender].isRegistered){
            require(hostelOwnerProfile[msg.sender].balance >= _amount, "insufficient funds");
            hostelOwnerProfile[msg.sender].balance -= _amount;
        }else{
            revert("Not registered");
        }
        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success, "Withdraw failed");
        emit Withdrawn(msg.sender, _amount);
    }

//    ======== automation helpers ======
// function checkUpkeep(bytes calldata) external view override returns (
//     bool upkeepNeeded, bytes memory performData ){
//         for(uint i = 0; i < listedHostels.length; i++){
//             Hostel memory hostel = listedHostels[i];
//             IssuedReceipt memory receipt = issuedReceipts[hostel.hostelId];
//             // all cleanup
//             if(receipt.isSigned && receipt.isPaid && block.timestamp > receipt.startDate){
//                 return (true, abi.encode(hostel.hostelId, uint8(1)));
//             }
//             // clear payments
//             if(receipt.isSigned && !receipt.isPaid && receipt.startDate > 0 &&
//              receipt.endDate > receipt.startDate && block.timestamp >= receipt.startDate &&
//              studentProfile[receipt.student].balance >= hostel.rentAmount ){
//                 return (true, abi.encode(hostel.hostelId, uint8(2)));
//              }
//         }
//         return (false, bytes(""));
// }
// function performUpkeep(bytes calldata performData) external override{
//     (, uint8 actionType) = abi.decode(performData, (uint256,uint8));

//     if(actionType == 1){
//         timedStateReset();
//     }else if(actionType == 2){
//         autoHostelPayment();
//     }
// }

  // ========== VIEW FUNCTIONS ======
     function returnAllHostels() external view returns(Hostel[] memory){
        return listedHostels;
     }
     function returnStudentProfile() external view returns(Student memory){
        require(studentProfile[msg.sender].isRegistered, "Unregistered Student");
        return studentProfile[msg.sender];
     }
     function returnHostelOwnerProfile() external view returns (HostelOwner memory) {
        require(hostelOwnerProfile[msg.sender].isRegistered, "Unregistered HostelOwner");
          return hostelOwnerProfile[msg.sender];
       }
      function returnHostelReceipt() external view returns (IssuedReceipt memory) {
         for (uint i = 0; i < listedHostels.length; i++) {
            Hostel memory ids = listedHostels[i];
           if (
            issuedReceipts[ids.hostelId].student == msg.sender ||
            issuedReceipts[ids.hostelId].owner == msg.sender
            ) {
            return issuedReceipts[ids.hostelId];
        }
    }
    revert("No active rental found");
}
     // =========== Enable the contract to receive native ETH ========
     receive() external payable{}

}
