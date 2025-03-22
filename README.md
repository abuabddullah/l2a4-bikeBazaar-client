## issues :

-কার্ডে প্রোডাক্টের Title, Image, Price, <span style="color: red;">**_Rating_**</span>, Details Button, Add to Cart ইত্যাদি থাকতে হবে। -<span style="color: red;">**_কোন Unclickable বাটন/রাউট/লিংক রাখা যাবেনা।_**</span>

-Product Details,<span style="color: red;">**_Star Rating, Average Ratings, এবং Suggested Product এর জন্য আলাদা সেকশন থাকতে হবে।_**</span>

```
// models/Review.js
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);

// controllers/reviewController.js
const Review = require("../models/Review");
const Order = require("../models/Order");

// Add a Review
exports.addReview = async (req, res) => {
  try {
    const { productId, rating, review } = req.body;
    const userId = req.user.id; // Assuming you have user authentication

    // Check if user has a successful order for this product
    const order = await Order.findOne({
      userId,
      "items.productId": productId,
      paymentStatus: "completed",
      status: { $in: ["pending", "delivered"] },
    });

    if (!order) {
      return res.status(403).json({ message: "You can only review purchased products." });
    }

    // Save review
    const newReview = new Review({ userId, productId, rating, review });
    await newReview.save();

    res.status(201).json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Get Reviews for a Product
exports.getReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ productId }).populate("userId", "name");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// routes/reviewRoutes.js
const express = require("express");
const { addReview, getReviews } = require("../controllers/reviewController");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, addReview); // Add Review
router.get("/:productId", getReviews); // Get Reviews

module.exports = router;

```

-<span style="color: red;">**_প্রোডাক্ট লোড করার সময় অবশ্যই Skeleton লোডিং ইউজ করতে হবে।_**</span>

-<span style="color: red;">**_প্রোডাক্ট লোড করার সময় অবশ্যই Skeleton লোডিং ইউজ করতে হবে।_**</span>

-<span style="color: red;">**_-নেভবারে প্রোফাইল আইকন ও ড্রপডাউন মেনু যুক্ত করতে হবে, যেখানে প্রোফাইল, লোগআউট ইত্যাদি অপশন থাকবে।_**</span>

-<span style="color: red;">**_"মাই প্রোফাইল" পেজ ডিজাইন রিজনেবল থাকবে হবে এবং সম্পূর্ণ পেইজ ব্যবহার কর ডিজাইন করতে হবে ।_**</span>

- Pagination ইমপ্লিমেন্ট করতে হবে।
- backend
- - querybuilder for getting allcollection
- - review+rating+avg rating from buyer only

# 🚴‍♂️ BikesBaazaar - E-Commerce Platform for Bicycles

**BikesBaazaar** is a full-stack e-commerce platform built for bicycle enthusiasts. It provides a seamless shopping experience for users to browse, filter, and purchase bicycles. The project is divided into two parts:

1. **Frontend**: Built with React.js.
2. **Backend**: Built with Node.js, Express, and MongoDB.

This repository contains the **frontend** code for the project. If you're interested in exploring the backend code, you can visit the [backend repository](https://github.com/abuabddullah/l2a4-bikeBazaar-server.git).

---

## ✨ Features

### Frontend Features

- **User Interface**:
  - Responsive design for seamless browsing on all devices.
  - Interactive product pages with filters and search functionality.
- **Shopping Cart**:
  - Add/remove products to/from the cart.
  - Real-time cart updates.
- **Checkout**:
  - Secure checkout process with payment integration.
- **User Dashboard**:
  - View order history and track orders.

### Backend Features

- **User Authentication**: JWT-based authentication.
- **Product Management**: CRUD operations for bicycles.
- **Payment Integration**: Secure payment processing via SSLCommerz.
- **Security**: Rate limiting, CORS, and Helmet for enhanced security.
- **Validation**: Robust schema validation using Zod.

---

## 🛠️ Installation Guide

Follow these steps to set up the **BikesBaazaar** frontend locally.

### Prerequisites

- Node.js (v18 or higher)
- Git

### Frontend Setup

1. **Clone the Frontend Repository**:

   ```bash
   git clone https://github.com/abuabddullah/l2a4-bikeBazaar-client.git
   cd l2a4-bikeBazaar-client
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Run the Frontend**:

   ```bash
   npm run dev
   ```

4. **Access the Application**:
   Open your browser and navigate to:
   ```
   http://localhost:5173/
   ```

---

## 🔗 Links

### Frontend

- **Live Site**: [https://bikebazaar-client.vercel.app/](https://bikebazaar-client.vercel.app/)
- **GitHub Repository**: [https://github.com/abuabddullah/l2a4-bikeBazaar-client.git](https://github.com/abuabddullah/l2a4-bikeBazaar-client.git)

### Backend

- **Live API**: [https://l2a4-bike-bazaar-server.vercel.app/](https://l2a4-bike-bazaar-server.vercel.app/)
- **GitHub Repository**: [https://github.com/abuabddullah/l2a4-bikeBazaar-server.git](https://github.com/abuabddullah/l2a4-bikeBazaar-server.git)

### Project Overview Video

- [Watch the Project Overview](https://drive.google.com/file/d/18q4ZYZrRhcKsxuWYKtAcDY4OxCcWIZ3e/view?usp=sharing)

---

## 🙏 Regards

Asif A Owadud
