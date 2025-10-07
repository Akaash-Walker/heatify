import countries  from "../const/countries.json"
import papa from "papaparse"
import legendItems from "./LegendItems";

class LoadCountriesTask{

    dataurl = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/refs/heads/web-data/data/cases_country.csv"

    setState = null;
    features = countries.features as any[];


    load = (setState)=>{
        this.setState = setState;
        papa.parse(this.dataurl, {
            download:true,
            header:true,
            complete: (result)=>  this.#processData(result.data)
        })
    }

    #processData = (countries)=> {
        for(let i = 0; i < this.features.length; i++){
            const country = this.features[i];
            const dataCountry = countries.find((dataCountry)=> dataCountry.ISO3 === country.properties.ISO_A3)

            country.properties.confirmed = 0;
            country.properties.confirmedText = "0";

            if (dataCountry != null) {
                const confirmed = Number(dataCountry.Confirmed)
                country.properties.confirmed = confirmed
                country.properties.confirmedText = this.formatNumberWithCommas(confirmed)
            } 

            this.#setCountryColor(country)
        }

        this.setState(this.features)
    }

    #setCountryColor = (country) =>{
        const legendItem = legendItems.find((item)=> item.isFor(country.properties.confirmed))

        if(legendItem != null) {
            country.properties.color = legendItem.color;
        }
    }

    formatNumberWithCommas = function (number: number)  {
   return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
 };
}

export default LoadCountriesTask;