import React, { useState } from "react";
import axios from "axios";

export default function BankAccountsSummary() {
  const [accountNumber, setAccountNumber] = useState("");
  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const fetchSummary = async () => {
    if (!accountNumber) return alert("Enter account number");

    try {
      setLoading(true);
      const res = await axios.get(
        `https://mangement-system-backend.vercel.app/summary/${accountNumber}`,
      );

      setAccount(res.data.account);
      setTransactions(res.data.transactions || []);
    } catch (err) {
      console.error(err);
      alert("Account not found");
      setAccount(null);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-2xl shadow-sm border">
      {/* 🔍 Search */}
      <div className="flex  items-center gap-2">
        <div>
          <label className="text-sm text-blue-600 mr-2 font-semi">
            Enter Account Number
          </label>
          <input
            className="border p-1 rounded-lg"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="Enter Account Number"
          />
        </div>
        <button
          onClick={fetchSummary}
          className="bg-blue-600 h-8 text-white px-3 rounded"
        >
          Search
        </button>
      </div>

      {/* 🏦 Account Info */}
      {account && (
        <>
          <h2 className="text-xl font-bold text-blue-700 mt-4 mb-2">
            Account Summary Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 border p-3 rounded-lg">
            <Input label="Bank Name" value={account.bankName} />
            <Input label="Account Number" value={account.accountNumber} />
            <Input label="Account Holder Name" value={account.holderName} />
            <Input label="Opening Balance" value={account.balance} />
            <Input label="Account Type" value={account.type} />
            <Input label="Branch Name" value={account.branchRef?.branchName} />
            <Input
              label="Account Open Date"
              value={new Date(account.openDate).toISOString().split("T")[0]}
              type="date"
            />
          </div>
        </>
      )}

      {/* 📊 Transactions */}
      {transactions.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-4 border mt-4">
          <h3 className="text-xl font-bold mb-3 text-blue-700">
            Transaction Records
          </h3>

          <table className="min-w-full border">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="border px-2 py-1">#</th>
                <th className="border px-2 py-1">Date</th>
                <th className="border px-2 py-1">Type</th>
                <th className="border px-2 py-1">Mode</th>
                <th className="border px-2 py-1">Amount</th>
                <th className="border px-2 py-1">Date</th>
                <th className="border px-2 py-1">Source</th>
                <th className="border px-2 py-1">Description</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, i) => (
                <tr key={t._id}>
                  <td className="border px-2 py-1">{i + 1}</td>
                  <td className="border px-2 py-1">
                    {new Date(t.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td
                    className={`border px-2 py-1 font-semibold ${
                      t.type === "Deposit" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {t.type}
                  </td>
                  <td className="border px-2 py-1">{t.mode}</td>
                  <td className="border px-2 py-1">
                    {/* {t.type === "Withdraw" ? "" : ""} */}
                    {t.amount.toLocaleString()}
                  </td>
                  <td className="border px-2 py-1">
                    {new Date(t.date).toLocaleDateString()}
                  </td>
                  <td className="border px-2 py-1">{t.source || "-"}</td>
                  <td className="border px-2 py-1">{t.description || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {loading && <p className="mt-3 text-blue-600">Loading...</p>}
    </div>
  );
}

function Input({ label, value, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-semibold">{label}</label>
      <input
        type={type}
        value={value || ""}
        disabled
        className="w-full border p-2 rounded bg-gray-100"
      />
    </div>
  );
}
