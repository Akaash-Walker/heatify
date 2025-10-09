import MongoConnection from "../mongoConnection.ts";
import type {Collection} from "mongodb";
import {Router} from "express";

const router = Router();
// Connect to MongoDB
const client = await MongoConnection();


/* CONNECTION TO MONGODB */
let collection: Collection<Document>;

router.get("/docs", async (_req, res) => {
    if (collection !== undefined) {
        const docs = await collection.find({}).toArray()
        res.json(docs)
    }
})

router.post("/load", async (req, res) => {
    //const data = req.body.list;
    const userId = req.body.userId;
    const response = req.body.response;

    console.log("User ID: ", userId);
    console.log("Response: ", response);

    for (let i = 0; i < response.length; i++) {
      //Switch to said userId collection
      collection = client.db("myDatabase").collection(userId);
    
      //All the passed in last listened to artists
      const checkArtist = await collection.findOne({name: response[i].name})
    
      //If the current artist has not been logged in the collection
      if (!checkArtist) {
        await collection.insertOne({
          name: response[i].name,
          country: response[i].country
        });
      }
        
      if (response[i].name === "AJR"){
        console.log("What the heck")
        res.json({message: "HE LISTENS TO AJR"});
      }
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

/*
router.post("/load", async (req, res) => {
    const data = req.body.list;
    const userId = req.body.userId;
    const response = req.body.response;

    console.log("User ID: ", userId);
    console.log("Response: ", response);

    for (let i = 0; i < data.length; i++) {
        //Find what user we are dealing with
        const colName = data[i].userId; //Possible placeholder, wait for what constitutes the doc name
        //Switch to said collection
        collection = client.db("myDatabase").collection(colName);
    
        //All the passed in last listened to artists
        const listenedArtists = data[i].recentlyListened;
    
        for (let n = 0; n < listenedArtists.length; n++) {
            const checkArtist = await collection.findOne({name: listenedArtists[n].artistId})
    
            //If the current artist has not been logged in the collection
            if (!checkArtist) {
                //console.log("Adding artist to database " + listenedArtists[n].artistId)
                await collection.insertOne({
                    name: listenedArtists[n].artistId,
                    country: listenedArtists[n].country
                });
            } else {
                //console.log("Already exists " + listenedArtists[n].artistId)
            }
        }
    
        //All the documents in that user's data
        const docs = await collection.find({}).toArray();
        console.log("docs in collection", docs);
    
    }
    res.json({message: "Done"});

})*/

export default router;