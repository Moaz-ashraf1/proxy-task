const express = require("express");
const morgan = require("morgan");
const http = require("http");
const httpProxy = require("http-proxy");

const app = express();
app.use(morgan("dev"));

// Create a proxy server
const proxy = httpProxy.createProxyServer();

// Define a route to handle proxy requests
app.post("/proxy", (req, res) => {
  const targetUrl = "https://developer.mozilla.org/en-US/docs/Web/API/URL_API"; // Replace with your API server's URL

  proxy.web(req, res, { target: targetUrl });

  proxy.on("proxyReq", (proxyRes) => {
    console.log(proxyRes);
  });
});

// Error handling for the proxy server
proxy.on("error", (err, req, res) => {
  console.error("proxy Error:", err);
  res.status(500).json({ error: "proxy Server Error" });
});

// Start the Express server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
