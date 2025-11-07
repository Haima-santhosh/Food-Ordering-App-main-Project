import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/store";

const CartButton = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <button
        onClick={() => {
          dispatch(addItem(item));
          alert("Added to cart!");
        }}
        className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-all"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default CartButton;
