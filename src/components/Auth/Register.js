import { Button } from "react-bootstrap";
import "./Auth.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import { postRegister } from "../../services/apiService";
import { validateEmail } from "../../utils/validate";
import { useNavigate } from "react-router-dom";
const Register = () => {
    const [isHidePassword, setHidePassword] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [username, setUsername] = useState("")
    const navigate = useNavigate();
    const hanleShowHideBtn = () => {
        setHidePassword(!isHidePassword)

    }
    const handleSubmitRegisterForm = async () => {
        // alert("Clicke me")
        if (!validateEmail(email)) {
            toast.error("Invalid email!");
            return;
        }
        if (!password) {
            toast.error("Invalid password!")
            return;
        }
        if (!username) {
            toast.error("Invalid usernamne!");
            // alert("Invalid email!")
            return;
        }
        const data = await postRegister(email, username, password);
        if (data && data.EC === 0) {
            toast.success(data.EM)
            navigate("/login");
            // navigate("/")
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
        console.log(data);
    }
    return (
        <div className="register-container">
            <div className="header">
                <span>Already have an account?</span>
                <Button className="btn  btn-light">Log in</Button>
            </div>
            <div className="title col-4 mx-auto">Hỏi Dân IT & Eric</div>
            <div className="wellcome col-4 mx-auto">Start your jouney?</div>
            <div className="content col-4 mx-auto">
                <div className="form-group">
                    <label>Email (*)</label>
                    <input
                        type="email"
                        required
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />

                </div>
                <div className="form-group">
                    <label>Password (*)</label>
                    <div className="input-group">
                        <input
                            type={isHidePassword ? 'password' : 'text'}
                            className="form-control"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                        <span className="input-group-text show-hide-icon" onClick={() => hanleShowHideBtn()}>
                            {isHidePassword ? <FaEye /> : <FaEyeSlash />}
                        </span>
                    </div>
                </div>
                <div className="form-group">
                    <label>Username (*)</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        required
                        onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="navigate">
                    <button className="btn btn-dark" onClick={() => handleSubmitRegisterForm()}>Create my free account</button>
                    <span> &#60;&#60; Go to Homepage</span>
                </div>
            </div>


        </div>
    )
}
export default Register