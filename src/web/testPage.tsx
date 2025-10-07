import axios from "axios";

export default function TestPage() {
    const access_token = localStorage.getItem('access_token');

    const getRecentlyPlayed = async () => {
        axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + access_token
            },
        }).then(
            response => {
                console.log(response.data);
            }
        )
    }

    return (
        <div>
            {access_token}
            <button className={"btn btn-primary"} onClick={getRecentlyPlayed}>Get Recently Played</button>
        </div>
    )
}