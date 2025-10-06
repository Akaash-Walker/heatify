import { createRoot } from 'react-dom/client'
import Home from "./home.tsx";
import {StrictMode} from "react";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Home/>
    </StrictMode>,
);
