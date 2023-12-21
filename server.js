import mongoose from "mongoose";
import app from "./app.js";
// eBJAKjLWmCyjbBg9
const DB_HOST =
  "mongodb+srv://Dima:eBJAKjLWmCyjbBg9@cluster0.yiepfkt.mongodb.net/db-contacts?retryWrites=true&w=majority";
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
