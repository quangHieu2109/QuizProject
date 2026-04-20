import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import './ManageQuiz.scss'
import Select from 'react-select';
import { useState } from 'react';
import { postCreateNewQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import { Accordion } from 'react-bootstrap';
import QuizQA from './QuizQA';
import AssignQuiz from './AssignQuiz';
const ManageQuiz = (props) => {
    const options = [
        { value: "EASY", label: "EASY" },
        { value: "MEDIUM", label: "MEDIUM" },
        { value: "HARD", label: "HARD" },
    ]
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState({ value: "EASY", label: "EASY" });
    const [image, setImage] = useState(null)

    const resetSubmitData = () => {
        setName("");
        setDescription("");
        setType({ value: "EASY", label: "EASY" });
        setImage(null);
    }
    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0])
            setImage(URL.createObjectURL(event.target.files[0]))
        setImage(event.target.files[0])
    }

    const handleSubmit = async () => {
        if (!name) {
            toast.error("Name is required");
            return;
        }
        if (!description) {
            toast.error("Description is required");
            return;
        }
        if (!image) {
            toast.error("Image is required");
            return;
        }
        const res = await postCreateNewQuiz(description, name, type.value, image);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            resetSubmitData();
        } else {
            toast.error(res.EM);
        }
    }
    return (
        <div className="quiz-container">
            <div className="title">
                Manage quizzes
            </div>
            <hr />


            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Add new quiz</Accordion.Header>
                    <Accordion.Body>
                        <div className="add-new">

                            {/* <fieldset className='border rounded-3 p-3'> */}
                            {/* <legend className='float-none w-auto px-3'>Add new quiz</legend> */}
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Name"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your quiz name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingPassword" label="Description">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your quiz description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)} />
                            </FloatingLabel>
                            <div className="more-actions my-3 form-group">
                                {/* <label className=''>Upload</label> */}
                                <fieldset className='border rounded-3 p-3'>
                                    <legend className='float-none w-auto'>Upload image</legend>
                                    <input
                                        type="file"
                                        className='form-control'
                                        accept="image/*"
                                        hidden
                                        id='upaloadFile'
                                        onChange={(e) => handleChangeFile(e)} />
                                    <label for="upaloadFile" className='btn btn-primary'>Choose file</label>
                                    <span className='form-label mx-2'>File selected: {image?.name}</span>
                                </fieldset>
                                <br />


                            </div>
                            <div className='my-3'>
                                <Select
                                    value={type}
                                    defauleValue={type}
                                    onChange={setType}
                                    options={options}
                                    placeholder="Quiz type..." />
                            </div>
                            <div className='mt-3'>
                                <button
                                    className="btn btn-warning"
                                    onClick={() => handleSubmit()}>Save</button>
                            </div>
                            {/* </fieldset> */}
                        </div>
                        <div className="list-detail  mt-3">
                            <TableQuiz
                            />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Update Q/A Quiz</Accordion.Header>
                    <Accordion.Body>
                        <QuizQA />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Assign to User</Accordion.Header>
                    <Accordion.Body>
                        <AssignQuiz />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>


        </div>
    )
}
export default ManageQuiz;