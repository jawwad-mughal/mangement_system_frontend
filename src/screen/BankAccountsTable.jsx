import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function BankAccountsTable() {
  const navigate = useNavigate()
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      bankName: "HBL Bank",
      accountNumber: "1234-5678-9012",
      holderName: "Ali Khan",
      type: "Current",
      branch: "Saddar",
      balance: 50000,
      openDate: "2024-01-15",
    },
    {
      id: 2,
      bankName: "MCB Bank",
      accountNumber: "8765-4321-1111",
      holderName: "Ahmed Traders",
      type: "Savings",
      branch: "Gulberg",
      balance: 120000,
      openDate: "2023-11-05",
    },
    {
      id: 3,
      bankName: "UBL Bank",
      accountNumber: "9999-8888-7777",
      holderName: "Sara Enterprises",
      type: "Business",
      branch: "Clifton",
      balance: 80000,
      openDate: "2025-02-20",
    },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this account?")) {
      setAccounts(accounts.filter((acc) => acc.id !== id));
    }
  };

  return (
    <div className="mt-3 bg-white rounded-2xl shadow-md overflow-auto small-score h-[74vh] p-4 border">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">
        Bank Accounts List
      </h2>

      <table className="min-w-full text-sm text-left ">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-white px-4 py-2">#</th>
            <th className="border border-white px-4 py-2">Bank Name</th>
            <th className="border border-white px-4 py-2">Account No.</th>
            <th className="border border-white px-4 py-2">Holder</th>
            <th className="border border-white px-4 py-2">Type</th>
            <th className="border border-white px-4 py-2">Branch</th>
            <th className="border border-white px-4 py-2">Balance</th>
            <th className="border border-white px-4 py-2">Open Date</th>
            <th className="border border-white px-4 py-2 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {accounts.length === 0 ? (
            <tr>
              <td
                colSpan="9"
                className="text-center py-4 text-gray-500 border border-black"
              >
                No accounts added yet.
              </td>
            </tr>
          ) : (
            accounts.map((acc, i) => (
              <tr
                key={acc.id}
                className="hover:bg-gray-50 border border-black"
              >
                <td className="border border-black px-4 py-2">{i + 1}</td>
                <td className="border border-black px-4 py-2">{acc.bankName}</td>
                <td className="border border-black px-4 py-2">{acc.accountNumber}</td>
                <td className="border border-black px-4 py-2">{acc.holderName}</td>
                <td className="border border-black px-4 py-2">{acc.type}</td>
                <td className="border border-black px-4 py-2">{acc.branch}</td>
                <td className="border border-black px-4 py-2">Rs. {acc.balance}</td>
                <td className="border border-black px-4 py-2">{acc.openDate}</td>
                <td className=" px-4 py-2 flex justify-center items-center mt-1.5 gap-2">
                  <button
                    onClick={() => {navigate(`/banking/editebankaccount/${i}`) }}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(acc.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
