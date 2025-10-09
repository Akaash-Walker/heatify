// to read from env file
import * as dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//const result = dotenv.config();
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

import express from 'express';
import router from "./routes.ts";
const app = express();
const port = process.env.PORT || 3000;

// middleware to parse JSON bodies
app.use(express.json());

// using the router for all /api routes
app.use('/api', router);

// start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})