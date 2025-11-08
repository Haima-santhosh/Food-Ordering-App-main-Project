import React, { useState } from "react";

const ReviewManagement = () => {
  // --- Mock data ---
  const [reviews, setReviews] = useState([
    {
      id: 1,
      restaurant: "Spice Garden",
      item: "Butter Chicken",
      user: "Amit Sharma",
      rating: 5,
      comment: "Amazing taste and quick delivery!",
    },
    {
      id: 2,
      restaurant: "Sushi World",
      item: "Salmon Roll",
      user: "Priya Verma",
      rating: 4,
      comment: "Fresh and tasty, but a bit pricey.",
    },
    {
      id: 3,
      restaurant: "Pasta Palace",
      item: "Penne Alfredo",
      user: "Rahul Mehta",
      rating: 3,
      comment: "Good but sauce was too thick.",
    },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editComment, setEditComment] = useState("");

  // --- Handle delete ---
  const handleDelete = (id) => {
    setReviews(reviews.filter((r) => r.id !== id));
  };

  // Handle edit start
  const handleEdit = (review) => {
    setEditingId(review.id);
    setEditComment(review.comment);
  };

  // --- Handle save ---
  const handleSave = (id) => {
    setReviews(
      reviews.map((r) =>
        r.id === id ? { ...r, comment: editComment } : r
      )
    );
    setEditingId(null);
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
              <tr key={review.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{review.restaurant}</td>
                <td className="border px-4 py-2">{review.item}</td>
                <td className="border px-4 py-2">{review.user}</td>
                <td className="border px-4 py-2 text-center">{review.rating} ⭐</td>
                <td className="border px-4 py-2">
                  {editingId === review.id ? (
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
                  {editingId === review.id ? (
                    <button
                      onClick={() => handleSave(review.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(review)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
