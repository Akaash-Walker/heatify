import axios from "axios";
import {useState} from "react";
import type Artist from "../../lib/artist.ts";
import type Item from "../../lib/item.ts";


export default function TestPage() {
    const access_token = localStorage.getItem('access_token');
    const [artists, setArtists] = useState<string[]>([]);

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

    return (
        <div>
            <button className={"btn btn-primary"} onClick={getRecentlyPlayed}>Get Recently Played</button>
            {artists.map((artist, index) => (
                <div key={index}>{`No. ${index + 1}. ${artist}`}</div>
            ))}
        </div>
    )
}