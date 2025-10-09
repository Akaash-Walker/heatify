import axios from "axios";
import {useState} from "react";
import type Artist from "../../lib/artist.ts";
import type Item from "../../lib/item.ts";

export default function TestPage() {
    const access_token = localStorage.getItem('access_token');
    const [artists, setArtists] = useState<string[]>([]);
    const [response, setResponse] = useState("");
    const [prompt, setPrompt] = useState("");

    const getRecentlyPlayed = async () => {
        axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=50', {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + access_token
            },
        }).then(
            response => {
                console.log(response.data);
                const artists = response.data.items.flatMap(
                    (item: Item) => item.track.artists.map((artist: Artist) => artist.name)
                ).filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);
                console.log(artists);
                setArtists(artists);
            }
        )
    }

    const generateResponse = async () => {
        axios.post('/api/chat', {
            prompt: prompt
        }).then(response => {
                setResponse(response.data);
            })
    }

    const getUserData = async () => {
        axios.post('/api/get', {
            userId: "456"
        }).then(response => {
            console.log(response.data);
        })
    }

    return (
        <div className={"flex flex-col gap-4 p-4 w-1/2"}>
            <label className={"label font-bold"}>Enter a prompt to talk to a pirate.</label>
            <input className={"input w-full"} onChange={(e) => setPrompt(e.target.value)} />
            <button className={"btn btn-primary"} onClick={getRecentlyPlayed}>Get Recently Played</button>
            <button className={"btn btn-secondary"} onClick={() => generateResponse()}>Generate</button>
            <button className={"btn btn-accent"} onClick={() => getUserData()}>Get User Data</button>
            <div>{response}</div>
            {artists.map((artist, index) => (
                <div key={index}>{`No. ${index + 1}. ${artist}`}</div>
            ))}
        </div>
    )
}