import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/store";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartButton = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAdd = async () => {
    try {
      // send full item details to redux cart
     const cartItem = {
  itemId: item._id,
  itemName: item.itemName,
  price: item.price,
  itemImage: item.itemImage,   
  restId: item.restId,
  quantity: 1,
};


      dispatch(addItem(cartItem));

      // save only id + quantity to backend cart
      await axios.post(
        "http://localhost:3000/api/cart/add-cart",
        { itemId: item._id, quantity: 1 },
        { withCredentials: true }
      );

      // go to cart page
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
