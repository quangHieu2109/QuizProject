import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure this is imported
import { FcPlus } from 'react-icons/fc'
import { toast } from "react-toastify";
import _ from 'lodash'
import Select from 'react-select';
import { putUpdateQuizForAdmin } from '../../../../services/apiService';
const UpdateQuizModal = (props) => {
    const options = [
        { value: "EASY", label: "EASY" },
        { value: "MEDIUM", label: "MEDIUM" },
        { value: "HARD", label: "HARD" },
    ]
    const { show, setShow, updateData, resetUpdateData, fetchListQuizzes } = props
    const [id, setId] = useState(0)
    const [description, setDescription] = useState("")
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [difficulty, setDifficulty] = useState({})
    const [previewImage, setPreviewImage] = useState("")

    useEffect(() => {
        if (!_.isEmpty(updateData)) {
            setId(updateData.id)
            setDescription(updateData.description)
            setName(updateData.name)
            if (updateData.image) {
                setPreviewImage(`data:image/jpge;base64,${updateData.image}`)
            }
            if (updateData.difficulty) {
                let curDifficulty = {};
                options.forEach(item => {
                    if (item.value === updateData.difficulty) {
                        curDifficulty = item;
                    }
                })
                console.log(">>> check curDifficulty", curDifficulty)
                setDifficulty(curDifficulty);
            }
        }
    }, [updateData])
    // useEffect(() => {
    //     const updateUsers = async () => {
    //         await fetchListUser();
    //     }
    //     if (isUpdateListUser) updateUsers();
    // }, [isUpdateListUser]);
    const handleClose = () => {
        setShow(false)
        // setEmail('')
        // setPassword('')
        // setUsername('')
        // setRole('USER')
        // setImage('')
        // setPreviewImage('')
        // resetUpdateData()
    };

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0])
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
        setImage(event.target.files[0])
        // else setPreviewImage(null)
    }
    const handleSubmitUpdateUser = async () => {

        let resDT = await putUpdateQuizForAdmin(id, description, name, difficulty.value, image);
        console.log(resDT)
        if (resDT && resDT.EC === 0) {
            toast.success(resDT.EM)
            handleClose()
            await fetchListQuizzes();
            // setCurrentPage(currentPage)
            // await fetchListUser(currentPage);
        }
        if (resDT && resDT.EC !== 0) {
            toast.error(resDT.EM)
        }
    }
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
                        <div className="col-md-2">
                            <label for="inputEmail4" className="form-label">ID</label>
                            <input
                                type="email"
                                className="form-control"
                                id="inputEmail4"
                                disabled
                                value={id}
                            />
                        </div>
                        <div className="col-md-10">
                            <label for="inputPassword4" className="form-label">Quiz name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputPassword4"
                                value={name}
                                onChange={(event) => { setName(event.target.value) }}
                            />
                        </div>

                        <div className="col-md-12">
                            <label for="inputCity" className="form-label">Description</label>
                            <input type="text" className="form-control" id="inputUsername"
                                value={description}
                                onChange={(event) => {
                                    setDescription(event.target.value)
                                }}
                            />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Type</label>
                            <Select
                                value={difficulty}
                                defauleValue={difficulty}
                                onChange={setDifficulty}
                                options={options}
                                placeholder="Quiz type..." />
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
                    <Button variant="primary"
                        onClick={handleSubmitUpdateUser}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default UpdateQuizModal;