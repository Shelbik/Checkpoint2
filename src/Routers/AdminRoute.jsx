import { Route } from "react-router-dom";
import React from "react";

export const AdminRoute = () => {
    return (
        <div>
            <Routes>
                <Route path="/*" element={false ? <createRestaurantForm /> : <Admin />}></Route>
            </Routes>
        </div>
    )
}