import React from "react";
import './Home.css';
import MultiItemCarousel from './MultiItemCarousel';
import RestaurantCard from "../Restaurant/RestaurantCard";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";

const restaurant = [1, 1, 1, 1, 1, 1]
const Home = () => {
    const navigate = useNavigate()
    return (
        <div className="pb-10">
            <section className='banner  -z -50 relative flex flex-col justify-center items-center'>

                <div className='w -[50vw] text-center z-10'>
                    <p className='text-2xl lg:text-6xl font-bold text-white py-5 z-10'> Martiniuc Food</p>
                    <IconButton onClick={() => navigate("/")}>
            
                    </IconButton>
                    <p className='text-gray-300 text-xl lg:text-4xl z-10'>Taste the Convenience: Food, Fast and Delivered.</p>
                </div>

                <div className='cover absolute top-0 left-0 right-0'></div>
                <div className='fadout'></div>
            </section>

            <section className='p-10 lg:py-10 lg:px-20 '>
                <p className='text-2xl font-semibold text-gray-400 py-3 pb-10'>Top Meals</p>
                <MultiItemCarousel />
            </section>

            <section className='px-5 lg:px-20 pt-10'>
                <h1 className='text-2xl font-semibold text-gray-400 pb-8'>Order From Our Handpicked Favourites</h1>
                <div className="flex flex-wrap items-center justify-around gap-5">
                    {
                        restaurant.map((item) => <RestaurantCard />)
                    }
                </div>
            </section>
        </div>
    );
}

export default Home
