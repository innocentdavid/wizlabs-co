import { spawn } from "child_process";
import { readFileSync, writeFileSync } from "fs";
import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

function handler(req, res) {
  if (req.method === "POST") {
    const order = req.body;
    console.log("Received order:", order);
    const orders = JSON.parse(readFileSync("orders.json", "utf8")) || [];
    orders.push(order);
    writeFileSync("orders.json", JSON.stringify(orders));

    const child = spawn("node", ["whatsapp.js"]);
    child.on("exit", (code) => {
      console.log(`whatsapp.js exited with code ${code}`);
    });

    res.status(200).send("Order received");
  } else {
    res.status(404).send("Not found");
  }
}

export default handler;
