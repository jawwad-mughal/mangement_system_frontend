import React, { useEffect, useState } from "react";

export default function AddInvoiceForm() {
  const [invoice, setInvoice] = useState({
    invoiceNumber: "",
    date: "",
    customerId: "",
    items: [{ productId: "", quantity: "", price: "", amount: "" }],
    discount: "",
    tax: "",
    shipping: "",
    paidAmount: "",
    paymentMethod: "",
    notes: "",
  });

  // ✅ handle basic input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoice({ ...invoice, [name]: value });
  };
  
  // ✅ handle item input change
  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...invoice.items];
    newItems[index][name] = value;

    
    // auto calculate total
    if (name === "quantity" || name === "price") {
      const qty = parseFloat(newItems[index].quantity) || 0;
      const price = parseFloat(newItems[index].price) || 0;
      newItems[index].amount = qty * price;
    }

    setInvoice({ ...invoice, items: newItems });

  };

  // ✅ Add new item row
  const handleAddItem = () => {
    setInvoice({
      ...invoice,
      items: [
        ...invoice.items,
        { productId: "", quantity: "", price: "", amount: "" },
      ],
    });
  };

  // ✅ Remove item row
  const handleRemoveItem = (index) => {
    const newItems = invoice.items.filter((_, i) => i !== index);
    setInvoice({ ...invoice, items: newItems });
  };

 useEffect(() => {
  // calculate total of all item amounts
  let total = 0;

  invoice.items.forEach((item) => {
    const amount = parseFloat(item.amount) || 0;
    total += amount;
  });

  // update paidAmount automatically
  setInvoice((prev) => ({ ...prev, paidAmount: total }));

  console.log("🧮 Total Amount:", total);
}, [invoice.items]);

  // ✅ Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Invoice Data:", invoice);
    alert("✅ Invoice added successfully!");
    setInvoice({
      invoiceNumber: "",
      date: "",
      customerId: "",
      items: [{ productId: "", quantity: "", price: "", amount: "" }],
      discount: "",
      tax: "",
      shipping: "",
      paidAmount: "",
      paymentMethod: "",
      notes: "",
    });
  };

  return (
    <div className=" bg-white rounded-2xl shadow-md p-6 border max-w-full mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">🧾 Add Invoice</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Info */}
        <div className="flex justify-between gap-3">
          <div>
            <label className="block font-semibold mb-1">Invoice #</label>
            <input
              type="text"
              name="invoiceNumber"
              value={invoice.invoiceNumber}
              onChange={handleChange}
              placeholder="INV-001"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Invoice Date *</label>
            <input
              type="date"
              name="date"
              value={invoice.date}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* Items Table */}
        <div className="border rounded-lg p-3 bg-gray-50">
  <h3 className="font-semibold text-lg mb-2">Invoice Items</h3>

  {/* Table Header */}
  <div className="grid grid-cols-6 gap-3 font-semibold text-sm text-gray-700 mb-1">
    <span>Product</span>
    <span>Qty *</span>
    <span>Price *</span>
    <span>Amount *</span>
    <span>Action</span>
  </div>

  {/* Item Rows */}
  {invoice.items.map((item, index) => (
    <div
      key={index}
      className="grid grid-cols-6 gap-3 items-center mb-2"
    >
      {/* Product */}
      <select
        name="productId"
        value={item.productId}
        onChange={(e) => handleItemChange(index, e)}
        className="border rounded-lg px-2 py-2"
      >
        <option value="">Select Product</option>
        <option value="1">Product A</option>
        <option value="2">Product B</option>
      </select>

      {/* Quantity */}
      <input
        type="text"
        name="quantity"
        value={item.quantity}
        onChange={(e) => handleItemChange(index, e)}
        placeholder="Qty"
        className="border rounded-lg px-3 py-2"
      />

      {/* Price */}
      <input
        type="text"
        name="price"
        value={item.price}
        onChange={(e) => handleItemChange(index, e)}
        placeholder="Price"
        className="border rounded-lg px-3 py-2"
      />

      {/* Total */}
      <input
        type="text"
        value={item.amount}
        disabled
        className="border rounded-lg px-3 py-2 bg-gray-100"
      />

      {/* Remove Button */}
      <button
        type="button"
        onClick={() => handleRemoveItem(index)}
        className="bg-red-500 text-white rounded-lg px-3 py-2 hover:bg-red-600"
      >
        Remove
      </button>
    </div>
  ))}

  {/* Add Button */}
  <button
    type="button"
    onClick={handleAddItem}
    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
  >
    + Add Item
  </button>
</div>


        {/* Summary Fields */}
        <div className="grid grid-cols-4 gap-3">
          <div>
            <label className="block font-semibold mb-1">Discount (%)</label>
            <input
              type="number"
              name="discount"
              value={invoice.discount}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Tax (%)</label>
            <input
              type="number"
              name="tax"
              value={invoice.tax}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Shipping (Rs)</label>
            <input
              type="number"
              name="shipping"
              value={invoice.shipping}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Payment Method</label>
            <select
              name="paymentMethod"
              value={invoice.paymentMethod}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select</option>
              <option value="Cash">Cash</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Card">Card</option>
            </select>
          </div>
        </div>

        {/* Paid Amount */}
        <div>
          <label className="block font-semibold mb-1">Total Amount</label>
          <input
            type="number"
            name="paidAmount"
            value={invoice.paidAmount}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Notes */}
        <div className="mb-1">
          <label className="block font-semibold mb-1">Notes</label>
          <textarea
            name="notes"
            value={invoice.notes}
            onChange={handleChange}
            rows="2"
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Enter any notes..."
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Generate Invoice
        </button>
      </form>
    </div>
  );
}

