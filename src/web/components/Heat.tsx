import {useState, useEffect, Suspense, lazy} from 'react'
import Legend from "./Legend"
import LoadCountriesTask from '../../tasks/LoadCountriesTask'
import legendItems from '../../tasks/LegendItems';
import NoUserNav from "./noUserNav.tsx";
import Loading from "../loading.tsx";
import axios from "axios";
import type Item from "../../../lib/item.ts";
import type Artist from "../../../lib/artist.ts";

const Heatmap = lazy(() => import('./Heatmap'));

const access_token = localStorage.getItem('access_token');
const hasRun = { current: false };

type CountryGeoJSON = GeoJSON.FeatureCollection;

const Heat = () => {
    const [countries, setCountries] = useState<CountryGeoJSON[] | null>(null);
    const legendItemsInReverse = [...legendItems].reverse()

    // on component mount, store access token and load country data
    useEffect(() => {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        const accessToken = params.get('access_token');
        if (accessToken) {
            localStorage.setItem('access_token', accessToken);
            window.location.hash = '';
        }
        const loadCountriesTask = new LoadCountriesTask();
        loadCountriesTask.load(setCountries);

        // Fetch user data and store in DB
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
                const res2 = await axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=50', {
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

    useEffect(() => {

    }, []);

    return (
        <div>
            <Suspense fallback={<Loading />}>
                {!countries ? (
                    <Loading />
                ) : (
                    <>
                        <NoUserNav />
                        <Heatmap countries={countries} />
                        <Legend legendItems={legendItemsInReverse} />
                    </>
                )}
            </Suspense>
        </div>
    );
}

export default Heat