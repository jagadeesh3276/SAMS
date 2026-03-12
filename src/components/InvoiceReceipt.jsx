// InvoiceReceipt.jsx
import React from "react";
// import MathBookImg from "../images/mathbook.jpg";

const InvoiceReceipt = () => {
  return (
    <div className="max-w-[900px] mx-auto mt-24 mb-10 bg-white border border-gray-300 p-5 rounded-xl shadow-md ml-[30%]">
      
      {/* Invoice Header */}
      <div className="flex justify-between items-center border-b-2 border-blue-600 pb-2 mb-5">
        <h2 className="text-2xl font-bold text-blue-600 m-0">Invoice Receipt</h2>
        <p><strong>Date:</strong> 20-Aug-2025</p>
      </div>

      {/* Invoice Details Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-2 bg-blue-600 text-white border-b border-gray-300">Field</th>
              <th className="text-left p-2 bg-blue-600 text-white border-b border-gray-300">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="p-2 border-b border-gray-300">S.No</td><td className="p-2 border-b border-gray-300">1</td></tr>
            <tr><td className="p-2 border-b border-gray-300">Category</td><td className="p-2 border-b border-gray-300">Books</td></tr>
            <tr>
              <td className="p-2 border-b border-gray-300">Product Name</td>
              <td className="p-2 border-b border-gray-300">
                Math Textbook <br />
                {/* <img src={MathBookImg} alt="Product Image" className="mt-2 max-w-[120px] border border-gray-300 rounded-md" /> */}
              </td>
            </tr>
            <tr><td className="p-2 border-b border-gray-300">HSN Code</td><td className="p-2 border-b border-gray-300">4901</td></tr>
            <tr><td className="p-2 border-b border-gray-300">Unit</td><td className="p-2 border-b border-gray-300">10</td></tr>
            <tr><td className="p-2 border-b border-gray-300">Price (₹)</td><td className="p-2 border-b border-gray-300">₹150</td></tr>
            <tr><td className="p-2 border-b border-gray-300">CGST</td><td className="p-2 border-b border-gray-300">9%</td></tr>
            <tr><td className="p-2 border-b border-gray-300">SGST</td><td className="p-2 border-b border-gray-300">9%</td></tr>
            <tr><td className="p-2 border-b border-gray-300">Total Cost</td><td className="p-2 border-b border-gray-300">₹1635</td></tr>
            <tr><td className="p-2 border-b border-gray-300">Purchase Agent</td><td className="p-2 border-b border-gray-300">Ravi Kumar</td></tr>
            <tr><td className="p-2 border-b border-gray-300">Location</td><td className="p-2 border-b border-gray-300">Hyderabad</td></tr>
            <tr><td className="p-2 border-b border-gray-300">Phone</td><td className="p-2 border-b border-gray-300">9876543210</td></tr>
            <tr><td className="p-2 border-b border-gray-300">Payment Status</td><td className="p-2 border-b border-gray-300">Prepaid</td></tr>
            <tr>
              <td className="p-2 border-b border-gray-300">Status</td>
              <td className="p-2 border-b border-gray-300">
                <span className="font-bold px-3 py-1 rounded-md bg-green-600 text-white">Approved</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-5 text-center text-gray-500 text-sm">
        <p>Thank you for your purchase! | This is a computer generated invoice.</p>
      </div>

    </div>
  );
};

export default InvoiceReceipt;
