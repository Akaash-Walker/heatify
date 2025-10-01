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
