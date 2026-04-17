import { useEffect, useState } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiService";
import { toast } from "react-toastify";
import DeleteQuizModal from "./DeleteQuizModal";
import UpdateQuizModal from "./UpdateQuizModal";

const TableQuiz = (props) => {
    const [listQuizzes, setListQuizzes] = useState([]);
    const [showDeleteModel, setShowDeleteModel] = useState(false);
    const [deleteData, setDeleteData] = useState({});
    const [showUpdateModel, setShowUpdateModel] = useState(false);
    const [updateData, setUpdateData] = useState({});
    const handleDeteteBtn = (deleteData) => {
        setShowDeleteModel(true);
        setDeleteData(deleteData);
    }
    const handleUpdateBtn = (updateData) => {

        setShowUpdateModel(true);
        setUpdateData(updateData);
        console.log(">>> check update data, ", updateData)
    }
    useEffect(() => {
        fetchListQuiz();
    }, [])
    const fetchListQuiz = async () => {
        const res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            setListQuizzes(res.DT);
        } else {
            toast.error(res.EM);
        }
    }
    return (

        <>
            <h4 className="form-label">List Quizzes:</h4>
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Action</th>

                    </tr>
                </thead>
                <tbody>
                    {listQuizzes && listQuizzes.map((item, index) => {
                        return (
                            <tr key={`quiz-${item.id}`}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.difficulty}</td>
                                <td style={{ display: "flex", justifyContent: "space-around" }}>
                                    <button
                                        className="btn btn-warning mr-3"
                                        onClick={() => { handleUpdateBtn(item) }}>Edit</button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDeteteBtn(item)}>Delete</button>

                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <DeleteQuizModal
                show={showDeleteModel}
                setShow={setShowDeleteModel}
                deleteData={deleteData}
                resetDeleteData={() => setDeleteData({})}
                fetchListQuizzes={fetchListQuiz}
            />
            <UpdateQuizModal
                show={showUpdateModel}
                setShow={setShowUpdateModel}
                updateData={updateData}
                resetUpdateData={() => setUpdateData({})}
                fetchListQuizzes={fetchListQuiz}
            />
        </>
    )
}
export default TableQuiz;