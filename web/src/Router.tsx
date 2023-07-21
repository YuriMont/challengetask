import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";

export function Router(){
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/:page" element={<Home />}/>
            <Route path="/create" element={<Home />} />
            <Route path="/edit/:id" element={<Home />}/>
        </Routes>
    );
}