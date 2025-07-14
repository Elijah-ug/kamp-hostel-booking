# 🏠 KampHostel — Decentralized Hostel Booking for Students in Uganda

## 🧠 Problem

Many university and tertiary students in Uganda face challenges when trying to book hostels:
- ❌ No transparent or secure payment method
- ❌ Fraudulent listings and double-booking
- ❌ Inconvenient coordination with hostel owners
- ❌ Lack of trust between students and landlords

Students often send money before confirming room availability, while hostel owners also face no-shows and poor verification.

---

## ✅ Solution

**KampHostel** is a decentralized hostel booking platform that allows:
- 🧑‍🎓 **Students** to browse and reserve verified hostel rooms using smart contracts
- 🧑‍💼 **Hostel Owners** to list rooms and receive escrowed payments only when a booking is confirmed
- ⏱️ **Automation** to ensure refunds if bookings aren’t confirmed within a set time window (e.g., 24 hours)

All logic is handled onchain — no intermediaries.

---

## 💡 How It Works

1. 📝 **Hostel owners** register hostel rooms with price, location, and room name
2. 💳 **Students reserve** available rooms by paying into an escrow smart contract
3. ✅ **Hostel owners confirm** the booking within 24 hours
4. ⏱️ If no confirmation, funds are automatically refunded
5. 💰 If confirmed, funds are locked until the student checks in or the period expires
6. 🏧 Hostel owners can **withdraw earnings** securely after confirmation

---

## 🔐 Built With
- Solidity (`^0.8.x`)
- Chainlink Automation (optional for timeout logic)
- React + Tailwind (frontend)
- Hardhat for deployment/testing

---

## 🌍 Impact
> KampHostel empowers students to book safely and hostel owners to receive payments confidently — without fear of fraud or middlemen.

It’s simple, trustless, and tailored for **real-world impact in Uganda** and beyond.
