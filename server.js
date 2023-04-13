const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5002;
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");

connectDB();
const app = express();
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/usersRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
