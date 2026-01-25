import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBankAccount, getBankAccounts } from "../store/slices/bankAccountSlice";

export default function AddBankAccount() {
  const dispatch = useDispatch();
  const { accounts, loading, error } = useSelector(state => state.bankAccount);

  const [form, setForm] = useState({
    bankName: "",
    accountNumber: "",
    balance: "",
    branch: "",
    type: "Current",
    holderName: "",
    openDate: new Date().toISOString().split("T")[0],
  });

  // Load all accounts on mount
  useEffect(() => {
    dispatch(getBankAccounts());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.bankName || !form.accountNumber || !form.balance) return;

    dispatch(createBankAccount(form));

    // Reset form after submit
    setForm({
      bankName: "",
      accountNumber: "",
      balance: "",
      branch: "",
      type: "Current",
      holderName: "",
      openDate: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <div className="max-w-full mx-auto bg-white p-6 rounded-2xl shadow-md border">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">
        Create Bank Account
      </h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* Bank Name */}
          <div>
            <label className="block text-sm text-black font-semibold mb-1">Bank Name *</label>
            <input
              type="text"
              value={form.bankName}
              onChange={e => setForm({ ...form, bankName: e.target.value })}
              className="w-full border p-2 rounded-lg focus:outline-blue-500"
            />
          </div>

          {/* Account Number */}
          <div>
            <label className="block text-sm text-black font-semibold mb-1">Account Number *</label>
            <input
              type="text"
              value={form.accountNumber}
              onChange={e => setForm({ ...form, accountNumber: e.target.value })}
              className="w-full border p-2 rounded-lg focus:outline-blue-500"
            />
          </div>

          {/* Holder Name */}
          <div>
            <label className="block text-sm text-black font-semibold mb-1">Account Holder Name *</label>
            <input
              type="text"
              value={form.holderName}
              onChange={e => setForm({ ...form, holderName: e.target.value })}
              className="w-full border p-2 rounded-lg focus:outline-blue-500"
            />
          </div>

          {/* Balance + Type */}
          <div className="flex gap-2">
            <div className="w-1/2">
              <label className="block text-sm text-black font-semibold mb-1">Opening Balance *</label>
              <input
                type="number"
                value={form.balance}
                onChange={e => setForm({ ...form, balance: e.target.value })}
                className="w-full border p-2 rounded-lg focus:outline-blue-500"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm text-black font-semibold mb-1">Account Type *</label>
              <select
                value={form.type}
                onChange={e => setForm({ ...form, type: e.target.value })}
                className="w-full border p-2 rounded-lg focus:outline-blue-500"
              >
                <option>Current</option>
                <option>Savings</option>
                <option>Business</option>
              </select>
            </div>
          </div>

          {/* Branch */}
          <div>
            <label className="block text-sm text-black font-semibold mb-1">Branch Name *</label>
            <input
              type="text"
              value={form.branch}
              onChange={e => setForm({ ...form, branch: e.target.value })}
              className="w-full border p-2 rounded-lg focus:outline-blue-500"
            />
          </div>

          {/* Open Date */}
          <div>
            <label className="block text-sm text-black font-semibold mb-1">Account Open Date *</label>
            <input
              type="date"
              value={form.openDate}
              onChange={e => setForm({ ...form, openDate: e.target.value })}
              className="w-full border p-2 rounded-lg focus:outline-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
        >
          Create Account
        </button>
      </form>

      {/* Accounts Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Bank Name</th>
              <th className="border px-2 py-1">Account Number</th>
              <th className="border px-2 py-1">Holder Name</th>
              <th className="border px-2 py-1">Balance</th>
              <th className="border px-2 py-1">Branch</th>
              <th className="border px-2 py-1">Type</th>
              <th className="border px-2 py-1">Open Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" className="text-center p-2">Loading...</td></tr>
            ) : accounts.length === 0 ? (
              <tr><td colSpan="7" className="text-center p-2">No accounts</td></tr>
            ) : (
              accounts.map((acc) => (
                <tr key={acc._id}>
                  <td className="border px-2 py-1">{acc.bankName}</td>
                  <td className="border px-2 py-1">{acc.accountNumber}</td>
                  <td className="border px-2 py-1">{acc.holderName}</td>
                  <td className="border px-2 py-1">{acc.balance}</td>
                  <td className="border px-2 py-1">{acc.branch}</td>
                  <td className="border px-2 py-1">{acc.type}</td>
                  <td className="border px-2 py-1">{acc.openDate.split("T")[0]}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

