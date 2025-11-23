const Restaurant = require('../models/restaurantModel');
const { cloudinaryInstance } = require('../config/cloudinary');

// ADD NEW RESTAURANT BY ADMIN
const addRestaurants = async (req, res) => {
  try {
    const { restName, rating, deliveryTime, cuisineType, address, averagePrice } = req.body;

    if (!restName || !deliveryTime || !cuisineType || !averagePrice) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    // Check duplicate
    const exists = await Restaurant.findOne({ restName });
    if (exists) {
      return res.status(400).json({ message: "Restaurant already exists" });
    }

    // Upload image
    let imageUrl = "";
    if (req.file) {
      const uploaded = await cloudinaryInstance.uploader.upload(req.file.path);
      imageUrl = uploaded.secure_url;
    }

    const restaurant = await Restaurant.create({
      restName,
      rating: rating || 0,
      deliveryTime,
      cuisineType,
      address: address || "",
      averagePrice,
      image: imageUrl,
    });

    return res.status(201).json({
      message: "Restaurant created successfully",
      restaurant,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// GET ALL RESTAURANTS – ADMIN
const allRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    if (!restaurants.length) {
      return res.status(404).json({ message: "No restaurants found" });
    }

    return res.status(200).json({
      message: "Restaurant list fetched successfully",
      restaurants,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET SINGLE RESTAURANT – ADMIN
const getRestaurant = async (req, res) => {
  try {
    const { restId } = req.params;

    if (!restId) {
      return res.status(400).json({ message: "Restaurant ID is required" });
    }

    const restaurant = await Restaurant.findById(restId);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    return res.status(200).json({
      message: "Restaurant details fetched successfully",
      restaurant,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// UPDATE RESTAURANT – ADMIN
const updateRestaurantByAdmin = async (req, res) => {
  try {
    const { restId } = req.params;

    if (!restId) {
      return res.status(400).json({ message: "Restaurant ID is required" });
    }

    const { restName, rating, deliveryTime, cuisineType, address, averagePrice } = req.body;

    let imageUrl;
    if (req.file) {
      const uploadResult = await cloudinaryInstance.uploader.upload(req.file.path);
      imageUrl = uploadResult.secure_url;
    }

    const updateData = {
      restName,
      rating,
      deliveryTime,
      cuisineType,
      address,
      averagePrice,
    };

    if (imageUrl) updateData.image = imageUrl;

    const restaurant = await Restaurant.findByIdAndUpdate(restId, updateData, { new: true });

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    return res.status(200).json({
      message: "Restaurant updated successfully",
      restaurant,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// DELETE RESTAURANT – ADMIN
const deleteRestaurantByAdmin = async (req, res) => {
  try {
    const { restId } = req.params;

    if (!restId) {
      return res.status(400).json({ message: "Restaurant ID is required" });
    }

    const restaurant = await Restaurant.findByIdAndDelete(restId);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    return res.status(200).json({
      message: "Restaurant deleted successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// USER SIDE – GET ALL RESTAURANTS
const getRestaurantByUser = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();

    if (!restaurants.length) {
      return res.status(404).json({ message: "No restaurants found" });
    }

    return res.status(200).json({
      message: "Restaurant list fetched successfully",
      restaurants,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// USER SIDE – GET SINGLE RESTAURANT
const getRestaurantDataByUser = async (req, res) => {
  try {
    const { restId } = req.params;

    if (!restId) {
      return res.status(400).json({ message: "Restaurant ID is required" });
    }

    const restaurant = await Restaurant.findById(restId);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    return res.status(200).json({
      message: "Restaurant details fetched successfully",
      restaurant,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addRestaurants,
  allRestaurants,
  getRestaurant,
  updateRestaurantByAdmin,
  deleteRestaurantByAdmin,
  getRestaurantByUser,
  getRestaurantDataByUser,
};
