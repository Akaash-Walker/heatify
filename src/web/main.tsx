import { createRoot } from 'react-dom/client'
import Home from "./home.tsx";
import Heat from "./components/Heat.tsx"
import {Auth0Provider} from "@auth0/auth0-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

createRoot(document.getElementById('root')!).render(
    <Auth0Provider
        // move to env later
        domain="dev-yhen7sk0jojn6bpe.us.auth0.com"
        clientId="vKbeUBNPnB2LwlWTksn0npr7chbtqCmA"
        authorizationParams={{
            redirect_uri: window.location.origin
        }}
    >
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/heat" element={<Heat />} />
      </Routes>
    </Router>

    </Auth0Provider>,
);
