import React, { useState } from "react";

const InhouseTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({
    category: "",
    productName: "",
    hsnCode: "",
    unit: "",
    price: "",
    cgst: "",
    sgst: "",
    total: "",
  });

  const [items, setItems] = useState([
    {
      category: "Cleaning Kit",
      productName: "Ditergent",
      hsnCode: "12345",
      unit: "10",
      price: "200",
      cgst: "5",
      sgst: "2",
      total: "214",
    },
    {
      category: "Cleaning Kit",
      productName: "Floor clean",
      hsnCode: "12346",
      unit: "11",
      price: "500",
      cgst: "12",
      sgst: "5",
      total: "565",
    },
    {
      category: "Cleaning Kit",
      productName: "Broom sticks",
      hsnCode: "12347",
      unit: "15",
      price: "100",
      cgst: "5",
      sgst: "0",
      total: "105",
    },
  ]);

  const [formData, setFormData] = useState({
    category: "",
    productName: "",
    hsnCode: "",
    unit: "",
    price: "",
    cgst: "",
    sgst: "",
  });

  const [filters, setFilters] = useState({
    category: "",
    productName: "",
  });

  // handle input change for form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handle save new item
  const handleSave = () => {
    if (
      !formData.category ||
      !formData.productName ||
      !formData.hsnCode ||
      !formData.unit ||
      !formData.price ||
      !formData.cgst ||
      !formData.sgst
    ) {
      alert("Please fill all fields!");
      return;
    }

    const total =
      parseFloat(formData.price) +
      (parseFloat(formData.price) *
        (parseFloat(formData.cgst) + parseFloat(formData.sgst))) /
        100;

    const newItem = {
      ...formData,
      total: total.toFixed(2),
    };

    setItems((prev) => [...prev, newItem]);
    setFormData({
      category: "",
      productName: "",
      hsnCode: "",
      unit: "",
      price: "",
      cgst: "",
      sgst: "",
    });
    setIsModalOpen(false);
  };

  // handle edit change (inline)
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  // save edited row
  const handleSaveEdit = (index) => {
    const updatedItems = [...items];
    const total =
      parseFloat(editData.price) +
      (parseFloat(editData.price) *
        (parseFloat(editData.cgst) + parseFloat(editData.sgst))) /
        100;

    updatedItems[index] = { ...editData, total: total.toFixed(2) };
    setItems(updatedItems);
    setEditIndex(null);
  };

  // filter items
  const filteredItems = items.filter((item) => {
    const matchesCategory =
      !filters.category || item.category === filters.category;
    const matchesProduct =
      !filters.productName ||
      item.productName.toLowerCase().includes(filters.productName.toLowerCase());
    return matchesCategory && matchesProduct;
  });

  // unique categories for dropdown
  const categories = [...new Set(items.map((i) => i.category))];
// handle input change for form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handle save (new item)
  const handleInputSave = () => {
    if (
      !formData.category ||
      !formData.productName ||
      !formData.hsnCode ||
      !formData.unit ||
      !formData.price ||
      !formData.cgst ||
      !formData.sgst
    ) {
      alert("Please fill all fields!");
      return;
    }

    const newItem = {
      category: formData.category,
      productName: formData.productName,
      hsnCode: formData.hsnCode,
      unit: formData.unit,
      price: formData.price,
      cgst: formData.cgst,
      sgst: formData.sgst,
      total: (
        parseFloat(formData.price) +
        (parseFloat(formData.price) *
          (parseFloat(formData.cgst) + parseFloat(formData.sgst))) /
          100
      ).toFixed(2),
    };

    setItems((prev) => [...prev, newItem]);
    setFormData({
      category: "",
      productName: "",
      hsnCode: "",
      unit: "",
      price: "",
      cgst: "",
      sgst: "",
    });
    setIsModalOpen(false);
  };
  // STOCK SECTION
    const [stock, setStock] = useState([
      { productName: "Floor Cleaner", totalStock: 100, used: 20, date: "2025-01-10" },
      { productName: "Ditergent", totalStock: 60, used: 15, date: "2025-01-15" },
    ]);
  
    // DATE FILTER FOR STOCK (ONLY FROM DATE)
  const [stockFilter, setStockFilter] = useState({
    from: "",
  });
  
  // FILTER STOCK BASED ON FROM DATE ONLY
  const filteredStock = stock.filter((s) => {
    if (!stockFilter.from) return true;
    return s.date >= stockFilter.from;
  });
  
    // PURCHASE FORM (SAME AS MAIN TABLE)
    const [purchaseForm, setPurchaseForm] = useState({
      category: "",
      productName: "",
      hsnCode: "",
      unit: "",
      price: "",
      cgst: "",
      sgst: "",
      date: "",
    });
  
    // handle input change for modal form
    const handleAddItemChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    // handle save new item
    const handleAddItemSave = () => {
      if (
        !formData.category ||
        !formData.productName ||
        !formData.hsnCode ||
        !formData.unit ||
        !formData.price ||
        !formData.cgst ||
        !formData.sgst ||
        !formData.date
      ) {
        alert("Please fill all fields!");
        return;
      }
  
      const total =
        parseFloat(formData.price) +
        (parseFloat(formData.price) *
          (parseFloat(formData.cgst) + parseFloat(formData.sgst))) /
          100;
  
      const newItem = {
        ...formData,
        total: total.toFixed(2),
      };
  
      setItems((prev) => [...prev, newItem]);
  
      // Update stock automatically
      setStock((prev) => [
        ...prev,
        {
          productName: formData.productName,
          totalStock: parseInt(formData.unit),
          used: 0,
          date: formData.date,
        },
      ]);
  
      setFormData({
        category: "",
        productName: "",
        hsnCode: "",
        unit: "",
        price: "",
        cgst: "",
        sgst: "",
        date: "",
      });
  
      setIsModalOpen(false);
    };
  // VENDOR DETAILS SECTION WITH EDIT + DELETE SUPPORT
  const [vendors, setVendors] = useState([
    {
      vendorName: "Ramesh Kumar",
      shopName: "Sai Stationery Mart",
      location: "Dwaraka Nagar, Vizag",
      phone: "9876543210",
      email: "saistationery@gmail.com",
      gst: "37ABCDE1234F1Z9",
    },
  ]);
  
  // Vendor Form (Add + Edit)
  const [vendorForm, setVendorForm] = useState({
    vendorName: "",
    shopName: "",
    location: "",
    phone: "",
    email: "",
    gst: "",
  });
  
  const [editVendorIndex, setEditVendorIndex] = useState(null);
  // ADD OR UPDATE VENDOR
  const handleSaveVendor = () => {
    if (!vendorForm.vendorName || !vendorForm.shopName || !vendorForm.phone) {
      alert("Fill all required fields!");
      return;
    }
  
    if (editVendorIndex !== null) {
      // Update
      const updated = [...vendors];
      updated[editVendorIndex] = vendorForm;
      setVendors(updated);
      setEditVendorIndex(null);
    } else {
      // Add New
      setVendors((prev) => [...prev, vendorForm]);
    }
  
    setVendorForm({
      vendorName: "",
      shopName: "",
      location: "",
      phone: "",
      email: "",
      gst: "",
    });
  };
  
  // DELETE VENDOR
  const handleDeleteVendor = (index) => {
    if (window.confirm("Are you sure you want to delete this vendor?")) {
      setVendors((prev) => prev.filter((_, i) => i !== index));
    }
  };
  
  // PRINT VENDOR DETAILS REPORT
  const handlePrintVendor = (vendor) => {
    const win = window.open("", "_blank");
    win.document.write(`
      <html>
        <head>
          <title>Vendor Report</title>
          <style>
            body { font-family: Arial; padding: 20px; }
            h2 { text-align: center; }
            table { width: 100%; border-collapse: collapse; }
            td, th { border: 1px solid #444; padding: 10px; }
          </style>
        </head>
        <body>
  
          <h2>Vendor Report</h2>
  
          <table>
            <tr><th>Vendor Name</th><td>${vendor.vendorName}</td></tr>
            <tr><th>Shop Name</th><td>${vendor.shopName}</td></tr>
            <tr><th>Location</th><td>${vendor.location}</td></tr>
            <tr><th>Phone</th><td>${vendor.phone}</td></tr>
            <tr><th>Email</th><td>${vendor.email}</td></tr>
            <tr><th>GST Number</th><td>${vendor.gst}</td></tr>
          </table>
  
          <script>
            window.onload = () => window.print();
          </script>
  
        </body>
      </html>
    `);
    win.document.close();
  };
  
  
    // PURCHASE FORM SUBMISSION (DIRECTLY ADDS TO MAIN TABLE)
    const handlePurchaseSubmit = () => {
      if (
        !purchaseForm.category ||
        !purchaseForm.productName ||
        !purchaseForm.hsnCode ||
        !purchaseForm.unit ||
        !purchaseForm.price ||
        !purchaseForm.cgst ||
        !purchaseForm.sgst ||
        !purchaseForm.date
      ) {
        alert("Fill all fields!");
        return;
      }
  
      const total =
        parseFloat(purchaseForm.price) +
        (parseFloat(purchaseForm.price) *
          (parseFloat(purchaseForm.cgst) + parseFloat(purchaseForm.sgst))) /
          100;
  
      const newItem = { ...purchaseForm, total: total.toFixed(2) };
  
      setItems((prev) => [...prev, newItem]);
  
      // update stock
      setStock((prev) => [
        ...prev,
        {
          productName: purchaseForm.productName,
          totalStock: parseInt(purchaseForm.unit),
          used: 0,
          date: purchaseForm.date,
        },
      ]);
  
      setPurchaseForm({
        category: "",
        productName: "",
        hsnCode: "",
        unit: "",
        price: "",
        cgst: "",
        sgst: "",
        date: "",
      });
  
      alert("Purchase added to Main Table!");
    };
 
  return (
    <div className="mt-[90px] ml-[250px] p-5 w-[calc(100%-250px)]">
      <h2 className="text-center mb-5 font-bold text-xl">Maintenance Products TABLE</h2>

      {/* Filter Section */}
      <div className="flex justify-center items-center gap-3 mt-5">
        <select
          className="border px-3 py-2 rounded"
          value={filters.category}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, category: e.target.value }))
          }
        >
          <option value="">All Categories</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search Product Name"
          className="border px-3 py-2 rounded"
          value={filters.productName}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, productName: e.target.value }))
          }
        />

        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          Add New Item
        </button>
      </div>

      {/* Table */}
      <div className="container mt-6 max-h-[350px] overflow-y-auto rounded-xl">
        <div className="shadow-lg rounded-xl bg-white">
          <div className="p-4">
            <table className="w-full border-collapse text-center">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-2">S.No</th>
                  <th className="p-2">Category</th>
                  <th className="p-2">Product Name</th>
                  <th className="p-2">HSN Code</th>
                  <th className="p-2">Unit</th>
                  <th className="p-2">Price ($)</th>
                  <th className="p-2">CGST (%)</th>
                  <th className="p-2">SGST (%)</th>
                  <th className="p-2">Total ($)</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, idx) => (
                    <tr key={idx} className="border-t">
                      {editIndex === idx ? (
                        <>
                          <td>{idx + 1}</td>
                          {["category","productName","hsnCode","unit","price","cgst","sgst"].map((field)=>(
                            <td key={field}>
                              <input
                                type="text"
                                name={field}
                                value={editData[field]}
                                onChange={handleEditChange}
                                className="border px-2 py-1 w-full rounded"
                              />
                            </td>
                          ))}
                          <td>{editData.total}</td>
                          <td>
                            <button
                              className="bg-green-600 text-white px-3 py-1 rounded"
                              onClick={() => handleSaveEdit(idx)}
                            >
                              Save
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{idx + 1}</td>
                          <td>{item.category}</td>
                          <td>{item.productName}</td>
                          <td>{item.hsnCode}</td>
                          <td>{item.unit}</td>
                          <td>{item.price}</td>
                          <td>{item.cgst}</td>
                          <td>{item.sgst}</td>
                          <td>{item.total}</td>
                          <td>
                            <button
                              className="bg-blue-600 text-white px-3 py-1 rounded"
                              onClick={() => {
                                setEditIndex(idx);
                                setEditData({ ...item });
                              }}
                            >
                              Edit
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="p-3 text-gray-500">
                      No items found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for adding new item */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white w-[400px] rounded-xl shadow-2xl p-6">
            <h3 className="text-lg font-bold mb-4">Add New Item</h3>

            <div className="space-y-3">
              {["category", "productName", "hsnCode", "unit", "price", "cgst", "sgst"].map(
                (field) => (
                  <input
                    key={field}
                    type={field === "price" || field === "cgst" || field === "sgst" ? "number" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    className="w-full border px-3 py-2 rounded"
                  />
                )
              )}
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {/* STOCK AVAILABILITY */}
<h2 className="text-lg font-bold mt-10">Stock Availability</h2>

{/* Only From Date Filter */}
<div className="flex gap-4 mt-4">
  <input
    type="date"
    className="border p-2 rounded"
    value={stockFilter.from}
    onChange={(e) =>
      setStockFilter((prev) => ({ ...prev, from: e.target.value }))
    }
  />
</div>

<table className="w-full mt-3 border-collapse text-center">
  <thead>
    <tr className="bg-purple-600 text-white">
      <th className="p-2">Product</th>
      <th className="p-2">Total Stock</th>
      <th className="p-2">Used</th>
      <th className="p-2">Available</th>
      <th className="p-2">Date</th>
    </tr>
  </thead>
  <tbody>
    {filteredStock.map((s, idx) => (
      <tr key={idx} className="border">
        <td>{s.productName}</td>
        <td>{s.totalStock}</td>
        <td>{s.used}</td>
        <td className="text-green-600 font-bold">{s.totalStock - s.used}</td>
        <td>{s.date}</td>
      </tr>
    ))}
  </tbody>
</table>
{/* ADD / EDIT VENDOR FORM */}
<h2 className="text-lg font-bold mt-10">
  {editVendorIndex !== null ? "Edit Vendor" : "Add New Vendor"}
</h2>

<div className="grid grid-cols-3 gap-4 mt-4">
  {Object.keys(vendorForm).map((field) => (
    <input
      key={field}
      type="text"
      name={field}
      placeholder={field.toUpperCase()}
      className="border p-2 rounded"
      value={vendorForm[field]}
      onChange={(e) =>
        setVendorForm((prev) => ({ ...prev, [field]: e.target.value }))
      }
    />
  ))}
</div>

<button
  className="bg-green-600 text-white px-5 py-2 rounded mt-4"
  onClick={handleSaveVendor}
>
  {editVendorIndex !== null ? "Update Vendor" : "Add Vendor"}
</button>
{/* VENDOR DETAILS TABLE */}
<h2 className="text-lg font-bold mt-10">Vendor Details</h2>

<div className="mt-3 border rounded-lg shadow-md bg-white">
  <table className="w-full border-collapse text-center">
    <thead>
      <tr className="bg-indigo-600 text-white">
        <th className="p-2">S.No</th>
        <th className="p-2">Vendor Name</th>
        <th className="p-2">Shop Name</th>
        <th className="p-2">Location</th>
        <th className="p-2">Phone</th>
        <th className="p-2">Email</th>
        <th className="p-2">GST No</th>
        <th className="p-2">Action</th>
      </tr>
    </thead>

    <tbody>
      {vendors.map((vendor, idx) => (
        <tr key={idx} className="border">
          <td>{idx + 1}</td>
          <td>{vendor.vendorName}</td>
          <td>{vendor.shopName}</td>
          <td>{vendor.location}</td>
          <td>{vendor.phone}</td>
          <td>{vendor.email}</td>
          <td>{vendor.gst}</td>
          <td className="flex justify-center gap-2 py-2">
            
            {/* EDIT */}
            <button
              className="bg-blue-600 text-white px-3 py-1 rounded"
              onClick={() => {
                setVendorForm(vendor);
                setEditVendorIndex(idx);
              }}
            >
              Edit
            </button>

            {/* DELETE */}
            <button
              className="bg-red-600 text-white px-3 py-1 rounded"
              onClick={() => handleDeleteVendor(idx)}
            >
              Delete
            </button>

            {/* PRINT */}
            <button
              className="bg-purple-600 text-white px-3 py-1 rounded"
              onClick={() => handlePrintVendor(vendor)}
            >
              Print
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

     {/* PURCHASE FORM */}
<h2 className="text-lg font-bold mt-10">Purchase Product Form</h2>

<div className="mt-3 border p-5 rounded-lg shadow-md bg-gray-50">
  <div className="grid grid-cols-3 gap-4">

    {/* 🔽 VENDOR DROPDOWN (AUTO-FILL FIELD) */}
    <select
      className="border p-2 rounded"
      value={purchaseForm.vendor}
      onChange={(e) =>
        setPurchaseForm((p) => ({ ...p, vendor: e.target.value }))
      }
    >
      <option value="">Select Vendor</option>

      {vendors.map((v, idx) => (
        <option key={idx} value={v.vendorName}>
          {v.vendorName} — {v.shopName}
        </option>
      ))}
    </select>

    {/* 🔽 OTHER PURCHASE FORM FIELDS */}
    {Object.keys(purchaseForm)
      .filter((field) => field !== "vendor") // vendor already added above
      .map((field) => (
        <input
          key={field}
          type={
            field === "price" ||
            field === "cgst" ||
            field === "sgst" ||
            field === "unit"
              ? "number"
              : field === "date"
              ? "date"
              : "text"
          }
          name={field}
          placeholder={field.toUpperCase()}
          className="border p-2 rounded"
          value={purchaseForm[field]}
          onChange={(e) =>
            setPurchaseForm((p) => ({ ...p, [field]: e.target.value }))
          }
        />
      ))}
  </div>

  <button
    className="bg-green-600 text-white px-6 py-2 rounded mt-4"
    onClick={handlePurchaseSubmit}
  >
    Add to Main Table
  </button>
</div>

    </div>
  );
};

export default InhouseTable;
