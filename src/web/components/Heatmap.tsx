import {MapContainer, GeoJSON} from "react-leaflet"
import "leaflet/dist/leaflet.css";
import "./Heatmap.css"
import type { GeoJSON as GeoJSONType } from "geojson";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadCountriesTask from "../../tasks/LoadCountriesTask";

const Heatmap = ({countries}: {countries: GeoJSONType}) =>  {

    const mapStyle = {
        fillColor: "white",
        weight:1,
        color:"black",
        fillOpacity:1
    };

    
    const onEachCountry = (country, layer) =>{
        layer.options.fillColor = country.properties.color;
        const name = country.properties.ADMIN;
        const loadCountriesTask = new LoadCountriesTask();
        loadCountriesTask.getArtists(country.properties.ISO_A3).then(artists => {
        layer.bindPopup(`${name}<br>${artists}`);
    });
    }

    return (
        <MapContainer className="h-[calc(82vh)]" zoom={2} center={[20, 100]}>
        <GeoJSON style = {mapStyle} data = {countries} onEachFeature={onEachCountry}  />
    </MapContainer>
    )
}

export default Heatmap