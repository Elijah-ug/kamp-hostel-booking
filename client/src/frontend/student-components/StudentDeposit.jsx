import { Button } from "@/components/ui/button"
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { fetchStudentDeposit } from "@/features/student/deposit/depositThunk"
import { parseEther } from "ethers"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

export default function StudentDeposit() {
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch()

  const handleTenantDeposit = () => {
    if (!amount || Number(amount) < 0 || isNaN(amount)) {
      console.log("Not A Number")
    }
    const parsedAmount = parseEther(amount.toString());
    dispatch(fetchStudentDeposit({ amount: parsedAmount }));
    console.log(parsedAmount)
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Deposit into your account</CardTitle>
        <CardDescription>
          Deposit below to enjoy the best from the platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label  htmlFor="number">Amount</Label>
              <Input value={amount} onChange={(e) => setAmount(e.target.value)}
                id="number" type="number" placeholder="0.05 CELO" required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button onClick={handleTenantDeposit}
          type="submit" className="w-full">
          Deposit
        </Button>
      </CardFooter>
    </Card>
  )
}
