import React, { useEffect, useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import axios from "axios"
import { END_POINT_SERVER } from '../../config/api';


export default function UpdateUser({ prepareDataEdit, onCloseModal, fetchUserDatas }) {
    const [isLoadingUpdate, setisLoadingUpdate] = useState(false)
    const [userId, setUserId] = useState()

    useEffect(() => {
        if (prepareDataEdit) {
            setUserId(prepareDataEdit?.id)
        }
    }, [prepareDataEdit])
    console.log({ userId })

    const handleUpdateUser = async (values) => {
        try {
            setisLoadingUpdate(true); // Set loading state to true
    
            // Use template literals to properly concatenate the userId and endpoint
            const response = await axios.put(`${END_POINT_SERVER}users/update`, {
                id: userId,
                fname: values?.fname,
                lname: values?.lname
            });
    
            // Check if the request was successful
            if (response?.status === 200) {
                setisLoadingUpdate(false); // Set loading state to false
                onCloseModal(); // Close modal after successful update
                fetchUserDatas()
            }
    
        } catch (error) {
            console.log("Error updating user:", error); // Log the error
            setisLoadingUpdate(false); // Set loading state to false on error
        }
    };
    

    return (
        <Formik
            initialValues={{
                fname: prepareDataEdit?.fname,
                lname: prepareDataEdit?.lname,
                avatar: prepareDataEdit?.avatar,
                username: prepareDataEdit?.username,
            }}
            onSubmit={(values) => {
                handleUpdateUser(values)
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
                            placeholder="Enter lastname"
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

                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            isInvalid={touched.username && !!errors.username}
                            placeholder="Enter username"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.username}
                        </Form.Control.Feedback>
                    </Form.Group>


                    <br />
                    <div className='d-flex w-100 gap-2'>
                        <Button onClick={onCloseModal} variant='outline-secondary' type="button">
                            Close
                        </Button>
                        <Button disabled={isLoadingUpdate ? true : false} variant='primary' type="submit">
                            {isLoadingUpdate ? <><Spinner size='sm' /> Updating...</> : "Update"}
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}
