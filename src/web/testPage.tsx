import axios from "axios";
import {useEffect, useRef, useState} from "react";
import type Artist from "../../lib/artist.ts";
import type Item from "../../lib/item.ts";

export default function TestPage() {
    const access_token = localStorage.getItem('access_token');
    const [artists, setArtists] = useState<string[]>([]);
    const [response, setResponse] = useState("");
    const [prompt, setPrompt] = useState("");
    const [email, setEmail] = useState("");
    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        if (!access_token) {
            console.error("No access token found");
            return;
        }
        const runRequests = async () => {
            try {
                // 1. Get user's email
                const res1 = await axios.get('https://api.spotify.com/v1/me', {
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Bearer ' + access_token
                    },
                })
                const userEmail = res1.data.email;

                // 2. Get user's recently played tracks
                const res2 = await axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=2', {
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Bearer ' + access_token
                    },
                });
                const artists = res2.data.items.flatMap(
                    (item: Item) => item.track.artists.map((artist: Artist) => artist.name)
                ).filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);

                // 3. Post to Gemini to get country data
                const res3 = await axios.post('/api/gemini', {
                    prompt: artists
                });
                const responseData = res3.data;

                // 4. Post to db to combine email and data and store
                await axios.post("api/load", {
                    userId: userEmail,
                    response: responseData
                });
            } catch (error) {
                console.error("Error fetching user email: ", error);
            }
        }
        runRequests();
    }, []);

    const getUserData = async () => {
        axios.post('/api/get', {
            userId: "456"
        }).then(response => {
            console.log(response.data);
        })
    }


    return (
        <div className={"flex flex-col gap-4 p-4 w-1/2"}>
            <label className={"label font-bold"}>Email: {email}</label>
            <input className={"input w-full"} onChange={(e) => setPrompt(e.target.value)} />
            <button className={"btn btn-primary"}>Get Recently Played</button>
            <button className={"btn btn-secondary"}>Generate</button>
            <button className={"btn btn-accent"} onClick={() => getUserData()}>Get User 456 Data</button>
            <pre>{JSON.stringify(response, null, 2)}</pre>
            {artists.map((artist, index) => (
                <div key={index}>{`${artist},`}</div>
            ))}
        </div>
    )
}