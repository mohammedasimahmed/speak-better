import express from "express";

function startServer() {
  const app = express();
  const {PORT} = process.env;

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

startServer();

