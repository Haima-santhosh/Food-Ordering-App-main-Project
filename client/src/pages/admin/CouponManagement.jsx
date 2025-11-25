import React, { useState, useEffect } from "react";
import api from "../../api/axios";

const CouponManagement = () => {
  const [coupons, setCoupons] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    code: "",
    discount: "",
    minOrderValue: "",
    validFrom: "",
    validTill: "",
    isActive: true,
  });

  // Load all coupons
  const loadCoupons = async () => {
    try {
      const res = await api.get("/coupons/all-coupon");
      setCoupons(res.data.coupons || []);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to load coupons");
    }
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    if (editing) setEditing({ ...editing, [name]: val });
    else setForm({ ...form, [name]: val });
  };

  const addCoupon = async () => {
    if (!form.code || !form.discount) return alert("Fill all fields");
    try {
      const res = await api.post("/coupons/add-coupon", form);
      setCoupons([...coupons, res.data.newCoupon]);
      setForm({
        code: "",
        discount: "",
        minOrderValue: "",
        validFrom: "",
        validTill: "",
        isActive: true,
      });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add coupon");
    }
  };

  const updateCoupon = async () => {
    try {
      const res = await api.patch(`/coupons/admin-update-coupon/${editing._id}`, editing);
      setCoupons(coupons.map((c) => (c._id === editing._id ? res.data.coupon : c)));
      setEditing(null);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update coupon");
    }
  };

  const deleteCoupon = async (id) => {
    if (!window.confirm("Delete this coupon?")) return;
    try {
      await api.delete(`/coupons/admin-delete-coupon/${id}`);
      setCoupons(coupons.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete coupon");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4 text-center">Coupon Management</h2>

      {/* Add/Edit Form */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-lg mb-3">{editing ? "Edit Coupon" : "Add Coupon"}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <input
            type="text"
            name="code"
            placeholder="Code"
            value={editing ? editing.code : form.code}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="discount"
            placeholder="Discount"
            value={editing ? editing.discount : form.discount}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="minOrderValue"
            placeholder="Min Order"
            value={editing ? editing.minOrderValue : form.minOrderValue}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="date"
            name="validFrom"
            value={editing ? editing.validFrom?.slice(0, 10) : form.validFrom}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="date"
            name="validTill"
            value={editing ? editing.validTill?.slice(0, 10) : form.validTill}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={editing ? editing.isActive : form.isActive}
              onChange={handleChange}
            />
            Active
          </label>
        </div>
        <div className="mt-3 flex flex-col sm:flex-row gap-2">
          <button
            onClick={editing ? updateCoupon : addCoupon}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex-1"
          >
            {editing ? "Save" : "Add"}
          </button>
          {editing && (
            <button
              onClick={() => setEditing(null)}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 flex-1"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full text-left text-gray-600">
          <thead className="bg-gray-100 uppercase text-gray-700">
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
            {coupons.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No coupons found
                </td>
              </tr>
            )}
            {coupons.map((c) => (
              <tr key={c._id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{c.code}</td>
                <td className="px-4 py-2">{c.discount}</td>
                <td className="px-4 py-2">₹{c.minOrderValue}</td>
                <td className="px-4 py-2">{new Date(c.validFrom).toLocaleDateString()}</td>
                <td className="px-4 py-2">{new Date(c.validTill).toLocaleDateString()}</td>
                <td className="px-4 py-2">
                  {c.isActive ? (
                    <span className="text-green-600">Active</span>
                  ) : (
                    <span className="text-red-500">Inactive</span>
                  )}
                </td>
                <td className="px-4 py-2 text-center flex flex-col sm:flex-row items-center justify-center gap-2">
                  <button
                    onClick={() => setEditing(c)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 w-full sm:w-auto"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCoupon(c._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 w-full sm:w-auto"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {coupons.length === 0 && (
          <p className="text-center py-6 text-gray-500">No coupons found</p>
        )}
        {coupons.map((c) => (
          <div key={c._id} className="bg-white p-4 rounded-lg shadow flex flex-col space-y-2">
            <p className="font-semibold text-lg">{c.code}</p>
            <p>
              <span className="font-semibold">Discount:</span> {c.discount}
            </p>
            <p>
              <span className="font-semibold">Min Order:</span> ₹{c.minOrderValue}
            </p>
            <p>
              <span className="font-semibold">Valid From:</span>{" "}
              {new Date(c.validFrom).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Valid Till:</span>{" "}
              {new Date(c.validTill).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              {c.isActive ? (
                <span className="text-green-600">Active</span>
              ) : (
                <span className="text-red-500">Inactive</span>
              )}
            </p>
            <div className="flex space-x-2 mt-2">
              <button
                onClick={() => setEditing(c)}
                className="px-3 py-1 bg-blue-500 text-white rounded flex-1"
              >
                Edit
              </button>
              <button
                onClick={() => deleteCoupon(c._id)}
                className="px-3 py-1 bg-red-500 text-white rounded flex-1"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CouponManagement;
