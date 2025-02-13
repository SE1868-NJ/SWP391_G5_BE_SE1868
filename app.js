const express = require('express');
const Products = require('./src/routers/productRouter')
const orderRouter = require('./src/routers/OrderRouter')
const cartRouter = require('./src/routers/CartRouter')
const VoucherRouter = require('./src/routers/VoucherRouter')
const CustomerRouter = require('./src/routers/CustomerRouter')
const AddressRouter = require('./src/routers/AddressRouter')

const app = express();
const cors = require('cors');

const allowedOrigins = [
  "http://localhost:3000",
  "web_deploy",
];

const port = 3001;
app.use(express.json());
app.use(cors());


//http://localhost:3001/api/Order/CheckOut
app.use('/api/Order',orderRouter)
app.use('/api/Cart',cartRouter)
app.use('/api/Voucher',VoucherRouter)
app.use('/api/Products', Products)

http://localhost:3001/api/address/customer/:AddressID
app.use('/api/address', AddressRouter);

//http://localhost:3001/customers
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/uploads", express.static("src/uploads"));
app.use("/customers", CustomerRouter);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
