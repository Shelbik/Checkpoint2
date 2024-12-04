import React from "react";
import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export const EventCard = () => {
    return (
        <div>
            <Card sx={{ width: 345 }}>
                <CardMedia
                    sx={{ height: 345 }}
                    image="https://cdn.pixabay.com/photo/2018/09/24/21/36/hamburger-3700888_1280.jpg"
                />
                <CardContent>
                    <Typography variant="h5">
                        Slovakian Fast Food
                    </Typography>
                    <Typography variant="body2">
                        30% off on your first order
                    </Typography>
                    <div className="py-2 space-y-2">
                        <p>{"Skalka nad Vahom"}</p>
                        <p className="text-sm text-blue-500">November 4,2024 12:00 AM</p>
                        <p className="text-sm text-red-500">November 5,2024 12:00 AM</p>

                    </div>
                </CardContent>

              {false &&  <CardActions>
                    <IconButton>
                        <DeleteIcon/>
                    </IconButton>
                </CardActions>}
            </Card>
        </div>
    );
}
