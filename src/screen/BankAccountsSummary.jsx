import React, { useState } from "react";

export default function BankAccountsSummary() {
  // 🏦 Sample Accounts
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      bankName: "HBL Bank",
      holderName: "Ali Khan",
      accountNumber: "1234-5678-9012",
      balance: 50000,
      branch: "Saddar",
      openDate: "2024-01-15",
    },
    {
      id: 2,
      bankName: "MCB Bank",
      holderName: "Ahmed Traders",
      accountNumber: "8765-4321-1111",
      balance: 120000,
      branch: "Gulberg",
      openDate: "2023-11-05",
    },
  ]);

  // 💸 Sample Transactions
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      account: "HBL Bank",
      type: "Deposit",
      mode: "Online",
      amount: 15000,
      date: "2025-11-05",
      description: "Client Payment",
    },
    {
      id: 2,
      account: "HBL Bank",
      type: "Withdraw",
      mode: "Cash",
      amount: 5000,
      date: "2025-11-09",
      description: "Office Expenses",
    },
    {
      id: 3,
      account: "MCB Bank",
      type: "Deposit",
      mode: "Cash",
      amount: 20000,
      date: "2025-11-10",
      description: "Supplier Refund",
    },
  ]);

  // 📊 Summary
  const totalAccounts = accounts.length;
  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);
  const highest = accounts.reduce(
    (a, b) => (a.balance > b.balance ? a : b),
    accounts[0]
  );
  const recent = [...accounts].sort(
    (a, b) => new Date(b.openDate) - new Date(a.openDate)
  )[0];

  return (
    <div className="p-6 bg-gray-50 rounded-2xl shadow-sm border">
      {/* ✅ Top Summary Cards */}
      <div className="flex items-end flex-wrap gap-2 ">
        <div>
          <label className="text-sm text-blue-600 font-semibold">
            Enter Account Number
          </label>
          <input
          className="w-full border p-2 rounded-lg focus:outline-blue-500"
          type="text" placeholder="Enter Account Number" />
        </div>

          <button 
                  className="bg-blue-600 h-10 text-white px-3 py-1 rounded hover:bg-blue-600 "
                >
                    Search
                  </button>
        
      </div>
        <h2 className="text-xl font-bold text-blue-700 mt-3 mb-1.5">
          Account Summary Details
        </h2>

<div className="grid grid-cols-1 md:grid-cols-2 gap-2 border p-3 rounded-lg">
        {/* Bank Name */}
        <div>
          <label className="block text-sm text-black font-semibold mb-1">
            Bank Name *
          </label>
          <input
            type="text"
            placeholder="e.g. HBL Bank"
            className="w-full border p-2 rounded-lg focus:outline-blue-500"
          />
        </div>

        {/* Account Number */}
        <div>
          <label className="block text-sm text-black font-semibold mb-1">
            Account Number *
          </label>
          <input
            type="text"
            placeholder="e.g. 1234-5678-9012"
            className="w-full border p-2 rounded-lg focus:outline-blue-500"
          />
        </div>

        {/* Holder Name */}
        <div>
          <label className="block text-sm text-black font-semibold mb-1">
            Account Holder Name *
          </label>
          <input
            type="text"
            placeholder="e.g. ABC Traders"
            className="w-full border p-2 rounded-lg focus:outline-blue-500"
          />
        </div>

        {/* Opening Balance + Type */}
        <div className="flex gap-2">
          <div className="w-1/2">
            <label className="block text-sm text-black font-semibold mb-1">
              Opening Balance *
            </label>
            <input
              type="number"
              placeholder="e.g. 50000"
              className="w-full border p-2 rounded-lg focus:outline-blue-500"
            />
          </div>

          <div className="w-1/2">
            <label className="block text-sm text-black font-semibold mb-1">
              Account Type *
            </label>
           <input
            type="text"
            placeholder="e.g. Saddar Branch"
            className="w-full border p-2 rounded-lg focus:outline-blue-500"
          />
          </div>
        </div>

        {/* Branch Name */}
        <div>
          <label className="block text-sm text-black font-semibold mb-1">
            Branch Name *
          </label>
          <input
            type="text"
            placeholder="e.g. Saddar Branch"
            className="w-full border p-2 rounded-lg focus:outline-blue-500"
          />
        </div>

        {/* ✅ Account Open Date */}
        <div>
          <label className="block text-sm text-black font-semibold mb-1">
            Account Open Date *
          </label>
          <input
            type="date"
            className="w-full border p-2 rounded-lg focus:outline-blue-500"
          />
        </div>
      </div>

      {/* 🏦 Accounts & Transactions Table */}
      <div className="bg-white rounded-lg shadow-md p-4 border mt-3 overflow-y-auto">
          {transactions.length > 0 && (
        <div className="overflow-x-auto">
          <h3 className="text-xl font-bold mb-3 text-blue-700">
            Transaction Records
          </h3>
          <div className="flex gap-2 overflow-y-auto">
          <div className="">
            <label className="text-sm text-blue-600 font-semibold">
              Start Date:
            </label>
            <input
            className="w-full border p-2 rounded-lg focus:outline-blue-500"
            type="date" placeholder="Start Date" />
          </div>
          <div className="">
            <label className="text-sm text-blue-600 font-semibold">
              End Date:
            </label>
            <input
            className="w-full border p-2 rounded-lg focus:outline-blue-500"
            type="date" placeholder="End Date" />
          </div>
          <button 
                  className="bg-blue-600  text-white px-3 py-1 rounded hover:bg-blue-600 mt-6"
                >
                    Search
                  </button>
        </div>
          <table className="min-w-full border border-gray-300 rounded-lg mt-2">
            <thead className="bg-gray-100">
              <tr className="text-left text-white bg-blue-600" >
                <th className="border px-3 py-2">#</th>
                <th className="border px-3 py-2">Account</th>
                <th className="border px-3 py-2">Type</th>
                <th className="border px-3 py-2">Mode</th>
                <th className="border px-3 py-2">Amount</th>
                <th className="border px-3 py-2">Date</th>
                <th className="border px-3 py-2">Source</th>
                <th className="border px-3 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, i) => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="border px-3 py-2">{i + 1}</td>
                  <td className="border px-3 py-2">{t.account}</td>
                  <td
                    className={`border px-3 py-2 font-semibold ${
                      t.type === "Deposit" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {t.type}
                  </td>
                  <td className="border px-3 py-2">{t.mode}</td>
                  <td className="border px-3 py-2">{t.amount.toLocaleString()}</td>
                  <td className="border px-3 py-2">{t.date}</td>
                  <td className="border px-3 py-2">
                    {t.type === "Deposit" ? t.source || "-" : "-"}
                  </td>
                  <td className="border px-3 py-2">
                    {t.description || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      </div>
    </div>
  );
}
