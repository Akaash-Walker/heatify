import {MapContainer, GeoJSON} from "react-leaflet"
import "leaflet/dist/leaflet.css";
import "./Heatmap.css"
import type { GeoJSON as GeoJSONType } from "geojson";
import axios from "axios";
import LoadCountriesTask from "../../tasks/LoadCountriesTask";

async function getUserEmail(accessToken: string | null): Promise<string> {
  try {
    const res = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    return res.data.email;
  } catch (error: any) {
    console.error("Failed to fetch Spotify user info:", error.response?.data || error.message);
    throw error;
  }
}


const access_token = localStorage.getItem('access_token');
const username = await getUserEmail(access_token);

const Heatmap = ({countries}: {countries: GeoJSONType}) =>  {

    const mapStyle = {
        fillColor: "#404040ff",
        weight:1,
        color:"#e1ddddff",
        fillOpacity:1
    };

    
    const onEachCountry = (country: { properties: { color: any; ADMIN: any; ISO_A3: any; }; }, layer: { options: { fillColor: any; }; bindPopup: (arg0: string) => void; }) =>{
        layer.options.fillColor = country.properties.color;
        const name = country.properties.ADMIN;
        const loadCountriesTask = new LoadCountriesTask();
        loadCountriesTask.getArtists(country.properties.ISO_A3, username).then(artists => {
        const artistList = artists.join("<br>");
        layer.bindPopup(`<b>${name}</b><br>${artistList}`);   
        })
    };
    


    return (
        <MapContainer className="h-[calc(82vh)]" zoom={2} center={[20, 100]}>
        <GeoJSON style = {mapStyle} data = {countries} onEachFeature={onEachCountry}  />
    </MapContainer>
    )
}

export default Heatmap