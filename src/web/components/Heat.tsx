import React, {useState, useEffect} from 'react'
import Heatmap from "./heatmap"
import Legend from "./Legend"

const Heat = () => {
    const [countries, setCountries] = useState([]);

    return(
        <div>
            {countries.length === 0 ? <p>No Data</p> : <div></div>}
        </div>
    )
}

export default Heat