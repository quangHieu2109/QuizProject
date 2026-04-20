import Select from 'react-select';
import { useState, useEffect } from 'react';
import { getAllQuizForAdmin, getAllUser, postAssignQuizToUser } from '../../../../services/apiService';
import { toast } from "react-toastify";
const AssignQuiz = (props) => {
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [listQuizzes, setListQuizzes] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    const [listUsers, setListUser] = useState([]);
    useEffect(() => {
        fetchListQuiz();
        fetchListUser();
    }, [])
    const fetchListQuiz = async () => {
        const res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuizzes = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.name}`
                }
            })
            setListQuizzes(newQuizzes);
        } else {
            toast.error(res.EM);
        }
    }
    const fetchListUser = async () => {
        const res = await getAllUser();
        console.log(res)
        if (res && res.EC === 0) {
            let newUsers = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username} - ${item.email}`
                }
            })
            setListUser(newUsers);
        } else {
            toast.error(res.EM);
        }
    }
    const handleAssignQuiz = async () => {
        let res = await postAssignQuizToUser(+selectedQuiz.value, +selectedUser.value);
        if (res && res.EC === 0) {
            toast.success(res.EM)
        } else {
            toast.error(res.EM);
        }
    }
    return (

        <div className="assign-quiz-container row">
            <div className="col-6 form-group">
                <label className='form-label'>Select quiz</label>
                <Select

                    defaultValue={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuizzes}
                    menuPortalTarget={document.body}
                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                // className='form-control'
                />
            </div>
            <div className="col-6 form-group">
                <label className='form-label'>Select user</label>
                <Select

                    defaultValue={selectedUser}
                    onChange={setSelectedUser}
                    options={listUsers}
                    menuPortalTarget={document.body}
                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                // className='form-control'
                />
            </div>
            <div>
                <button
                    className="btn btn-warning mt-3"
                    onClick={() => handleAssignQuiz()}
                >Assign</button>
            </div>
        </div>
    )
}
export default AssignQuiz;