import { Card, Chip, IconButton } from "@mui/material";
import React from "react";
import FavoriteItem from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const RestaurantCard = () => {
    const isOpen = true; 
    const isFavorited = true; 

    return (
        <Card className='w-[18rem]'>
            <div className={`${isOpen ? 'cursor-pointer' : 'cursor-not-allowed'} relative`}>
                <img 
                    className='w-full h-[10rem] rounded-t-md object-cover'
                    src="https://lh3.googleusercontent.com/p/AF1QipM9qZNNFKjtTunsFhXmtE8WEXyvkbHhVYgW0nZh=s1360-w1360-h1020" 
                    alt="Slovakian Fast Food"
                />

                <Chip 
                    size="small"
                    className='absolute top-2 left-2'
                    color={isOpen ? "success" : "error"} 
                    label={isOpen ? "Open" : "Closed"} 
                />
            </div>

            <div className='p-4 textPart lg:flex w-full justify-between'>
                <div className='space-y-1'>
                    <p className="font-semibold text-lg">Slovakian Fast Food</p>
                    <p className='text-gray-500 text-sm'>
                        Craving it all? 
                    </p>
                </div>

                <div>
                    <IconButton>
                        {isFavorited ? <FavoriteItem /> : <FavoriteBorderIcon />}
                    </IconButton>
                </div>
            </div>
        </Card>
    );
}

export default RestaurantCard;
