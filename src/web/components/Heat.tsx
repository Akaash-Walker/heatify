import React, {useState, useEffect} from 'react'
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

    useEffect(load, []);

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