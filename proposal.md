# Group 16 Final Project Proposal - Heatify

Our project idea is to make a website where a user can see a heatmap of the world with artistst that they listen to. The map would be intereactive, where users could zoom in and see what artists are from a specific country.

For technologies, we plan to use React, Express, TailwindCSS, TypeScript, MongoDB, Spotify Web API, and Auth0. Users can log in and connect their account to our application, after which they are presetned with a map of the world. Using the Spotify web api, we can access the user's recently listen to songs. The web api gives us access to information about these songs, such as the artist, duration, track name, album, and more. After collecting the artists name, we would perform a search to see where that artist is from. In our database we would store a list of countries, each of which would have a list of artists that the user has listened to, respective to their country. 

When the user wants to view their heatmap, we would make a query to the database to get the list of artists for each country. Depending on the number of artists in a given country, we would increase the color or "heat" of that country. Since we are in the US, we would also include individual states for more information. Users can hover over each country to see a list of their listened artists from that country. 
