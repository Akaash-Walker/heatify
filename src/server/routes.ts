import { Router} from "express";
import * as querystring from "node:querystring";
import crypto from "node:crypto";

const router = Router();
const client_id = "cb8bfc95d6e344a89d9f9033d8e440c0"
const redirect_uri = "http://127.0.0.1:5173/"

// Function to generate a random string for state parameter
function generateRandomString(length: number) {
    const randomBytes = crypto.randomBytes(Math.ceil(length / 2));
    const hexString = randomBytes.toString('hex');
    return hexString.slice(0, length);
}

router.get('/', (_req, res) => {
    res.send('Hello from Express!');
});

router.get('/login', (_req, res) => {
    const state = generateRandomString(16);
    const scope = 'user-read-private user-read-email';

    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
})


export default router;