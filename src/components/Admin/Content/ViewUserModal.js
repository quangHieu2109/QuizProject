import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure this is imported
import './ManageUser.scss'
import { FcPlus } from 'react-icons/fc'
import { toast } from "react-toastify";
import { postCreateNewUser, putUpdateUser } from '../../../services/apiService.js'
import _ from 'lodash'
const ViewUserModal = (props) => {
    const { show, setShow, dataView, resetViewData, fetchListUser } = props
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [image, setImage] = useState("")
    const [role, setRole] = useState("USER")
    useEffect(() => {
        if (!_.isEmpty(dataView)) {
            setEmail(dataView.email)
            // setPassword(datauo)
            setUsername(dataView.username)
            setRole(dataView.role)
            // setImage('')
            if (dataView.image) {
                setPreviewImage(`data:image/jpge;base64,${dataView.image}`)
            }
        }
    }, [dataView])

    const handleClose = () => {
        setShow(false)
        setEmail('')
        setPassword('')
        setUsername('')
        setRole('USER')
        setImage('')
        setPreviewImage('')
        resetViewData()
    };
    const [previewImage, setPreviewImage] = useState("")
    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal show={show} onHide={handleClose} size='xl' backdrop='static' className='modal-add-user'>
                <Modal.Header closeButton>
                    <Modal.Title>View user modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form className="row g-3">
                        <div className="col-md-6">
                            <label for="inputEmail4" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="inputEmail4"
                                disabled
                                value={email} />
                        </div>
                        <div className="col-md-6">
                            <label for="inputPassword4" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="inputPassword4"
                                disabled
                                value={password} />
                        </div>

                        <div className="col-md-6">
                            <label for="inputCity" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputUsername"
                                value={username}
                                disabled
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select id="inputState" className="form-select" disabled>
                                <option selected={role === "USER"} value={"USER"}>USER</option>
                                <option selected={role === "ADMIN"} value={"ADMIN"}>ADMIN</option>
                            </select>
                        </div>
                        {/* <div className='col-ms-12'>
                            <label for='upload-image' className='form-lable label-upload'>
                                <FcPlus />
                                Upload File Image</label>
                            <input type='file' hidden id='upload-image' accept="image/*" onChange={handleUploadImage} />
                        </div> */}
                        <div className='col-md-12 img-preview'>
                            {previewImage ?
                                <img src={previewImage} /> :
                                <span>Privew Image</span>}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
};
export default ViewUserModal;