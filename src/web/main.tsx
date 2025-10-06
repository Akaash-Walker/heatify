import { createRoot } from 'react-dom/client'
import Home from "./home.tsx";
import {Auth0Provider} from "@auth0/auth0-react";

createRoot(document.getElementById('root')!).render(
    <Auth0Provider
        // move to env later
        domain="dev-yhen7sk0jojn6bpe.us.auth0.com"
        clientId="vKbeUBNPnB2LwlWTksn0npr7chbtqCmA"
        authorizationParams={{
            redirect_uri: window.location.origin
        }}
    >
        <Home/>
    </Auth0Provider>,
);
