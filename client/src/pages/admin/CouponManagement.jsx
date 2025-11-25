import React, { useState, useEffect } from "react";
import axios from "axios";

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

  // 🔥 Updated API URL
  const API = "https://food-ordering-app-main-project-1.onrender.com/api/coupons";

  // -----------------------------
  // Load all coupons
  // -----------------------------
  const loadCoupons = async () => {
    try {
      const res = await axios.get(`${API}/all-coupon`, {
        withCredentials: true,
      });
      setCoupons(res.data.coupons);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to load coupons");
    }
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  // -----------------------------
  // Handle input change
  // -----------------------------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    if (editing) setEditing({ ...editing, [name]: val });
    else setForm({ ...form, [name]: val });
  };

  // -----------------------------
  // Add coupon
  // -----------------------------
  const addCoupon = async () => {
    if (!form.code || !form.discount) return alert("Fill all fields");
    try {
      const res = await axios.post(`${API}/add-coupon`, form, {
        withCredentials: true,
      });
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

  // -----------------------------
  // Delete coupon
  // -----------------------------
  const deleteCoupon = async (id) => {
    if (!window.confirm("Delete this coupon?")) return;
    try {
      await axios.delete(`${API}/admin-delete-coupon/${id}`, {
        withCredentials: true,
      });
      setCoupons(coupons.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete coupon");
    }
  };

  // -----------------------------
  // Update coupon
  // -----------------------------
  const updateCoupon = async () => {
    try {
      const res = await axios.patch(`${API}/admin-update-coupon/${editing._id}`, editing, {
        withCredentials: true,
      });
      setCoupons(coupons.map((c) => (c._id === editing._id ? res.data.coupon : c)));
      setEditing(null);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update coupon");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Coupon Management</h2>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-lg mb-3">{editing ? "Edit Coupon" : "Add Coupon"}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <input type="text" name="code" placeholder="Code" value={editing ? editing.code : form.code} onChange={handleChange} className="border p-2 rounded" />
          <input type="number" name="discount" placeholder="Discount" value={editing ? editing.discount : form.discount} onChange={handleChange} className="border p-2 rounded" />
          <input type="number" name="minOrderValue" placeholder="Min Order" value={editing ? editing.minOrderValue : form.minOrderValue} onChange={handleChange} className="border p-2 rounded" />
          <input type="date" name="validFrom" value={editing ? editing.validFrom?.slice(0,10) : form.validFrom} onChange={handleChange} className="border p-2 rounded" />
          <input type="date" name="validTill" value={editing ? editing.validTill?.slice(0,10) : form.validTill} onChange={handleChange} className="border p-2 rounded" />
          <label className="flex items-center gap-2">
            <input type="checkbox" name="isActive" checked={editing ? editing.isActive : form.isActive} onChange={handleChange} /> Active
          </label>
        </div>

        <button onClick={editing ? updateCoupon : addCoupon} className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          {editing ? "Save" : "Add"}
        </button>

        {editing && (
          <button onClick={() => setEditing(null)} className="mt-3 ml-2 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">
            Cancel
          </button>
        )}
      </div>

      <div className="overflow-x-auto bg-white shadow rounded">
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
                <td className="px-4 py-2 text-center">
                  <button onClick={() => setEditing(c)} className="px-3 py-1 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600">
                    Edit
                  </button>
                  <button onClick={() => deleteCoupon(c._id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default CouponManagement;
