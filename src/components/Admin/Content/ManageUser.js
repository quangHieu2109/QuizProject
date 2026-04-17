import AddUserModal from "./AddUserModal";
import { FcPlus } from 'react-icons/fc'
import TableUser from "./TableUser";

import { useEffect, useState } from "react"
import { getAllUser, getUserWithPaginate } from "../../../services/apiService"
import UpdateUserModal from "./UpdateUserModal";
import ViewUserModal from "./ViewUserModal";
import DeleteUserModal from "./DeleteUserModal";
import TableUserPaginate from "./TableUserPaginate";

const ManageUser = (props) => {
    const LIMIT_USER = 2;
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalViewUser, setShowModalViewUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);

    const [dataUpdate, setDataUpdate] = useState({})
    const [dataView, setDataView] = useState({})
    const [dataDelete, setDataDelete] = useState({})
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [listUser, setListUser] = useState([
    ])
    const fetchListUser = async () => {
        let res = await getAllUser();
        if (res && res.EC === 0) {
            setListUser(res.DT)
        }
    }
    const fetchListUserWithPaginate = async (page) => {
        let res = await getUserWithPaginate(page, LIMIT_USER);
        if (res && res.EC === 0) {
            setListUser(res.DT.users)
            setPageCount(res.DT.totalPages)
        }
    }
    const resetUpdateData = () => {
        setDataUpdate({})
    }
    const resetViewData = () => {
        setDataView({})
    }
    const resetDeleteData = () => {
        setDataDelete({})
    }
    const handleClickBtnVew = (user) => {
        setShowModalViewUser(true);
        setDataView(user);
    }
    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);
        setDataUpdate(user);
    }
    const handleClickBtnDelete = (user) => {
        setShowModalDeleteUser(true);
        setDataDelete(user);
    }
    useEffect(() => {
        fetchListUserWithPaginate(1)
    }, [])
    return (
        <div className="manage-user-container">
            <div className="title">Manage user content</div>
            <div className="users-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary" onClick={() => {
                        setShowModalCreateUser(!showModalCreateUser)
                    }}>
                        <FcPlus /> Add new user</button>
                </div>
                <div className="table-users-container">

                    <TableUserPaginate
                        listUser={listUser}
                        fetchListUserWithPaginate={fetchListUserWithPaginate}
                        setShowModalUpdateUser={handleClickBtnUpdate}
                        setShowModalViewUser={handleClickBtnVew}
                        handleClickBtnDelete={handleClickBtnDelete}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage} />
                </div>
                <AddUserModal
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUser={fetchListUserWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage} />
                <ViewUserModal
                    show={showModalViewUser}
                    setShow={setShowModalViewUser}
                    dataView={dataView}
                    resetViewData={resetViewData} />
                <UpdateUserModal
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    resetUpdateData={resetUpdateData}
                    fetchListUser={fetchListUserWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage} />
                <DeleteUserModal
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete={dataDelete}
                    resetDeleteData={resetDeleteData}
                    fetchListUser={fetchListUserWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage} />
            </div>
        </div>
    );
};

export default ManageUser;