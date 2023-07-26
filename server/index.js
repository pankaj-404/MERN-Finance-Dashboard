import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpi.js";
import productRoutes from "./routes/product.js"
import transactionRoutes from "./routes/transaction.js"

// Import Data
import { kpis, products, transactions } from "./data/data.js";
import KPI from "./models/KPI.js";
import Product from "./models/Product.js";
import Transaction from "./models/Transaction.js";

//Configurations
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use("/kpi", kpiRoutes); // /kpi/kpis
app.use("/product", productRoutes); // /product/products
app.use("/transaction", transactionRoutes); // /transaction/transactions

// MONGOOSE Setup
const PORT = process.env.PORT || 1337;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

    // ! Insert data //! # Do not uncomment the below lines until you want to insert data to the DB. # Once data insertion in the DB is done, comment those lines again to avoid data duplication.
    // KPI.insertMany(kpis); //inset data only once
    // Product.insertMany(products); //inset data only once
    // Transaction.insertMany(transactions); //inset data only once
  })
  .catch((err) =>
    console.log(`Error: ${err}.
  Server could not connect`)
  );
