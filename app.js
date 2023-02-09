import * as dotenv from "dotenv";
dotenv.config();
console.log(process.env.API_KEY);
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const port = 3000;

// Allow CORS from any origin
app.use(cors());

// Routes

// Test route, visit localhost:3000 to confirm it's working
// should show 'Hello World!' in the browser
app.get("/", (req, res) => res.send("Hello World!"));

// Our Open Weather Map relay route!
app.get("/getArrivals", async (req, res) => {
  try {
    console.log("req", req);
    console.log("res", res);
    console.log(
      `https://developerservices.itsmarta.com:18096/railrealtimearrivals?apiKey=${process.env.API_KEY}`
    );
    // It uses node-fetch to call the goodreads api, and reads the key from .env
    const response = await fetch(
      `https://developerservices.itsmarta.com:18096/railrealtimearrivals?apiKey=${process.env.API_KEY}`
    );
    const json = await response.json();

    return res.json({
      success: true,
      json,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// This spins up our sever and generates logs for us to use.
// Any console.log statements you use in node for debugging will show up in your
// terminal, not in the browser console!
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
