import './App.css';
import React from "react";
import {Route, Routes} from "react-router";
import {SpotifyList} from "./components/SpotifyList";
import {CreateBaiHat} from "./components/CreateBaiHat";

function App() {
    return (
        <>
            <Routes>
                <Route path={`/`} element={<SpotifyList/>}/>
                <Route path={`/create`} element={<CreateBaiHat/>}/>
            </Routes>
        </>
    );
}

export default App;
