import { Button, Card } from "@mui/material";
import React from "react";

export const OrderCard = () => {
    return (
        <Card className="flex justify-between items-center p-5">
            <div className="flex items-center space-x-5">

                <img className="h-16 w-16" src="https://cdn.pixabay.com/photo/2019/10/21/11/26/biryani-4565834_960_720.jpg" alt="" />

                <div>
                    <p>Biryani</p>
                    <p>$700</p>
                </div>
            </div>

            <div>
                <Button className="cursor-not-allowed">
                    completed
                </Button>
            </div>
        </Card>
    )
}