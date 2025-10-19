# Heatify

**Heatify** is a full-stack web app that visualizes where your favorite music comes from.  
By connecting your Spotify account, Heatify generates a **heatmap of the countries of origin of your recently listened-to artists** — giving you an interactive view of your global listening habits.

[Heatify Preview](https://heatifyapp.onrender.com)

---

## Features

- **Spotify Integration** – Connect your Spotify account to fetch your recently played songs via the Spotify Web API.
- **Artist Origin Heatmap** – Visualizes the countries of origin of artists using **Leaflet.js**.
- **AI-Powered Aritst Search** – Spotify doesn’t provide artist nationality data, so Heatify uses the **Gemini API** to infer each artist’s country of origin.
- **Persistent User Data** – Signed-up users have their songs stored in **MongoDB**, allowing their heatmap to grow over time.
- **Responsive UI** – Built with **React**, **Tailwind CSS**, and **DaisyUI** for a clean, modern interface.
- **TypeScript Throughout** – Both frontend and backend are strongly typed for reliability and scalability.
- **Full-Stack Architecture** – Uses **Node.js** and **Express** for the backend.
- **Live Deployment** – Hosted on **Render** (free tier, so there may be a brief initial load delay).

---

## How It Works

1. **Spotify Auth** – Users log in via Spotify OAuth.
2. **Data Fetching** – The app retrieves a list of your recently listened-to artists.
3. **AI Augmentation** – The Gemini API provides missing metadata (artist's country of origin).
4. **Data Storage** – Artist and song data are stored in MongoDB for logged-in users.
5. **Visualization** – Leaflet renders the aggregated artist locations as a color-coded heatmap.

---

## Tech Stack

**Frontend:**
- React  
- TypeScript  
- Tailwind CSS + DaisyUI  
- Leaflet.js  

**Backend:**
- Node.js  
- Express  
- MongoDB  
- Gemini API (AI search for artist metadata)  
- Spotify Web API  

**Deployment:**
- Hosted on [Render](https://render.com/)  

---

## Known Limitations

Due to **Spotify API restrictions**, Heatify can only authorize up to **25 users** under the default developer quota.  
Expanding this would require applying for **extended quota usage**, which is limited to registered businesses with 250k+ monthly active users — far beyond the scope of this demo. To combat this, we created a test Google account to log into Spotify with. 

`Email: heatifyapp@gmail.com`

`Password: WebWareA25!`

We recommend using a private/incognito window when logging in, as not to interfere with any currently signed in Spotify account. When logging in, make sure to use the "Login with Google" option, as these are the credentials for a Google account. We had to do this because Google allows us to disable 2FA, while Spotify doesn't. This allows any users to log into this account and demo our app. 

---

## Contributors

Written by 3 developers

[Dillon](https://github.com/BigMouthInc)

[Cam](https://github.com/crnorris1)

[Akaash](https://github.com/Akaash-Walker)
