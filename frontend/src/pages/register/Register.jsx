import React, { useEffect } from 'react'
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../features/authSlice';
import * as Yup from 'yup';
import { Box, Button, FormHelperText, TextField, Typography } from '@mui/material';

import './register.css'
import { useState } from 'react';
const Register = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        
    });



    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch();


    useEffect(() => {


    }, [auth]);
    return (

        <Formik
            initialValues={{ name: '',email: '', password: '' }}
            validationSchema={Yup.object().shape({
                name: Yup.string().max(255).required('Name is required'),
                email: Yup.string().max(255).required('Email is required'),
                password: Yup.string().max(255).required('Password is required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                dispatch(registerUser(values))
                // setTimeout(() => {
                //     alert(JSON.stringify(values, null, 2));
                //     setSubmitting(false);
                // }, 400);
            }}

        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
            }) => (
                <form onSubmit={handleSubmit}>
                    {/* <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                    />

                  {errors.name && touched.name && errors.name} */}


                    {/* <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                    />
                    {errors.email && touched.email && errors.email}
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                    /> */}


                    <Typography variant="h4" component="h2">
                        Sign Up
                    </Typography>
                    <TextField
                        error={Boolean(touched.name && errors.name)}
                        fullWidth
                        autoFocus
                        helperText={touched.name && errors.name}
                        label="Name"
                        margin="normal"
                        name="name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="name"
                        value={values.name}
                        variant="outlined"
                    />

                    <TextField
                        error={Boolean(touched.email && errors.email)}
                        fullWidth
                        helperText={touched.email && errors.email}
                        label="Email"
                        margin="normal"
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="email"
                        value={values.email}
                        variant="outlined"
                    />
                    <TextField
                        error={Boolean(touched.password && errors.password)}
                        fullWidth
                        helperText={touched.password && errors.password}
                        label="Password"
                        margin="normal"
                        name="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="password"
                        value={values.password}
                        variant="outlined"
                    />

                    {errors.submit && (
                        <Box mt={3}>
                            <FormHelperText error>{errors.submit}</FormHelperText>
                        </Box>
                    )}
                    <Box mt={2}>
                        <Button
                            color="primary"
                            disabled={auth.registerStatus === "pending"}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                        >
                            {auth.registerStatus === "pending" ? "Submitting..." : "Sign Up"}
                        </Button>
                    </Box>


                    {auth.registerStatus === "rejected" ? (<Box mt={2} sx={{ color: 'warning.main' }}>{auth.registerError}</Box>) : null}
                </form>
            )}
        </Formik>

    )
}

export default Register