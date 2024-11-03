import React, { useEffect, useState } from 'react'
import axios from "axios"
import { END_POINT_SERVER } from '../../config/api'
import { Button, Modal } from "react-bootstrap"
import AddProduct from './CreateUser'
import UserDataLists from './UserDataLists'
import CreateUser from './CreateUser'
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import { useTranslation } from 'react-i18next'


export default function UserPage() {
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate();
    const { t } = useTranslation()

    // useEffect
    useEffect(() => {
        fetchUserDatas()
    }, [])

    // fetch product datas
    const fetchUserDatas = async () => {
        try {
            setIsLoading(true)
            await axios.get(END_POINT_SERVER + "users")
                .then(response => {
                    setUsers(response?.data)
                    setIsLoading(false)

                }).catch(error => {
                    setIsLoading(false)
                })

        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    }

    // delete user data
    const handleDeletedUser = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deletedUser(item?.id)
            }
        });
    }

    const deletedUser = async (userId) => {
        try {
            // Using axios.delete with data
            const response = await axios.delete(END_POINT_SERVER + "users/delete", {
                data: { id: userId }
            });

            if (response?.status === 200) {
                fetchUserDatas();
            }

        } catch (error) {
            console.log("Error deleting user:", error);
        }
    };


    // modal add product
    const onOpenFormAdd = () => {
        setIsOpen(true)
    }
    // close modal add product
    const onCloseModal = () => {
        setIsOpen(false)
    }

    return (
        <div>
            <h4>{t("user_title")}</h4>
            <div className='d-flex justify-content-between'>
                <div />
                <div>
                    <Button onClick={() => fetchUserDatas()}>Refresh</Button> &nbsp;
                    <Button onClick={() => navigate("/create_user")} variant='primary'>Create User</Button>
                </div>
            </div>
            <br />
            <UserDataLists users={users} isLoading={isLoading} handleDeletedUser={handleDeletedUser} fetchUserDatas={fetchUserDatas} />


            <Modal show={isOpen} onHide={onCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateUser onCloseModal={onCloseModal} fetchUserDatas={fetchUserDatas} />
                </Modal.Body>
            </Modal>
        </div>
    )
}
