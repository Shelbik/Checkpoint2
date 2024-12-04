import { IconButton, Chip } from "@mui/material";
import React, { useState } from "react";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export const CartItem = () => {
    const [quantity, setQuantity] = useState(5);

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div className="px-5">
            <div className="lg:flex items-center lg:space-x-5">
                <div>
                    <img className="w-[5rem] h-[5rem] object-cover" src="https://cdn.pixabay.com/photo/2019/10/21/11/26/biryani-4565834_960_720.jpg" alt="" />
                </div>

                <div className="flex items-center justify-between lg:w-[70%]">
                    <div className="space-y-1 lg:space-y-3 w-full">
                        <p>Biryani</p>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-1">
                                <IconButton onClick={handleDecrease}>
                                    <RemoveCircleOutlineIcon />
                                </IconButton>
                                <div className="w-5 h-5 text-xs flex items-center justify-center">
                                    {quantity}
                                </div>
                                <IconButton onClick={handleIncrease}>
                                    <AddCircleOutlineIcon />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                    <p>$10</p>
                </div>
            </div>
            <div className="pt-3 space-x-2">
                {[1, 1, 1].map((item) => <Chip label={"bread"} />)}
            </div>
        </div>
    );
};

export default CartItem;