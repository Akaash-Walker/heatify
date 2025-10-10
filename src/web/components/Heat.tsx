import {useState, useEffect} from 'react'
import Heatmap from "./Heatmap"
import Legend from "./Legend"
import LoadCountriesTask from '../../tasks/LoadCountriesTask'
import legendItems from '../../tasks/LegendItems';



const Heat = () => {
    const [countries, setCountries] = useState<any[]>([]);
    const legendItemsInReverse = [...legendItems].reverse()

    const load = () => {
        const loadCountriesTask = new LoadCountriesTask();
        loadCountriesTask.load(setCountries);
    };

    // grabs access token from URL hash and stores it in localStorage
    // needed for making authenticated requests to Spotify API
    const storeAccessToken = () => {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        const accessToken = params.get('access_token');
        if (accessToken) {
            localStorage.setItem('access_token', accessToken);
            // Optionally, remove the token from the URL
            window.location.hash = '';
        }
    }

    // on component mount, store access token and load country data
    useEffect(() => {
        storeAccessToken();
        load();
    }, [countries]);

    return(
        <div>
            {countries.length === 0 ? <div>No Data</div> : <div>
                <Heatmap countries={countries}/>
                <Legend legendItems={legendItemsInReverse}/>
                </div>}
        </div>
    )
}

export default Heat