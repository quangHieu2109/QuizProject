import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../services/apiService';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/reducer/action/userAction';

const Header = () => {
    const account = useSelector(state => state.user.account);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogin = () => {
        navigate("/login");
    }
    const handleRegister = () => {
        navigate("/register");
    }
    const handleLogout = async () => {
        const res = await logout(account.email, account.refresh_token);
        console.log(res)
        if (res && res.EC === 0) {
            dispatch(doLogout())
            navigate("/login");
        } else {
            toast.error(res.EM);
        }
    }
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                {/* <Navbar.Brand href="#home">Hỏi Dân IT</Navbar.Brand> */}
                <NavLink to="/" className='navbar-brand'>Hỏi Dân IT</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className='nav-link'>Home</NavLink>
                        <NavLink to="/users" className='nav-link'>User</NavLink>
                        <NavLink to="/admins" className='nav-link'>Admin</NavLink>

                    </Nav>
                    <Nav>
                        {
                            isAuthenticated === true ?
                                <NavDropdown title="Settings" id="basic-nav-dropdown">


                                    <NavDropdown.Item >Profile</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item
                                        onClick={() => handleLogout()}
                                    >Logout</NavDropdown.Item>
                                </NavDropdown>
                                :
                                <>
                                    <button className='btn-login' onClick={() => handleLogin()}>Log in</button>
                                    <button className='btn-signup' onClick={() => handleRegister()}>Signup </button>
                                </>

                        }


                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;