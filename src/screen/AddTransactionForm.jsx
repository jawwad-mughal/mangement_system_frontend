import React, { useState } from "react";

export default function AddTransactionForm() {
  const [transaction, setTransaction] = useState({
    account: "",
    type: "",
    mode: "",
    amount: "",
    date: "",
    source: "",
    description: "",
  });

  const [transactions, setTransactions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !transaction.account ||
      !transaction.type ||
      !transaction.mode ||
      !transaction.amount ||
      !transaction.date
    ) {
      alert("Please fill all required fields!");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      ...transaction,
      amount: Number(transaction.amount),
    };

    setTransactions([...transactions, newTransaction]);

    // Reset form
    setTransaction({
      account: "",
      type: "",
      mode: "",
      amount: "",
      date: "",
      source: "",
      description: "",
    });

    alert("✅ Transaction Added Successfully!");
  };

  return (
    <div className="mt-3 bg-white rounded-2xl shadow-md p-6 max-w-full mx-auto border">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">
        Add Transaction (Deposit / Withdraw)
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-2">
          {/* Account */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Select Account <span className="text-red-500">*</span>
            </label>
            <select
              name="account"
              value={transaction.account}
              onChange={handleChange}
              className="w-full border border-black rounded-lg px-3 py-2"
            >
              <option value="">-- Select Account --</option>
              <option value="HBL Bank">HBL Bank - Ali Khan</option>
              <option value="MCB Bank">MCB Bank - Ahmed Traders</option>
              <option value="UBL Bank">UBL Bank - Sara Enterprises</option>
            </select>
          </div>

          {/* Transaction Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Transaction Type <span className="text-red-500">*</span>
            </label>
            <select
              name="type"
              value={transaction.type}
              onChange={handleChange}
              className="w-full border border-black rounded-lg px-3 py-2"
            >
              <option value="">-- Select Type --</option>
              <option value="Deposit">Deposit</option>
              <option value="Withdraw">Withdraw</option>
            </select>
          </div>

          {/* Mode */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Transaction Mode <span className="text-red-500">*</span>
            </label>
            <select
              name="mode"
              value={transaction.mode}
              onChange={handleChange}
              className="w-full border border-black rounded-lg px-3 py-2"
            >
              <option value="">-- Select Mode --</option>
              <option value="Online">Online</option>
              <option value="Cash">Cash</option>
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Amount (Rs.) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="amount"
              value={transaction.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              className="w-full border border-black rounded-lg px-3 py-2"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="date"
              value={transaction.date}
              onChange={handleChange}
              className="w-full border border-black rounded-lg px-3 py-2"
            />
          </div>

          {/* 👇 Deposit Source (only shows when Deposit selected) */}
          {transaction.type === "Deposit" && (
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Deposit Source <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="source"
                value={transaction.source}
                onChange={handleChange}
                placeholder="Enter who sent money or from where"
                className="w-full border border-black rounded-lg px-3 py-2"
              />
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Description (optional)
            </label>
            <textarea
              name="description"
              value={transaction.description}
              onChange={handleChange}
              placeholder="Enter any notes..."
              className="w-full border border-black rounded-lg px-3 py-2"
              rows="1"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-2"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
