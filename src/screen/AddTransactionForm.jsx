import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBankAccounts } from "../store/slices/bankAccountSlice";
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../store/slices/transactionSlice";

export default function AddTransactionForm() {
  const dispatch = useDispatch();

  // Redux state
  const { accounts = [], loader: accountLoader } = useSelector(
    (state) => state.bankAccount
  );
  const { transactions = [], loader: transactionLoader } = useSelector(
    (state) => state.transactions
  );

  // Local state
  const [transaction, setTransaction] = useState({
    id: null,
    account: "",
    type: "",
    mode: "",
    amount: "",
    date: "",
    source: "",
    description: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  // Fetch accounts & transactions on mount
  useEffect(() => {
    dispatch(getBankAccounts());
    dispatch(getTransactions());
  }, [dispatch]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: value });
  };

  // Reset form
  const resetForm = () => {
    setTransaction({
      id: null,
      account: "",
      type: "",
      mode: "",
      amount: "",
      date: "",
      source: "",
      description: "",
    });
    setIsEdit(false);
  };

  // Format date for table display DD/MM/YYYY
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB");
  };

  // Format date for input[type=date] YYYY-MM-DD
  const formatDateForInput = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");
    return `${d.getFullYear()}-${month}-${day}`;
  };

  // Submit form for create/update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !transaction.account ||
      !transaction.type ||
      !transaction.mode ||
      !transaction.amount ||
      !transaction.date
    ) {
      alert("❌ Please fill all required fields");
      return;
    }

    if (transaction.type === "Deposit" && !transaction.source) {
      alert("❌ Please enter deposit source");
      return;
    }

    const payload = {
      ...transaction,
      amount:
        transaction.type === "Withdraw"
          ? -Number(transaction.amount)
          : Number(transaction.amount),
    };

    if (isEdit) {
      await dispatch(updateTransaction({ id: transaction.id, data: payload }));
      
    } else {
      await dispatch(createTransaction(payload));
      
    }

    resetForm();
  };

  // Edit transaction
  const handleEdit = (t) => {
    setTransaction({
      id: t._id,
      account: t.account?._id || "",
      type: t.type,
      mode: t.mode,
      amount: Math.abs(t.amount),
      date: t.date,
      source: t.source || "",
      description: t.description || "",
    });
    setIsEdit(true);
  };

  // Delete transaction
  const handleDelete = async (id) => {
    await dispatch(deleteTransaction(id));
  };

  // Get account name safely
  const getAccountName = (acc) => {
    if (!acc) return "Unknown";
    if (typeof acc === "string") {
      const found = accounts.find((a) => a._id === acc);
      return found ? found.bankName : "Unknown";
    }
    return acc.bankName || "Unknown";
  };

  return (
    <div className="mt-3 bg-white rounded-2xl shadow-md p-6 border">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">
        {isEdit ? "Edit Transaction" : "Add Transaction"}
      </h2>

      {/* Transaction Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-2">
          {/* Account */}
          <select
            name="account"
            value={transaction.account}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select Account</option>
            {accountLoader && <option>Loading...</option>}
            {!accountLoader &&
              accounts.map((acc) => (
                <option key={acc._id} value={acc._id}>
                  {acc.bankName}
                </option>
              ))}
          </select>

          {/* Transaction Type */}
          <select
            name="type"
            value={transaction.type}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Transaction Type</option>
            <option value="Deposit">Deposit</option>
            <option value="Withdraw">Withdraw</option>
          </select>

          {/* Mode */}
          <select
            name="mode"
            value={transaction.mode}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Mode</option>
            <option value="Cash">Cash</option>
            <option value="Online">Online</option>
          </select>

          {/* Amount */}
          <input
            type="number"
            name="amount"
            value={transaction.amount}
            onChange={handleChange}
            placeholder="Amount"
            className="border p-2 rounded"
          />

          {/* Date */}
          <input
            type="date"
            name="date"
            value={formatDateForInput(transaction.date)}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          {/* Source */}
          {transaction.type && (
            <input
              type="text"
              name="source"
              value={transaction.source}
              onChange={handleChange}
              placeholder={
                transaction.type === "Deposit" ? "Deposit Source" : "Withdraw To"
              }
              className="border p-2 rounded"
            />
          )}

          {/* Description */}
          <textarea
            name="description"
            value={transaction.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-2 rounded col-span-2"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            {isEdit ? "Update" : "Save"}
          </button>
          {isEdit && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Transaction List */}
      <h3 className="text-lg font-bold mt-6 mb-2">Transactions</h3>

      {transactionLoader ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Date</th>
              <th className="border p-2">Account</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t._id}>
                <td className="border p-2">{formatDate(t.date)}</td>
                <td className="border p-2">{getAccountName(t.account)}</td>
                <td className="border p-2">{t.type}</td>
                <td
                  className={`border p-2 font-bold ${
                    t.amount > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                    {Math.abs(t.amount)}
                </td>
                <td className="border p-2 flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(t)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(t._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}


