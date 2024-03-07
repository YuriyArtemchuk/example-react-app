// // import cors from "cors";

// const express = require("express");
// const path = require(path);

// const cors = require("cors");
// const app = express();
// // const port = 3000;

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   next();
// });

// app.get("/books", (req, res) => {
//   const filePath = path.join(__dirname, "books.json");

//   res.sendFile(filePath, (err) => {
//     if (err) {
//       console.error("Error sending file:", err);
//       res.status(404).send("File not found");
//     } else {
//       console.log("File sent successfully");
//     }
//   });
// });

// app.listen(8080, () => {
//   console.log("Server is running on port 8080");
// });
