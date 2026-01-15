import React, { useState } from "react";

export default function InvoiceList() {
  const [invoices, setInvoices] = useState([
    {
      id: 1,
      invoiceNumber: "INV-001",
      date: "2025-11-12",
      customerId: "Customer A",
      items: [
        { productId: "1", quantity: 2, price: 500, totalamount: 1000 },
        { productId: "2", quantity: 1, price: 300, totalamount: 300 },
      ],
      discount: 5,
      tax: 10,
      shipping: 100,
      paidAmount: 1200,
      paymentMethod: "Cash",
      notes: "Deliver within 3 days",
    },
    {
      id: 2,
      invoiceNumber: "INV-002",
      date: "2025-11-11",
      customerId: "Customer B",
      items: [{ productId: "3", quantity: 3, price: 200, totalamount: 600 }],
      discount: 0,
      tax: 8,
      shipping: 50,
      paidAmount: 700,
      paymentMethod: "Bank Transfer",
      notes: "",
    },
  ]);

  // ✅ Delete invoice
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      setInvoices(invoices.filter((inv) => inv.id !== id));
    }
  };

  // ✅ Calculate grand total
  const calculateTotal = (invoice) => {
    const itemsTotal = invoice.items.reduce(
      (sum, item) => sum + parseFloat(item.totalamount || 0),
      0
    );
    const discountAmt = (itemsTotal * (invoice.discount || 0)) / 100;
    const taxAmt = (itemsTotal * (invoice.tax || 0)) / 100;
    return itemsTotal - discountAmt + taxAmt + parseFloat(invoice.shipping || 0);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">📋 Invoice List</h2>

      {invoices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {invoices.map((inv) => (
            <div
              key={inv.id}
              className="bg-white rounded-2xl shadow-lg border p-5 hover:shadow-xl transition"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold text-gray-800">
                  {inv.invoiceNumber}
                </h3>
                <span className="text-sm text-gray-500">{inv.date}</span>
              </div>

              {/* Customer + Payment */}
              <div className="text-gray-700 text-sm mb-3">
                <p><strong>Customer:</strong> {inv.customerId}</p>
                <p><strong>Payment:</strong> {inv.paymentMethod}</p>
              </div>

              {/* Items */}
              <div className="border-t pt-2 mb-2">
                <h4 className="font-semibold text-gray-800 mb-1">Items:</h4>
                {inv.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between text-sm text-gray-600"
                  >
                    <span>Product #{item.productId}</span>
                    <span>
                      {item.quantity} × Rs {item.price} = Rs {item.totalamount}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="text-sm text-gray-700">
                <p>Discount: {inv.discount || 0}%</p>
                <p>Tax: {inv.tax || 0}%</p>
                <p>Shipping: Rs {inv.shipping || 0}</p>
                <p className="font-semibold text-lg mt-2">
                  Total: Rs {calculateTotal(inv).toFixed(2)}
                </p>
                <p className="text-green-600 font-medium">
                  Paid: Rs {inv.paidAmount}
                </p>
              </div>

              {/* Notes */}
              {inv.notes && (
                <p className="text-xs text-gray-500 mt-2 italic">
                  💬 {inv.notes}
                </p>
              )}

              {/* Buttons */}
              <div className="flex justify-end gap-2 mt-4">
                <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600">
                  View
                </button>
                <button className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(inv.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-10">
          No invoices available.
        </p>
      )}
    </div>
  );
}
