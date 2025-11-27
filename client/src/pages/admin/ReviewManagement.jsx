import React, { useState, useEffect } from "react";
import api from "../../api/axios";

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editComment, setEditComment] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get("/review/all-review");
        setReviews(res.data.reviews || []);
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Failed to load reviews");
      }
    };
    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await api.delete(`/review/admin-delete-review/${id}`);
      setReviews((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete review");
    }
  };

  const handleEdit = (review) => {
    setEditingId(review._id);
    setEditComment(review.comment);
  };

  const handleSave = async (id) => {
    try {
      await api.patch(`/review/admin-update/${id}`, { comment: editComment });
      setReviews((prev) =>
        prev.map((r) => (r._id === id ? { ...r, comment: editComment } : r))
      );
      setEditingId(null);
      setEditComment("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update review");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
        Review Management
      </h2>

     
      <div className="hidden md:block overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-blue-100 text-gray-700">
            <tr>
              <th className="py-2 px-4 border">Restaurant</th>
              <th className="py-2 px-4 border">Item</th>
              <th className="py-2 px-4 border">User</th>
              <th className="py-2 px-4 border">Rating</th>
              <th className="py-2 px-4 border">Comment</th>
              <th className="py-2 px-4 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500 italic">
                  No reviews available
                </td>
              </tr>
            )}

            {reviews.map((review) => (
              <tr key={review._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{review.restId?.restName || "N/A"}</td>
                <td className="border px-4 py-2">{review.itemId?.itemName || "N/A"}</td>
                <td className="border px-4 py-2">{review.userId?.name || "N/A"}</td>
                <td className="border px-4 py-2 text-center">{review.rating} ⭐</td>
                <td className="border px-4 py-2">
                  {editingId === review._id ? (
                    <input
                      value={editComment}
                      onChange={(e) => setEditComment(e.target.value)}
                      className="w-full border rounded px-2 py-1"
                    />
                  ) : (
                    review.comment
                  )}
                </td>
                <td className="border px-4 py-2 text-center flex flex-col sm:flex-row items-center justify-center gap-2">
                  {editingId === review._id ? (
                    <>
                      <button
                        onClick={() => handleSave(review._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 w-full sm:w-auto"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 w-full sm:w-auto"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(review)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 w-full sm:w-auto"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(review._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-full sm:w-auto"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
      <div className="md:hidden space-y-4">
        {reviews.length === 0 && (
          <p className="text-center py-6 text-gray-500">No reviews available</p>
        )}
        {reviews.map((review) => (
          <div key={review._id} className="bg-white p-4 rounded-lg shadow flex flex-col space-y-2">
            <p>
              <span className="font-semibold">Restaurant:</span> {review.restId?.restName || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Item:</span> {review.itemId?.itemName || "N/A"}
            </p>
            <p>
              <span className="font-semibold">User:</span> {review.userId?.name || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Rating:</span> {review.rating} ⭐
            </p>
            <p>
              <span className="font-semibold">Comment:</span>{" "}
              {editingId === review._id ? (
                <input
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                  className="w-full border rounded px-2 py-1"
                />
              ) : (
                review.comment
              )}
            </p>
            <div className="flex space-x-2 mt-2">
              {editingId === review._id ? (
                <>
                  <button
                    onClick={() => handleSave(review._id)}
                    className="px-3 py-1 bg-green-500 text-white rounded flex-1"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded flex-1"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEdit(review)}
                    className="px-3 py-1 bg-blue-500 text-white rounded flex-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded flex-1"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewManagement;
