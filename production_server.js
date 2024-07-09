import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import { fileURLToPath } from "url";
import serveStatic from "serve-static";
import morgan from "morgan";
import os from "os";

// 获取当前文件的目录名
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 从环境变量中读取端口，默认为 3000
const port = 3000;

// 静态文件夹
app.use(serveStatic(path.join(__dirname, "dist")));
app.use(
  morgan(":method :date[iso] :remote-addr :url :status :response-time ms")
);

// 代理配置
app.use(
  "/api",
  createProxyMiddleware({
    target: "http://localhost:5000/",
    changeOrigin: true,
    pathRewrite: {
      "^/api": "",
    },
  })
);

// 其他请求处理
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  // 获取本地网络地址
  const networkInterfaces = os.networkInterfaces();
  const localAddress = `http://localhost:${port}`;
  let networkAddress = "";

  for (const interfaceName of Object.keys(networkInterfaces)) {
    for (const networkInterface of networkInterfaces[interfaceName]) {
      if (networkInterface.family === "IPv4" && !networkInterface.internal) {
        networkAddress = `http://${networkInterface.address}:${port}`;
      }
    }
  }

  // 打印启动界面
  console.log(`
   ┌────────────────────────────────────────────
   │
   │   Serving!                     
   │          
   │   - Local:    ${localAddress}             
   │   - Network:  ${networkAddress}   
   │
   │   Copied local address to clipboard! 
   │
   └────────────────────────────────────────────
  `);

});
