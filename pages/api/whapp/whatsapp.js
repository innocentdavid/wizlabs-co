const { Client, LocalAuth } = require("whatsapp-web.js");
const fs = require("fs");

console.log("Connection to Whatsapp Web Client");

const client = new Client({
  puppeteer: {
    executablePath: "/usr/bin/brave-browser-stable",
  },
  authStrategy: new LocalAuth({
    clientId: "client-one",
  }),
  puppeteer: {
    headless: false,
  },
});

const phoneNumbers = ["573165014415@c.us", "573116600333@c.us"];

const sendNewOrderMessage = (order) => {
  const message = `New order received:\n\nCURRENCY PAIR: ${order.symbol}\ntype: ${order.type}\nvolumen: ${order.volume}\nprice: ${order.price}\n\ntake_profit: ${order.take_profit}\n\nstop_loss: ${order.stop_loss}`;

  for (const phoneNumber of phoneNumbers) {
    client.sendMessage(phoneNumber, message);
  }
};

const clientPromise = new Promise((resolve, reject) => {
  client.on("authenticated", (session) => {
    console.log("WHATSAPP WEB => Authenticated");
  });

  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  });

  client.on("ready", async () => {
    console.log("WHATSAPP WEB => Ready");

    let orders = JSON.parse(fs.readFileSync("orders.json", "utf8"));

    fs.watchFile("orders.json", (curr, prev) => {
      if (curr.mtime !== prev.mtime) {
        orders = JSON.parse(fs.readFileSync("orders.json", "utf8"));

        const newOrders = orders.slice(prevOrderCount);
        prevOrderCount = orders.length;

        for (const order of newOrders) {
          sendNewOrderMessage(order);
        }
      }
    });

    let prevOrderCount = orders.length;
  });

  client.initialize();
});

clientPromise.catch((error) => {
  console.error("Error initializing WhatsApp client", error);
});
