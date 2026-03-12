import React, { useState } from "react";

const AssetTracking = () => {
  const [search, setSearch] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    sno: null,
    category: "",
    item: "",
    quantity: "",
    pricePerUnit: "",
    totalPrice: "",
    date: "",
  });

  const [assets, setAssets] = useState([
    { sno: 1, category: "Furniture", item: "Chairs", quantity: 2, pricePerUnit: 100, totalPrice: 200, condition: "Spoiled" },
    { sno: 2, category: "IT Equipment", item: "Laptops", quantity: 3, pricePerUnit: 500, totalPrice: 1500, condition: "Good" },
    { sno: 3, category: "Lab Items", item: "Beakers", quantity: 1, pricePerUnit: 50, totalPrice: 50, condition: "Good" },
    { sno: 4, category: "Sports Items", item: "Football", quantity: 10, pricePerUnit: 20, totalPrice: 200, condition: "Good" },
  ]);

  const getRowClasses = (asset) => {
    let classes = "text-center border-b border-gray-300";
    if (asset.quantity < 3) classes += " bg-blue-100 font-bold";
    if (asset.condition.toLowerCase() === "spoiled") classes += " bg-blue-200 font-bold";
    return classes;
  };

  const filteredAssets = assets.filter(
    (asset) =>
      asset.item.toLowerCase().includes(search.toLowerCase()) ||
      asset.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = (e) => setSearch(e.target.value);

  const openPurchasePopup = (asset = null) => {
    if (asset) {
      setFormData({
        sno: asset.sno,
        category: asset.category,
        item: asset.item,
        quantity: asset.quantity,
        pricePerUnit: asset.pricePerUnit || "",
        totalPrice: asset.totalPrice || "",
        date: asset.date || "",
      });
    }
    setShowPopup(true);
  };

  const closePurchasePopup = () => {
    setShowPopup(false);
    setFormData({
      sno: null,
      category: "",
      item: "",
      quantity: "",
      pricePerUnit: "",
      totalPrice: "",
      date: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newFormData = { ...formData, [name]: value };

    if (name === "quantity" || name === "pricePerUnit") {
      const quantity = newFormData.quantity || 0;
      const pricePerUnit = newFormData.pricePerUnit || 0;
      newFormData.totalPrice = (quantity * pricePerUnit).toFixed(2);
    }

    setFormData(newFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.sno) {
      // Edit existing asset
      setAssets((prevAssets) =>
        prevAssets.map((asset) =>
          asset.sno === formData.sno
            ? {
                ...asset,
                category: formData.category,
                item: formData.item,
                quantity: parseInt(formData.quantity),
                pricePerUnit: parseFloat(formData.pricePerUnit) || 0,
                totalPrice: parseFloat(formData.totalPrice) || 0,
                condition:
                  formData.quantity < 3 ? "Low Stock" : asset.condition === "Spoiled" ? "Spoiled" : "Good",
                date: formData.date,
              }
            : asset
        )
      );
    } else {
      // Add new asset
      const newSno = assets.length ? assets[assets.length - 1].sno + 1 : 1;
      setAssets([
        ...assets,
        {
          sno: newSno,
          category: formData.category,
          item: formData.item,
          quantity: parseInt(formData.quantity),
          pricePerUnit: parseFloat(formData.pricePerUnit) || 0,
          totalPrice: parseFloat(formData.totalPrice) || 0,
          condition: formData.quantity < 3 ? "Low Stock" : "Good",
          date: formData.date,
        },
      ]);
    }

    closePurchasePopup();
  };

  const handleDelete = (sno) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setAssets(assets.filter((asset) => asset.sno !== sno));
    }
  };

  return (
    <div className="ml-[250px] mt-[80px] p-5 font-poppins">
      <h2 className="text-center text-blue-600 text-2xl mb-5">Asset Tracking - Quantity & Condition</h2>

      <div className="text-center mb-4">
        <input
          type="text"
          placeholder="Search by Item Name or Category..."
          value={search}
          onChange={handleSearch}
          className="w-3/5 p-2 border border-blue-600 rounded-md outline-none"
        />
        <button
          onClick={() => openPurchasePopup()}
          className="ml-3 bg-green-600 text-white py-2 px-4 rounded-md"
        >
          Purchase
        </button>
      </div>

      <table className="w-full border-collapse bg-white shadow-md">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="py-3">S.No</th>
            <th className="py-3">Category</th>
            <th className="py-3">Item Name</th>
            <th className="py-3">Quantity</th>
            <th className="py-3">Condition</th>
            <th className="py-3">Price/Unit</th>
            <th className="py-3">Total Price</th>
            <th className="py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredAssets.map((asset) => (
            <tr key={asset.sno} className={`${getRowClasses(asset)} hover:bg-blue-50`}>
              <td className="py-3">{asset.sno}</td>
              <td className="py-3">{asset.category}</td>
              <td className="py-3">{asset.item}</td>
              <td className="py-3">{asset.quantity}</td>
              <td className="py-3">{asset.condition}</td>
              <td className="py-3">{asset.pricePerUnit}</td>
              <td className="py-3">{asset.totalPrice}</td>
              <td className="py-3">
                <button
                  className="bg-blue-600 text-white py-1 px-3 rounded-md mr-2"
                  onClick={() => openPurchasePopup(asset)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 text-white py-1 px-3 rounded-md"
                  onClick={() => handleDelete(asset.sno)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl text-center mb-4">Add / Edit Purchase</h3>
            <form onSubmit={handleSubmit}>
              <label className="block mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full mb-3 p-2 border border-gray-300 rounded"
              >
                <option value="" disabled>Select Category</option>
                <option value="Furniture">Furniture</option>
                <option value="IT Equipment">IT Equipment</option>
                <option value="Lab Items">Lab Items</option>
                <option value="Sports Items">Sports Items</option>
              </select>

              <label className="block mb-1">Item Name</label>
              <input
                type="text"
                name="item"
                value={formData.item}
                onChange={handleInputChange}
                placeholder="Enter item name"
                required
                className="w-full mb-3 p-2 border border-gray-300 rounded"
              />

              <label className="block mb-1">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                placeholder="Enter quantity"
                min="1"
                required
                className="w-full mb-3 p-2 border border-gray-300 rounded"
              />

              <label className="block mb-1">Price per Unit</label>
              <input
                type="number"
                name="pricePerUnit"
                value={formData.pricePerUnit}
                onChange={handleInputChange}
                placeholder="Enter price per unit"
                min="0"
                step="0.01"
                className="w-full mb-3 p-2 border border-gray-300 rounded"
              />

              <label className="block mb-1">Total Price</label>
              <input
                type="number"
                name="totalPrice"
                value={formData.totalPrice}
                readOnly
                placeholder="Total price"
                className="w-full mb-3 p-2 border border-gray-300 rounded bg-gray-100"
              />

              <label className="block mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full mb-4 p-2 border border-gray-300 rounded"
              />

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={closePurchasePopup}
                  className="bg-gray-500 text-white py-2 px-4 rounded-md"
                >
                  Close
                </button>
                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetTracking;
