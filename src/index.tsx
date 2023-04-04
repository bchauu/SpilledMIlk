import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import App from "./App";
import MovieDetail from "./search/MovieDetail";
import List from "./list/List";
import "./scss/app"

const root = createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App/>}></Route>
            <Route path='/movie/:tmdbId' element={<MovieDetail/>}></Route>
            <Route path='/movieList' element={<List/>}></Route>
        </Routes>
    </BrowserRouter>
    );
