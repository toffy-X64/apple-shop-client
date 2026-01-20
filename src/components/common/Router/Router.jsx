import { Route, Routes } from "react-router-dom";

import Home from "@pages/Home";
import NotFound from '@pages/NotFound';
import Checkout from "@pages/Checkout";
import Product from "@pages/Product";
import Category from "@pages/Category";

const Router = () => {
    return (
        <Routes>
            <Route path = '/' element = { <Home /> } />
            <Route path = '/checkout' element = { <Checkout /> } />
            <Route path = '/product/:slug' element = { <Product /> } />
            <Route path = '/category/:slug' element = { <Category /> } />
            <Route path = '*' element = { <NotFound /> } />
        </Routes>
    );
}

export default Router;