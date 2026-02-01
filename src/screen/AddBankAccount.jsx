import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBranch } from "../store/slices/branchSlice";
import {
  createBankAccount,
  getBankAccounts,
  updateBankAccount,
  deleteBankAccount,
  resetMessage
} from "../store/slices/bankAccountSlice";

export default function AddBankAccount() {
  const dispatch = useDispatch();
  const { accounts = [], loader, message } = useSelector(state => state.bankAccount);
  const { list: branches } = useSelector(state => state.branch);

  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    bankName: "",
    accountNumber: "",
    holderName: "",
    balance: "",
    branchCode: "",
    type: "Current",
    openDate: new Date().toISOString().split("T")[0],
  });

  // Fetch branches & accounts
  useEffect(() => { dispatch(getAllBranch()); }, [dispatch]);
  useEffect(() => { dispatch(getBankAccounts()); }, [dispatch]);

  // Clear messages
  useEffect(() => {
    if (message) {
      const t = setTimeout(() => dispatch(resetMessage()), 3000);
      return () => clearTimeout(t);
    }
  }, [message, dispatch]);

  // Form change
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, balance: Number(form.balance) };

    if (editId) {
      await dispatch(updateBankAccount({ ...payload, id: editId }));
       dispatch(getBankAccounts());
      setEditId(null);
    } else {
      await dispatch(createBankAccount(payload));
    }

    setForm({
      bankName: "",
      accountNumber: "",
      holderName: "",
      balance: "",
      branchCode: "",
      type: "Current",
      openDate: new Date().toISOString().split("T")[0],
    });
  };

  // Edit account
  const handleEdit = (acc) => {
    setEditId(acc._id);
    setForm({
      bankName: acc.bankName || "",
      accountNumber: acc.accountNumber || "",
      holderName: acc.holderName || "",
      balance: acc.balance || "",
      branchCode: acc.branchRef ? acc.branchRef.branchCode : "", // Safe: show correct branch
      type: acc.type || "Current",
      openDate: acc.openDate ? acc.openDate.split("T")[0] : new Date().toISOString().split("T")[0],
    });
  };

  // Delete account
  const handleDelete = (id) => {
     dispatch(deleteBankAccount({ id }));
  };

  // Helper: branchCode => branchName
  const getBranchName = (code) => {
    const b = branches.find(b => b.branchCode === code);
    return b ? b.branchName : "-";
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow border">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">
        {editId ? "Edit Bank Account" : "Create Bank Account"}
      </h2>

      {message && <div className="mb-4 p-2 rounded bg-gray-100 border">{message}</div>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          name="bankName"
          placeholder="Bank Name"
          className="border p-2 rounded"
          value={form.bankName}
          onChange={handleChange}
          required
        />

        <input
          name="accountNumber"
          placeholder="Account Number"
          className="border p-2 rounded"
          value={form.accountNumber}
          onChange={handleChange}
          required
        />

        <input
          name="holderName"
          placeholder="Holder Name"
          className="border p-2 rounded"
          value={form.holderName}
          onChange={handleChange}
          required
        />

        {/* Branch select: show name, save code */}
        <select
          name="branchCode"
          value={form.branchCode}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Branch</option>
          {branches.map(b => (
            <option key={b._id} value={b.branchCode}>{b.branchName}</option>
          ))}
        </select>

        <input
          name="balance"
          type="number"
          placeholder="Opening Balance"
          className="border p-2 rounded"
          value={form.balance}
          onChange={handleChange}
          required
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option>Current</option>
          <option>Savings</option>
          <option>Business</option>
        </select>

        <input
          name="openDate"
          type="date"
          className="border p-2 rounded"
          value={form.openDate}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 md:col-span-2"
        >
          {editId ? "Update Account" : "Create Account"}
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="border p-2">Bank</th>
              <th className="border p-2">Account #</th>
              <th className="border p-2">Holder</th>
              <th className="border p-2">Branch</th>
              <th className="border p-2">Balance</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loader ? (
              <tr><td colSpan="7" className="p-3 text-center">Loading...</td></tr>
            ) : accounts.length === 0 ? (
              <tr><td colSpan="7" className="p-3 text-center">No Accounts</td></tr>
            ) : (
              accounts.map(acc => (
                <tr key={acc._id} className="text-center">
                  <td className="border p-2">{acc.bankName}</td>
                  <td className="border p-2">{acc.accountNumber}</td>
                  <td className="border p-2">{acc.holderName}</td>
                  <td className="border p-2">{getBranchName(acc.branchRef?.branchCode)}</td>
                  <td className="border p-2">{acc.balance}</td>
                  <td className="border p-2">{acc.type}</td>
                  <td className="border p-2 space-x-2">
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                      onClick={() => handleEdit(acc)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 text-white px-2 py-1 rounded"
                      onClick={() => handleDelete(acc._id)}
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
    </div>
  );
}











