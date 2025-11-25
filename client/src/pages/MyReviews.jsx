import React, { useState, useEffect } from "react";
import axios from "axios";

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editComment, setEditComment] = useState("");
  const [editRating, setEditRating] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/review/my-reviews`,
          { withCredentials: true }
        );

        setReviews(data.reviews || []);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    fetchReviews();
  }, []);

  const deleteReview = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/review/delete-review/${id}`,
        { withCredentials: true }
      );

      setReviews(reviews.filter((r) => r._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const startEdit = (review) => {
    setEditId(review._id);
    setEditComment(review.comment);
    setEditRating(review.rating);
  };

  const updateReview = async () => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/review/update-review/${editId}`,
        {
          comment: editComment,
          rating: parseFloat(editRating),
        },
        { withCredentials: true }
      );

      setReviews(
        reviews.map((r) =>
          r._id === editId ? { ...r, comment: editComment, rating: editRating } : r
        )
      );

      setEditId(null);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <p className="text-center p-5">Loading...</p>;

  return (
    <div className="pt-24 px-4 sm:px-8 min-h-screen bg-gray-50 mb-10">
      <h2 className="text-4xl font-bold text-center text-blue-700 dark:text-blue-300 rounded-lg shadow-md p-6 mb-10">
        My Reviews
      </h2>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-600">You haven't reviewed anything yet.</p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-6">
          {reviews.map((r) => (
            <div
              key={r._id}
              className="p-5 bg-white rounded-xl border shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <img
                  src={r.itemId?.itemImage}
                  className="w-16 h-16 rounded-lg object-cover border"
                  alt="item"
                />

                <div>
                  <p className="font-semibold text-lg">{r.itemId?.itemName}</p>
                  <p className="text-sm text-gray-500">Restaurant: {r.restaurant}</p>
                  <p className="text-sm text-yellow-600 font-medium">⭐ {r.rating}</p>
                </div>
              </div>

              {editId === r._id ? (
                <div className="mt-4 space-y-3">
                  <textarea
                    className="w-full p-3 border rounded-lg"
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                  ></textarea>

                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    className="w-full p-2 border rounded-lg"
                    value={editRating}
                    onChange={(e) => setEditRating(e.target.value)}
                  />

                  <div className="flex gap-3">
                    <button
                      onClick={updateReview}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="mt-3 text-gray-700">{r.comment}</p>

                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => startEdit(r)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteReview(r._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
