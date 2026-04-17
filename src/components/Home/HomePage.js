import { useSelector } from "react-redux";
import videoHomePage from "../../assets/video-homepage.mp4"
import { useNavigate } from "react-router-dom";
const HomePage = (props) => {
    const account = useSelector(state => state.user.account);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const navigate = useNavigate();
    return (
        <div className="homepage-container">

            <video autoPlay muted loop  >
                {/* thêm controls vào thì video sẽ hiển thị thanh play */}
                {/* Video chỉ có thể tự động chạy khi bị tắt tiếng
                nếu không sẽ bị chặn */}
                <source src={videoHomePage} type="video/mp4" />
            </video>
            <div className="homepage-content">
                <div className="title-1">There's the best way to ask</div>
                <div className="title-2">You don't want to make a boring form. And your audiance won't answer one. Create a type form insted - and make everyone happy.</div>
                {isAuthenticated === false ?
                    <div className="title-3 btn" onClick={() => navigate("/login")}>Get's started. It's free</div>
                    :
                    <div className="title-3 btn" onClick={() => navigate("/users")}>Doing quizs now</div>}
            </div>
        </div>
    );
}
export default HomePage;