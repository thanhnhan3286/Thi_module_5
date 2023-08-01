import './App.css';
import React from "react";
import {Route, Routes} from "react-router";
import {ListSong} from "./components/ListSong";
import {CreateSong} from "./components/CreateSong";

function App() {
    return (
        <>
            <Routes>
                <Route path={`/`} element={<ListSong/>}/>
                <Route path={`/create`} element={<CreateSong/>}/>
            </Routes>
        </>
    );
}

export default App;
