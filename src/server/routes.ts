import { Router} from "express";

const router = Router();

// example route
router.get('/', (_req, res) => {
    res.send('Hello from Express!');
});

export default router;