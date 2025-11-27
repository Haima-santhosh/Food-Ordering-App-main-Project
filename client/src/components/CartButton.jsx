import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/store";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const CartButton = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

 const handleAdd = async () => {
  try {
    //  Add item to redux
    dispatch(addItem({
      itemId: item._id,
      itemName: item.itemName,
      price: item.price,
      itemImage: item.itemImage,
      restId: item.restId,
      quantity: 1,
    }));

    // Save to backend 
    await api.post("/cart/add-cart", {
      itemId: item._id,
      quantity: 1,
    });

    // NAVIGATION — If no error, go to cart
    navigate("/cart");

  } catch (err) {
    console.log("cart add error", err);
  }
};


  return (
    <button
      onClick={handleAdd}
      className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
    >
      Add to Cart
    </button>
  );
};

export default CartButton;
