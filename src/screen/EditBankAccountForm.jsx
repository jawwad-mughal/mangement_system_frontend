import React, { useState } from "react";

export default function EditBankAccountForm() {
  const [form, setForm] = useState({
    id: 1,
    bankName: "HBL Bank",
    accountNumber: "1234-5678-9012",
    holderName: "Ali Khan",
    balance: 50000,
    type: "Current",
    branch: "Saddar",
    openDate: "2024-01-01",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.bankName ||
      !form.accountNumber ||
      !form.holderName ||
      !form.balance ||
      !form.type ||
      !form.branch ||
      !form.openDate
    ) {
      alert("❌ Please fill all required fields!");
      return;
    }

    alert("✅ Account details updated successfully!");
  };

  return (
    <div className="mt-3 bg-white rounded-2xl shadow-md p-6 max-w-full mx-auto border">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">
        Edit Bank Account
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* Bank Name */}
          <div>
            <label className="block text-sm text-black font-semibold mb-1">
              Bank Name *
            </label>
            <input
              type="text"
              value={form.bankName}
              onChange={(e) => setForm({ ...form, bankName: e.target.value })}
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
              value={form.accountNumber}
              onChange={(e) =>
                setForm({ ...form, accountNumber: e.target.value })
              }
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
              value={form.holderName}
              onChange={(e) => setForm({ ...form, holderName: e.target.value })}
              placeholder="e.g. ABC Traders"
              className="w-full border p-2 rounded-lg focus:outline-blue-500"
            />
          </div>

          {/* Balance + Type */}
          <div className="flex gap-2">
            <div className="w-1/2">
              <label className="block text-sm text-black font-semibold mb-1">
                Balance *
              </label>
              <input
                type="number"
                value={form.balance}
                onChange={(e) => setForm({ ...form, balance: e.target.value })}
                placeholder="e.g. 50000"
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

          {/* Branch */}
          <div>
            <label className="block text-sm text-black font-semibold mb-1">
              Branch Name *
            </label>
            <input
              type="text"
              value={form.branch}
              onChange={(e) => setForm({ ...form, branch: e.target.value })}
              placeholder="e.g. Saddar Branch"
              className="w-full border p-2 rounded-lg focus:outline-blue-500"
            />
          </div>

          {/* Account Open Date */}
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

        {/* Buttons */}
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Update Account
        </button>
      </form>
    </div>
  );
}
