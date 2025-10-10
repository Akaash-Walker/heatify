import {useState, useEffect, Suspense, lazy} from 'react'
import Legend from "./Legend"
import LoadCountriesTask from '../../tasks/LoadCountriesTask'
import legendItems from '../../tasks/LegendItems';
import NoUserNav from "./noUserNav.tsx";
import Loading from "../loading.tsx";

const Heatmap = lazy(() => import('./Heatmap'));

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