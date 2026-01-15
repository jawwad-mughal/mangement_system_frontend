import React, { useEffect, useState } from "react";
import BankAccountsTable from "./BankAccountsTable";
import {
  createBankAccount,
  resetStatus,
} from "../store/slices/bankAccountSlice";
import { useDispatch, useSelector } from "react-redux";
export default function AddBankAccount() {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(
    (state) => state.bankAccount
  );
  const [form, setForm] = useState({
    bankName: "",
    accountNumber: "",
    balance: "",
    branch: "",
    type: "Current",
    holderName: "",
    openDate: new Date().toISOString().split("T")[0], // ✅ default today
  });

   const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.bankName || !form.accountNumber || !form.balance) {
      alert("Please fill all required fields");
      return;
    }

    dispatch(createBankAccount(form));
  };

  // ✅ Handle success & error
  useEffect(() => {
    if (success) {
      alert("Bank Account Created Successfully");

      setForm({
        bankName: "",
        accountNumber: "",
        balance: "",
        branch: "",
        type: "Current",
        holderName: "",
        openDate: new Date().toISOString().split("T")[0],
      });

      dispatch(resetStatus());
    }

    if (error) {
      alert(error);
      dispatch(resetStatus());
    }
  }, [success, error, dispatch]);

  return (
    <>
    <div className="max-w-full mx-auto bg-white p-6 rounded-2xl shadow-md border">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">
        Create Bank Account
      </h2>

      <form onSubmit={handleSubmit} >
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Bank Name */}
        <div>
          <label className="block text-sm text-black font-semibold mb-1">
            Bank Name *
          </label>
          <input
            type="text"
            placeholder="e.g. HBL Bank"
            value={form.bankName}
            onChange={(e) => setForm({ ...form, bankName: e.target.value })}
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
            value={form.accountNumber}
            onChange={(e) => setForm({ ...form, accountNumber: e.target.value })}
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
            value={form.holderName}
            onChange={(e) => setForm({ ...form, holderName: e.target.value })}
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
              value={form.balance}
              onChange={(e) => setForm({ ...form, balance: e.target.value })}
              className="w-full border p-2 rounded-lg focus:outline-blue-500"
            />
          </div>

          <div className="w-1/2">
            <label className="block text-sm text-black font-semibold mb-1">
              Account Type *
            </label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full border p-2 rounded-lg focus:outline-blue-500"
            >
              <option>Current</option>
              <option>Savings</option>
              <option>Business</option>
            </select>
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
            value={form.branch}
            onChange={(e) => setForm({ ...form, branch: e.target.value })}
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
            value={form.openDate}
            onChange={(e) => setForm({ ...form, openDate: e.target.value })}
            className="w-full border p-2 rounded-lg focus:outline-blue-500"
            />
        </div>

        </div>
        
        <button
          type="submit"
          className=" bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 "
          >
          Create Account
        </button>
      </form>
    </div>
    
    {/* <BankAccountsTable/> */}
  </>
  );
}
