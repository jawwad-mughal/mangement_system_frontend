import React, { useMemo, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import BankAccountsTable from "./BankAccountsTable";

export default function BankingDashboard() {
  const navigate = useNavigate()
  // --- Fake seed data ---
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      bankName: "HBL Bank",
      accountNumber: "1234-5678-9012",
      balance: 50000,
      type: "Current",
      branch: "Saddar",
      holderName: "ABC Traders",
      openingDate: "2023-05-10",
      status: "Active",
    },
    {
      id: 2,
      bankName: "MCB Bank",
      accountNumber: "9876-5432-1098",
      balance: 25000,
      type: "Savings",
      branch: "Main",
      holderName: "XYZ Enterprises",
      openingDate: "2024-01-20",
      status: "Active",
    },
  ]);

  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <div className="flex justify-between items-center mb-2 overflow-y-auto">
        <h1 className="text-2xl font-bold text-blue-700 ">Banking Mangement </h1>
        <div className="flex gap-1" >
        <button
            onClick={() => navigate("bankaccountsummary" )}
            className="bg-blue-600 text-white px-4 py-2 rounded whitespace-nowrap"
          >
            Account Summary
          </button>
        <button
            onClick={() => navigate("addtransaction")}
            className="bg-blue-600 text-white px-4 py-2 rounded whitespace-nowrap"
          >
            Add Transaction
          </button>
        <button
            onClick={() => navigate("addbankaccount")}
            className="bg-blue-600 text-white px-4 py-2 rounded whitespace-nowrap"
          >
            Create Account
          </button>

        </div>
      </div>

      <Outlet />

      <BankAccountsTable />

    </div>
  );
}
