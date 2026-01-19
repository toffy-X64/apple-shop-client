import { Route, Routes } from "react-router-dom";

import Home from "@pages/Home";
import NotFound from '@pages/NotFound';
import Checkout from "@pages/Checkout";

const Router = () => {
    return (
        <Routes>
            <Route path = '/' element = { <Home /> } />
            <Route path = '/checkout' element = { <Checkout /> } />
            <Route path = '*' element = { <NotFound /> } />
        </Routes>
    );
}

export default Router;