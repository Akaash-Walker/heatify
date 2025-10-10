import countries  from "../const/countries.json"
import legendItems from "./LegendItems";
import axios from "axios";

class LoadCountriesTask{

    dataurl = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/refs/heads/web-data/data/cases_country.csv"

    setState = null;
    features = countries.features as any[];


    load = (setState): boolean=>{
        this.setState = setState;
        /*
        papa.parse(this.dataurl, {
            download:true,
            header:true,
            complete: (result)=>  this.#processData(result.data)
        })  */
        this.#processData();
        return false;
    }

    #processData = () => {
       axios.post('/api/get', { userId: "awalker7179gmailcom" })
    .then(response => {
        const countryCount: Record<string, number> = {}
        for (const data of response.data){
            if(data.country != "NO_COUNTRY"){
            if (!countryCount[data.country])
                countryCount[data.country] = 1
            else
                countryCount[data.country]++
        }
        }
        for (let i = 0; i < this.features.length; i++)
            this.#setCountryColor(this.features[i], 0) 
        for (const [iso, count] of Object.entries(countryCount)) {
            const dataCountry = this.features.find(
            feature => feature.properties.ISO_A3 === iso);
            this.#setCountryColor(dataCountry, count) 
    }
        this.setState(this.features);
    })
        .catch(error => console.error(error));
}

            /*
            const dataCountry = countries.find((dataCountry)=> dataCountry.ISO3 === country.properties.ISO_A3)

            country.properties.confirmed = 0;
            country.properties.confirmedText = "0";

            if (dataCountry != null) {
                const confirmed = Number(dataCountry.Confirmed)
                country.properties.confirmed = confirmed
                country.properties.confirmedText = this.formatNumberWithCommas(confirmed)
            } 
            */

    #setCountryColor = (country, count) =>{
        const legendItem = legendItems.find((item)=> item.isFor(count))

        if(legendItem != null) {
            country.properties.color = legendItem.color;
        }
    }

   formatNumberWithCommas = function (number: number)  {
   return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
 };

getArtists(ISO_A3): Promise<string[]> {
    return axios.post('/api/get', { userId: "awalker7179gmailcom" })
      .then(response => {
        const artists: string[] = [];
        for (const data of response.data) {
          if (data.country === ISO_A3) {
            artists.push(data.name);
          }
        }
        return artists; // return inside the promise
      });
}
}

export default LoadCountriesTask;