import dns from "node:dns";
import "dotenv/config";

// fix for Windows DNS resolution issue with MongoDB Atlas on Node 24
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);

export const MONGO_URI = process.env.MONGO_URI;
export const PORT = process.env.PORT || 8000;
