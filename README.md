# Heatify
## Group 16: Dillon Bresnahan, Cameron Norris, Akaash Walker

1. A brief description of what you created, and a link to the project itself (two paragraphs of text)
2. Any additional instructions that might be needed to fully use your project (login information, etc.)
3. An outline of the technologies you used and how you used them.
4. What challenges you faced in completing the project.
5. What each group member was responsible for designing / developing.
6. What accessibility features you included in your project.

1. Heatify is a project where you can view where Spotify artists are from. Connect your Spootify account, and explore the world. Tell how many artists are from the country based off of its color. Click on countries and see which artists are from there. 
All of the artsit data is gotten from your Spotify account. Unfortunatly, Spotify does not store where artists are from. To circumvent this, a query is sent to Google Gemini that will inform the program where all of the artsist are from. This is then stored in a MongoDB database. After storage, all of the data, including artists and number of artists per country, is shown in a world map developed by Leaflet Link:
2. Users will need a Spotify account to use our program
3. We  used Typescript for our main programming language, Node for the server React for our front-end, Tailwind for styling, Spotify API and Gemini API to get information, mongoDB to store data, Leaflet to create the heatmap, and Axios for server queres.
4. We face no major challenges when completing the project, but had some minor challenges connecting the 3 main parts of the project (API, Mongo, and the Heatmap)
5. Akaash handled the API calls, Cameron handled the database, and Dillon was in charge of the heatmap. Together, we worked on styling and website design
6. We made sure the color design was clean so that people with sight issues could see properly. Along with this, there are no text entires necessary for easy use for everyone

