import ReactPaginate from "react-paginate";

const TableUserPaginate = (props) => {
    const fetchListUserWithPaginate = props.fetchListUserWithPaginate;
    const setCurrentPage = props.setCurrentPage
    const handlePageClick = (event) => {
        fetchListUserWithPaginate(event.selected + 1);
        setCurrentPage(event.selected + 1)
    };
    const pageCount = props.pageCount;
    const listUser = props.listUser
    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.length > 0 &&
                        listUser.map((item, index) => {
                            return (<tr key={`table-user-${index}`}>
                                <th scope="row">{item.id}</th>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                                <td>
                                    <button className="btn btn-secondary"
                                        onClick={() => { props.setShowModalViewUser(item) }}>View</button>
                                    <button className="btn btn-warning mx-3"
                                        onClick={() => { props.setShowModalUpdateUser(item) }}>Update</button>
                                    <button className="btn btn-danger"
                                        onClick={() => props.handleClickBtnDelete(item)}>Delete</button>

                                </td>
                            </tr>)
                        })}
                    {(!listUser || listUser.length === 0) &&
                        <tr>
                            <td colSpan={'4'}>Not found data</td>
                        </tr>}

                </tbody>
            </table>
            <div className='user-pagination'>
                <ReactPaginate
                    breakLabel="..."
                    pageClassName='page-item'
                    pageLinkClassName='page-link'
                    nextLabel="Next >"
                    nextClassName='page-item'
                    nextLinkClassName='page-link'
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< Prev   "
                    previousLinkClassName='page-link'
                    previousClassName='page-item'
                    containerClassName='pagination'
                    renderOnZeroPageCount={null}
                    activeClassName='active'
                    forcePage={props.currentPage - 1}

                />
            </div>
        </>
    )
}
export default TableUserPaginate