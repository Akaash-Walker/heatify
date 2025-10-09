import { Router} from "express";
import * as querystring from "node:querystring";
import crypto from "node:crypto";
import dotenv from "dotenv";
import axios from "axios";
import { GoogleGenAI } from "@google/genai";
import Mongo from "./mongo.ts";
import type {Collection} from "mongodb";

dotenv.config();

const client_secret = process.env.CLIENT_SECRET || '';

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY,
});

// Connect to MongoDB
const client = await Mongo();

const router = Router();
const client_id = "cb8bfc95d6e344a89d9f9033d8e440c0"
const redirect_uri = "http://127.0.0.1:5173/api/callback"

// Function to generate a random string for state parameter
const generateRandomString = (length: number)=> {
    const randomBytes = crypto.randomBytes(Math.ceil(length / 2));
    const hexString = randomBytes.toString('hex');
    return hexString.slice(0, length);
}

// Route to initiate Spotify login
router.get('/login', (_req, res) => {
    const state = generateRandomString(16);
    const scope = 'user-read-private user-read-email user-read-recently-played';

    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
})

// Route to handle Spotify callback (return)
router.get('/callback', function(req, res) {

    const code = typeof req.query.code === 'string' ? req.query.code : '';
    const form = {
        code,
        redirect_uri,
        grant_type: 'authorization_code'
    };
    const state = req.query.state || null;

    if (state === null) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };



        axios.post(authOptions.url, querystring.stringify(form), {headers: authOptions.headers})
            .then(response => {
                if (response.status === 200) {

                    const access_token = response.data.access_token,
                        refresh_token = response.data.refresh_token;

                    const options = {
                        url: 'https://api.spotify.com/v1/me',
                        headers: { 'Authorization': 'Bearer ' + access_token },
                        json: true
                    };

                    // use access token to access the Spotify Web API
                    axios.get(options.url, {headers: options.headers}).then(response => {
                        console.log(response.data);
                    });

                    // pass token and redirect to /heat to make requests
                    res.redirect('http://127.0.0.1:5173/heat#' +
                        querystring.stringify({
                            access_token: access_token,
                            refresh_token: refresh_token
                        }));
                } else {
                    res.redirect('/#' +
                        querystring.stringify({
                            error: 'invalid_token'
                        }));
                }
            })
            .catch(error => {
                res.send(error);
            });
    }
});

// Route to refresh Spotify access token
router.post('/refresh_token', function(req, res) {
    // requesting access token from refresh token
    const refresh_token = req.body.refresh_token;
    const form = {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
    };

    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')) },
        form: form,
        json: true
    };

    axios.post(authOptions.url, querystring.stringify(form), {headers: authOptions.headers})
        .then(response => {
            if (response.status === 200) {
                const access_token = response.data.access_token;
                res.send({
                    'access_token': access_token
                });
            }
        })
        .catch(error => {
            res.send(error);
        });
});

// Route to handle chat requests
router.post('/chat', async (req, res) => {
    const prompt = req.body.prompt;
    console.log("Received prompt: ", prompt);
    await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction: "You are a pirate captain. Answer like a pirate.",
        }
    }).then(response => {
        console.log("AI response: ", response.text);
        res.send(response.text);
    }).catch(error => {
        console.error("Error from AI: ", error);
        res.status(500).json({ error: 'Error generating content' });
    });
})


/* CONNECTION TO MONGODB */

let collection: Collection<Document>;

router.get("/docs", async (_req, res) => {
    if (collection !== undefined) {
        const docs = await collection.find({}).toArray()
        res.json( docs )
    }
})

router.post("/load", async (req, res) =>{
    const data = req.body.list;

    for (let i = 0; i < data.length; i++){
        //Find what user we are dealing with
        const colName = data[i].userId; //Possible placeholder, wait for what constitutes the doc name
        //Switch to said collection
        collection = client.db("myDatabase").collection(colName);

        //All the passed in last listened to artists
        const listenedArtists = data[i].recentlyListened;

        for (let n = 0; n < listenedArtists.length; n++){
            const checkArtist = await collection.findOne({name: listenedArtists[n].artistId})

            //If the current artist has not been logged in the collection
            if (!checkArtist){
                //console.log("Adding artist to database " + listenedArtists[n].artistId)
                await collection.insertOne({name: listenedArtists[n].artistId, country: listenedArtists[n].country});
            }
            else{
                //console.log("Already exists " + listenedArtists[n].artistId)
            }
        }

        //All the documents in that user's data
        const docs = await collection.find({}).toArray();
        console.log("docs in collection", docs);

    }
    res.json({message: "Done"});

})

//Response is all documents in user's collection
/*Format (for user req.body.userId):
[
  {
    name: a4, country: US
  },
  {
    name: a5, country: UK
  }
]
*/
router.post("/get", async (req, res) => {
    //The id of the user corrisponding to the collection its data resides in
    const userId = req.body.userId;

    //The collection of artists and countries
    collection = client.db("myDatabase").collection(userId);

    //Array of documents in colleciton
    const docs = await collection.find({}).toArray();

    //Send as response
    res.json(docs);
})




export default router;