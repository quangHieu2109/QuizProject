import { useState } from "react";
import "./Auth.scss"
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiService";
import { toast } from "react-toastify";
const Login = () => {
    const [email, setEmail] = useState("");
    const [pasword, setPassword] = useState("");
    const handleLogin = async () => {
        //validate

        //all api
        let data = await postLogin(email, pasword);
        if (data && data.EC === 0) {
            toast.success(data.EM)
            navigate("/")
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }
    const navigate = useNavigate();
    return (
        <div className="login-container">
            <div className="header">
                <span>Don't have an account yet?</span>
                <button>Sign up</button>
            </div>
            <div className="title">
                HoiDanIT
            </div>
            <div className="welcome col-4 mx-auto">
                Hello, Who's this?
            </div>
            <div className="content-form col-4 mx-auto">
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }} />

                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={pasword}
                        onChange={(e) => { setPassword(e.target.value) }} />

                </div>
                <span className="forgot-password">Forgot password?</span>
                <div>
                    <button
                        className="btn-login"
                        onClick={() => handleLogin()}>Login to HoiDanIT</button>
                </div>
                <div className="text-center" >
                    <span className="back" onClick={() => navigate("/")}> &#60;&#60; Go to Hommepage</span>
                </div>
            </div>

        </div>
    )
}
export default Login;