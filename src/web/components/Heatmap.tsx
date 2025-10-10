import {MapContainer, GeoJSON} from "react-leaflet"
import "leaflet/dist/leaflet.css";
import "./Heatmap.css"
import type { GeoJSON as GeoJSONType } from "geojson";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadCountriesTask from "../../tasks/LoadCountriesTask";

const Heatmap = ({countries}: {countries: GeoJSONType}) =>  {

    const mapStyle = {
        fillColor: "#404040ff",
        weight:1,
        color:"#e1ddddff",
        fillOpacity:1
    };

    
    const onEachCountry = (country, layer) =>{
        layer.options.fillColor = country.properties.color;
        const name = country.properties.ADMIN;
        const loadCountriesTask = new LoadCountriesTask();
        loadCountriesTask.getArtists(country.properties.ISO_A3).then(artists => {
        const artistList = artists.join("<br>");
        layer.bindPopup(`<b>${name}</b><br>${artistList}`);   
    });
    }

    return (
        <MapContainer className="h-[calc(82vh)]" zoom={2} center={[20, 100]}>
        <GeoJSON style = {mapStyle} data = {countries} onEachFeature={onEachCountry}  />
    </MapContainer>
    )
}

export default Heatmap