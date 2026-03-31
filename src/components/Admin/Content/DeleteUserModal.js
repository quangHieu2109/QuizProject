import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../../services/apiService'
import { toast } from "react-toastify";
import { useEffect, useState } from 'react';

const DeleteUserModal = (props) => {
    const { show, setShow, dataDelete, resetDeleteData, fetchListUser, currentPage, setCurrentPage } = props
    const [isUpdateListUser, setUpdateListUser] = useState(false)
    console.log(dataDelete)
    const handleClose = () => {
        resetDeleteData();
        setShow(false);
        setUpdateListUser(false)
    }
    useEffect(() => {
        const updateUsers = async () => {
            await fetchListUser();
        }
        if (isUpdateListUser) updateUsers();
    }, [isUpdateListUser]);

    const handleSubmitDeleteUser = async () => {
        let resDT = await deleteUser(dataDelete.id);

        if (resDT && resDT.EC === 0) {
            toast.success(resDT.EM)
            handleClose()
            setCurrentPage(1)
            await fetchListUser(1)
            setUpdateListUser(true)
            console.log(">>> check updateListUser", isUpdateListUser, resDT.EC)
        }
        if (resDT && resDT.EC !== 0) {
            toast.error(resDT.EM)
            // handleClose()
        }
    }
    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal show={show} onHide={handleClose} backdrop='static'>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete User?</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Are you sure to delete this user. email = {dataDelete.email}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleSubmitDeleteUser}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default DeleteUserModal;