import SideBar from "./SideBar"
import './Admin.scss'
import { FaBars } from "react-icons/fa"
import { useState } from "react"
import { Link, Outlet } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { NavDropdown } from "react-bootstrap";
import Language from "../Header/Language";
const Admin = (props) => {
    const [collapsed, setCollaped] = useState(false)
    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <span
                        className="leftside"
                        onClick={() => {
                            setCollaped(!collapsed)
                        }} >
                        <FaBars />
                    </span>
                    <div className="rightside">
                        <Language />
                        <NavDropdown title="Settings" id="basic-nav-dropdown">
                            <NavDropdown.Item >Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item
                            >Logout</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </div>

                <PerfectScrollbar>
                    <div className="admin-main container">
                        <Outlet />
                    </div>
                </PerfectScrollbar>
            </div>

        </div>
    )
}
export default Admin