import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import { useEffect, useState } from 'react';
import { deleteQuizForAdmin } from '../../../../services/apiService';

const DeleteQuizModal = (props) => {
    const { show, setShow, deleteData, resetDeleteData, fetchListQuizzes } = props
    // const [isUpdateListUser, setUpdateListUser] = useState(false)
    const handleClose = () => {
        resetDeleteData();
        setShow(false);
        // setUpdateListUser(false)
    }

    const handleSubmitDeleteQuiz = async () => {
        let resDT = await deleteQuizForAdmin(deleteData.id);
        console.log(">>>> check res delete ", resDT)
        if (resDT && resDT.EC === 0) {
            toast.success(resDT.EM)
            handleClose()
            await fetchListQuizzes();
            // setUpdateListUser(true)
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
                    <p>Are you sure to delete this quiz. id: {deleteData.id} with name: {deleteData.name} </p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={() => handleSubmitDeleteQuiz()}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default DeleteQuizModal;