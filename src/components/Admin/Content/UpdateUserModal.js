import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure this is imported
import './ManageUser.scss'
import { FcPlus } from 'react-icons/fc'
import { toast } from "react-toastify";
import { postCreateNewUser, putUpdateUser } from '../../../services/apiService.js'
import _ from 'lodash'
const UpdateUserModal = (props) => {
    const { show, setShow, dataUpdate, resetUpdateData, fetchListUser, currentPage, setCurrentPage } = props
    const [isUpdateListUser, setUpdateListUser] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [image, setImage] = useState("")
    const [role, setRole] = useState("USER")

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email)
            setUsername(dataUpdate.username)
            setRole(dataUpdate.role)
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpge;base64,${dataUpdate.image}`)
            }
        }
    }, [dataUpdate])
    useEffect(() => {
        const updateUsers = async () => {
            await fetchListUser();
        }
        if (isUpdateListUser) updateUsers();
    }, [isUpdateListUser]);
    const handleClose = () => {
        setShow(false)
        setEmail('')
        setPassword('')
        setUsername('')
        setRole('USER')
        setImage('')
        setPreviewImage('')
        resetUpdateData()
    };
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0])
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
        setImage(event.target.files[0])
        // else setPreviewImage(null)
    }
    const handleSubmitUpdateUser = async () => {
        setUpdateListUser(false)
        if (!validateEmail(email)) {
            toast.error("Invalid email!")
            // alert("Invalid email!")
            return;
        }

        let resDT = await putUpdateUser(dataUpdate.id, username, role, image);

        if (resDT && resDT.EC === 0) {
            toast.success(resDT.EM)
            handleClose()
            setCurrentPage(currentPage)
            await fetchListUser(currentPage);
        }
        if (resDT && resDT.EC !== 0) {
            toast.error(resDT.EM)
        }
    }
    const [previewImage, setPreviewImage] = useState("")
    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal show={show} onHide={handleClose} size='xl' backdrop='static' className='modal-add-user'>
                <Modal.Header closeButton>
                    <Modal.Title>Update user modal</Modal.Title>
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
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value)
                                }} />
                        </div>
                        <div className="col-md-6">
                            <label for="inputPassword4" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="inputPassword4"
                                disabled
                                value={password}
                                onChange={(event) => { setPassword(event.target.value) }} />
                        </div>

                        <div className="col-md-6">
                            <label for="inputCity" className="form-label">Username</label>
                            <input type="text" className="form-control" id="inputUsername" value={username}
                                onChange={(event) => {
                                    setUsername(event.target.value)
                                }} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select id="inputState" className="form-select" onChange={(event) => {
                                setRole(event.target.value)
                            }}>
                                <option selected={role === "USER"} value={"USER"}>USER</option>
                                <option selected={role === "ADMIN"} value={"ADMIN"}>ADMIN</option>
                            </select>
                        </div>
                        <div className='col-ms-12'>
                            <label for='upload-image' className='form-lable label-upload'>
                                <FcPlus />
                                Upload File Image</label>
                            <input type='file' hidden id='upload-image' accept="image/*" onChange={handleUploadImage} />
                        </div>
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
                    <Button variant="primary" onClick={handleSubmitUpdateUser}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default UpdateUserModal;