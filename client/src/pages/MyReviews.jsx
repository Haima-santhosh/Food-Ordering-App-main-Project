import React, { useState } from "react";

const MyReviews = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      restaurant: "Pizza Place",
      item: "Cheese Burst Pizza",
      rating: 5,
      comment: "Hot and cheesy, loved it!",
    },
     {
      id: 2,
      restaurant: "Masala Square",
      item: "Chicken Tikka Masala",
      rating: 4.5,
      comment: "Hot and Spicy,Delicious, loved it!",
    },
  ]);

  const [form, setForm] = useState({
    restaurant: "",
    item: "",
    rating: "",
    comment: "",
  });

  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      setReviews((prev) =>
        prev.map((r) => (r.id === editId ? { ...form, id: editId } : r))
      );
      setEditId(null);
    } else {
      const newReview = { ...form, id: Date.now() };
      setReviews([...reviews, newReview]);
    }

    setForm({ restaurant: "", item: "", rating: "", comment: "" });
  };

  const handleEdit = (review) => {
    setForm(review);
    setEditId(review.id);
  };

  const handleDelete = (id) => {
    setReviews(reviews.filter((r) => r.id !== id));
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen px-6 pt-20 pb-10 mt-10">
      <h2 className="text-4xl font-bold text-center text-blue-700 dark:text-blue-300 rounded-lg shadow-md p-6 mb-10">
        My Reviews
      </h2>

      {/* Add or Edit Form */}
      <div className="max-w-md mx-auto bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md mb-10">
        <h3 className="text-lg font-semibold mb-4">
          {editId ? "Edit Review" : "Add Review"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="restaurant"
            placeholder="Restaurant name"
            value={form.restaurant}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="item"
            placeholder="Item name"
            value={form.item}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating (1-5)"
            value={form.rating}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min="1"
            max="5"
            required
          />
          <textarea
            name="comment"
            placeholder="Write your comment"
            value={form.comment}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="3"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {editId ? "Update" : "Submit"}
          </button>
        </form>
      </div>

      {/* List of Reviews */}
      <div className="max-w-2xl mx-auto space-y-4">
        {reviews.length === 0 ? (
          <p className="text-center text-gray-500">No reviews yet.</p>
        ) : (
          reviews.map((r) => (
            <div
              key={r.id}
              className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow"
            >
              <h4 className="text-lg font-semibold">
                {r.restaurant} - {r.item}
              </h4>
              <p className="text-yellow-500">Rating: {r.rating}/5</p>
              <p className="mt-2">{r.comment}</p>
              <div className="flex gap-4 mt-3">
                <button
                  onClick={() => handleEdit(r)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(r.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyReviews;
