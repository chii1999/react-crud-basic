import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios"
import { END_POINT_SERVER } from '../../config/api';
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom";

// Define validation schema using Yup
const validationSchema = Yup.object({
    fname: Yup.string().required('Product Name is required'),
    lname: Yup.string().required('lname is required'),
    username: Yup.string().required('username is required'),
    password: Yup.string().required('password is required'),
    email: Yup.string().required('email is required')
});

export default function CreateUser({ onCloseModal, fetchUserDatas }) {
    const [isLoadingCreate, setIsLoadingCreate] = useState(false)
    const navigate =  useNavigate()

    // create new product
    const handleCreateUser = async (values) => {
        try {
            setIsLoadingCreate(true)
            await axios.post(END_POINT_SERVER + "users/create", values)
                .then(response => {
                    if (response?.status === 200) {
                        setIsLoadingCreate(false)
                        onCloseModal()
                        fetchUserDatas()
                    }
                })

        } catch (error) {
            console.log(error)
            setIsLoadingCreate(false)
        }
    }

    return (
        <Formik
            initialValues={{
                fname: '',
                lname: '',
                avatar: '',
                password: '',
                email: '',
                username: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                handleCreateUser(values)
            }}
        >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="fname">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="fname"
                            value={values.fname}
                            onChange={handleChange}
                            isInvalid={touched.fname && !!errors.fname}
                            placeholder="Enter product name"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.fname}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="lname">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="lname"
                            value={values.lname}
                            onChange={handleChange}
                            isInvalid={touched.lname && !!errors.lname}
                            placeholder="Enter lname"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.lname}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="avatar">
                        <Form.Label>Avatar</Form.Label>
                        <Form.Control
                            type="text"
                            name="avatar"
                            value={values.avatar}
                            onChange={handleChange}
                            isInvalid={touched.avatar && !!errors.avatar}
                            placeholder="Enter avatar URL"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.avatar}
                        </Form.Control.Feedback>
                    </Form.Group> 

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            isInvalid={touched.email && !!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            isInvalid={touched.username && !!errors.username}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.username}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="text"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            isInvalid={touched.password && !!errors.password}
                            placeholder="Enter password"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <br />
                    <div className='d-flex w-100 gap-2'>
                        <Button variant='outline-secondary' type="button" onClick={() => navigate("/user")} >
                            Close
                        </Button>
                        <Button disabled={isLoadingCreate ? true : false} variant='primary' type="submit">
                            {isLoadingCreate ? <><Spinner size='sm' /> Creating...</> : "Create"}
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}
