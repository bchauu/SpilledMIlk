import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import { UserProvider } from "./contexts/user";
import App from "./App";
import Details from "./list/Details";
import List from "./list/List";
import Login from './user/Login';
import PrivateRoute from './user/PrivateRoute';
import Signup from './user/Signup';
import SharedList from "./list/SharedList";
import "./scss/app"

const root = createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <UserProvider>
            <Routes>
                <Route path='/' element={<App/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/movie/:tmdbId' element={<Details/>}/>
                <Route path='/sharedList/:userId' element={<SharedList/>}/>
                <Route element={<PrivateRoute/>}>
                    <Route path='/movieList' element={<List/>}/>
                </Route>
            </Routes>
        </UserProvider>
    </BrowserRouter>
    );

