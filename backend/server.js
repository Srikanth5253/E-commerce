import "./config/env.js";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth/authRoutes.js";

import adminProductRoutes from "./routes/admin/productRoutes.js"
import adminRoutes from "./routes/admin/adminRoutes.js";
import adminChatRoutes from "./routes/admin/chatRoutes.js";

import userProductRoutes from "./routes/user/productRoutes.js";
import cartRoutes from "./routes/user/cartRoutes.js";
import wishlistRoutes from "./routes/user/wishlistRoutes.js";
import orderRoutes from "./routes/user/orderRoutes.js";
import userChatRoutes from "./routes/user/chatRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";


const app = express();

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://e-commerce-nexcart.vercel.app",
      "https://e-commerce-git-main-nexcart.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

app.use("/api/auth", authRoutes);
app.use(
  "/api/admin/products",
  adminProductRoutes
);

app.use(
  "/api/user/products",
  userProductRoutes
);

app.use(
  "/api/cart",
  cartRoutes
);

app.use(
  "/api/wishlist",
  wishlistRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

app.use(
  "/api/orders",
  orderRoutes
);

app.use(
  "/api/user/chat",
  userChatRoutes
);

app.use(
  "/api/admin/chat",
  adminChatRoutes
);

app.get("/api/health", (req, res) => {
  res.json({ status: "Server Running" });
});

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on ${PORT}`);
    });

  } catch (error) {
    console.error("Server failed:", error.message);
  }
};

startServer();
