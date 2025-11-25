import React, { useState, useEffect } from "react";
import axios from "axios";

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editComment, setEditComment] = useState("");

  // Fetch all reviews from backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/review/all-review`,
          { withCredentials: true }
        );
        setReviews(data.reviews || []);
      } catch (err) {
        console.log(err);
      }
    };
    fetchReviews();
  }, []);

  // Delete review
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/review/admin-delete-review/${id}`,
        { withCredentials: true }
      );

      setReviews(reviews.filter((r) => r._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // Start editing
  const handleEdit = (review) => {
    setEditingId(review._id);
    setEditComment(review.comment);
  };

  // Save updated comment
  const handleSave = async (id) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/review/admin-update/${id}`,
        { comment: editComment },
        { withCredentials: true }
      );

      setReviews(
        reviews.map((r) =>
          r._id === id ? { ...r, comment: editComment } : r
        )
      );

      setEditingId(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
        Review Management
      </h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
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
            {reviews.map((review) => (
              <tr key={review._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">
                  {review.restId?.restName || "N/A"}
                </td>

                <td className="border px-4 py-2">
                  {review.itemId?.itemName || "N/A"}
                </td>

                <td className="border px-4 py-2">
                  {review.userId?.name || "N/A"}
                </td>

                <td className="border px-4 py-2 text-center">
                  {review.rating} ⭐
                </td>

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

                <td className="border px-4 py-2 text-center space-x-2">
                  {editingId === review._id ? (
                    <button
                      onClick={() => handleSave(review._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(review)}
                      className="bg-blue-500 text-white px-3 py-1 rounded mb-2"
                    >
                      Edit
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(review._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {reviews.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-4 text-gray-500 italic"
                >
                  No reviews available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewManagement;
