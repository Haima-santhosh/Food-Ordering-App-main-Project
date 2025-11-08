import React, { useState } from "react";

const CouponManagement = () => {
  const [coupons, setCoupons] = useState([
    {
      _id: 1,
      code: "WELCOME100",
      discount: 100,
      minOrderValue: 500,
      validFrom: "2025-11-01",
      validTill: "2025-12-31",
      isActive: true,
    },
    {
      _id: 2,
      code: "FOODIE20",
      discount: 20,
      minOrderValue: 300,
      validFrom: "2025-10-15",
      validTill: "2025-11-30",
      isActive: false,
    },
  ]);

  const [editingCoupon, setEditingCoupon] = useState(null);
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discount: "",
    minOrderValue: "",
    validFrom: "",
    validTill: "",
    isActive: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    if (editingCoupon) {
      setEditingCoupon({ ...editingCoupon, [name]: val });
    } else {
      setNewCoupon({ ...newCoupon, [name]: val });
    }
  };

  const handleAdd = () => {
    if (!newCoupon.code || !newCoupon.discount)
      return alert("Please fill all fields");
    setCoupons([
      ...coupons,
      { ...newCoupon, _id: Date.now() },
    ]);
    setNewCoupon({
      code: "",
      discount: "",
      minOrderValue: "",
      validFrom: "",
      validTill: "",
      isActive: true,
    });
  };

  const handleDelete = (id) => {
    setCoupons(coupons.filter((c) => c._id !== id));
  };

  const handleEdit = (coupon) => {
    setEditingCoupon(coupon);
  };

  const handleUpdate = () => {
    setCoupons(
      coupons.map((c) => (c._id === editingCoupon._id ? editingCoupon : c))
    );
    setEditingCoupon(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">
        Coupon Management
      </h2>

    
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h3 className="text-lg font-medium mb-3 text-gray-600">Add Coupon</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <input
            type="text"
            name="code"
            placeholder="Coupon Code"
            value={newCoupon.code}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="discount"
            placeholder="Discount"
            value={newCoupon.discount}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="minOrderValue"
            placeholder="Min Order Value"
            value={newCoupon.minOrderValue}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="date"
            name="validFrom"
            value={newCoupon.validFrom}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="date"
            name="validTill"
            value={newCoupon.validTill}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              name="isActive"
              checked={newCoupon.isActive}
              onChange={handleChange}
            />
            Active
          </label>
        </div>
        <button
          onClick={handleAdd}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

    
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-2">Code</th>
              <th className="px-4 py-2">Discount</th>
              <th className="px-4 py-2">Min Order</th>
              <th className="px-4 py-2">Valid From</th>
              <th className="px-4 py-2">Valid Till</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) =>
              editingCoupon && editingCoupon._id === coupon._id ? (
                <tr key={coupon._id} className="bg-yellow-50">
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      name="code"
                      value={editingCoupon.code}
                      onChange={handleChange}
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      name="discount"
                      value={editingCoupon.discount}
                      onChange={handleChange}
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      name="minOrderValue"
                      value={editingCoupon.minOrderValue}
                      onChange={handleChange}
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="date"
                      name="validFrom"
                      value={editingCoupon.validFrom}
                      onChange={handleChange}
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="date"
                      name="validTill"
                      value={editingCoupon.validTill}
                      onChange={handleChange}
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={editingCoupon.isActive}
                      onChange={handleChange}
                    />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={handleUpdate}
                      className="px-3 py-1 bg-green-500 text-white rounded mr-2 hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingCoupon(null)}
                      className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={coupon._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{coupon.code}</td>
                  <td className="px-4 py-2">{coupon.discount}</td>
                  <td className="px-4 py-2">₹{coupon.minOrderValue}</td>
                  <td className="px-4 py-2">{coupon.validFrom}</td>
                  <td className="px-4 py-2">{coupon.validTill}</td>
                  <td className="px-4 py-2">
                    {coupon.isActive ? (
                      <span className="text-green-600 font-semibold">Active</span>
                    ) : (
                      <span className="text-red-500 font-semibold">Inactive</span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleEdit(coupon)}
                      className="px-3 py-1 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(coupon._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CouponManagement;
