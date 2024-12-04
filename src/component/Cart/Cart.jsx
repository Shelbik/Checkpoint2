import { Divider, Grid, Modal, TextField, Box, Card, Button } from "@mui/material";
import React from "react";
import { CartItem } from "./CartItem";
import { AddressCard } from "./AddressCard";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    outline: "none",
    boxShadow: 24,
    p: 4,
};

const initialValues = {
    streetAddress: "",
    city: "",
    zipcode: "",
    state: "",
};

const validationSchema = Yup.object().shape({
    streetAddress: Yup.string().required("Street Address is required"),
    state: Yup.string().required("State is required"),
    zipcode: Yup.string().required("Zip code is required"),
    city: Yup.string().required("City is required"),
});

const handleSubmit = (values) => {
    console.log("Form submitted with values:", values);
};

const Cart = () => {
    const [open, setOpen] = React.useState(false);

    const createOrderUsingSelectedAddress = () => {};
    const handleOpenAddressModal = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const items = [1, 1];  // Sample items for rendering

    return (
        <>
            <main className="lg:flex justify-between">
                <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
                    {items.map((item, index) => (
                        <CartItem key={index} />
                    ))}
                    <Divider />
                    <div className="billDetails px-5 text-sm">
                        <p className="font-extralight py-5">Bill Details</p>
                        <div className="space-y-3">
                            <div className="flex justify-between text-gray-400">
                                <p>Item Total</p>
                                <p>$599</p>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <p>Delivery Fee</p>
                                <p>$10</p>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <p>Restaurant Charges</p>
                                <p>$40</p>
                            </div>
                            <Divider />
                            <div className="flex justify-between text-gray-400">
                                <p>Total pay</p>
                                <p>$700</p>
                            </div>
                        </div>
                    </div>
                </section>

                <Divider orientation="vertical" flexItem />
                
                <section className="lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0">
                    <div>
                        <h1 className="text-center font-semibold text-2xl py-10">
                            Choose Delivery Address
                        </h1>
                        <div className="flex gap-5 flex-wrap justify-center">
                            {[1, 1, 1].map((item, index) => (
                                <AddressCard key={index} handleSelectAddress={createOrderUsingSelectedAddress} item={item} showButton={true} />
                            ))}
                            <Card className="flex gap-5 w-64 p-5">
                                <AddLocationAltIcon />
                                <div className="space-y-3 text-gray-500">
                                    <h1 className="font-semibold text-lg text-white">Add New Address</h1>
                                    <Button variant="outlined" fullWidth onClick={handleOpenAddressModal}>Add</Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>

            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                        {({ handleSubmit, touched, errors }) => (
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            name="streetAddress"
                                            label="Street Address"
                                            fullWidth
                                            variant="outlined"
                                            error={touched.streetAddress && Boolean(errors.streetAddress)}
                                            helperText={<ErrorMessage name="streetAddress" component="span" className="text-red-600" />}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            name="city"
                                            label="City"
                                            fullWidth
                                            variant="outlined"
                                            error={touched.city && Boolean(errors.city)}
                                            helperText={<ErrorMessage name="city" component="span" className="text-red-600" />}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            name="zipcode"
                                            label="Zip code"
                                            fullWidth
                                            variant="outlined"
                                            error={touched.zipcode && Boolean(errors.zipcode)}
                                            helperText={<ErrorMessage name="zipcode" component="span" className="text-red-600" />}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            name="state"
                                            label="State"
                                            fullWidth
                                            variant="outlined"
                                            error={touched.state && Boolean(errors.state)}
                                            helperText={<ErrorMessage name="state" component="span" className="text-red-600" />}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Button fullWidth variant="contained" type="submit" color="primary">Deliver to this Address</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                    </Formik>
                </Box>
            </Modal>
        </>
    );
};

export default Cart;
