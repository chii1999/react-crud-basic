import React, { useState } from 'react'
import { Table, Button, Modal } from "react-bootstrap"
import LoadingPage from '../../components/LoadingPage';
import UpdateUser from './UpdateUser';

export default function UserDataLists(props) {

    const { users, isLoading, handleDeletedUser, fetchUserDatas } = props;
    const [openEdit, setOpenEdit] = useState(false)
    const [prepareDataEdit, setPrepareDataEdit] = useState({})

    const onCloseModal = () => {
        setOpenEdit(false)
        // fetchUserDatas()
    }

    const handleEditProduct = (item) => {
        setPrepareDataEdit(item)
        setOpenEdit(true)
    }

    if (isLoading) return <LoadingPage />

    return (
        <React.Fragment>
            <Table hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>image</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((item, index) => (
                        <tr key={index} className='tbody-product-list'>
                            <td>{index}</td>
                            <td>
                                <img style={{ maxWidth: 50 }} alt={item?.fname} src={item?.avatar} />
                            </td>
                            <td>{item?.fname}</td>
                            <td>{item?.lname ?? 0}</td>
                            <td>{item?.username ?? 0}</td>
                            <td>
                                <div className='d-flex gap-2'>
                                    <Button onClick={() => handleEditProduct(item)} variant='outline-info'>Edit</Button>
                                    <Button onClick={() => handleDeletedUser(item)} variant='outline-danger'>Del</Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>


            <Modal show={openEdit} onHide={onCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                     <UpdateUser prepareDataEdit={prepareDataEdit} onCloseModal={onCloseModal} fetchUserDatas={fetchUserDatas} />
                </Modal.Body>
            </Modal>
        </React.Fragment>
    )
}
