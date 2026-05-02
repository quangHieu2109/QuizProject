import { useSelector } from "react-redux";
import videoHomePage from "../../assets/video-homepage.mp4"
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const HomePage = (props) => {
    // const account = useSelector(state => state.user.account);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const { t } = useTranslation();
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
                <div className="title-1">{t('homepage.title1')}</div>
                <div className="title-2">{t('homepage.title2')}</div>
                {isAuthenticated === false ?
                    <div className="title-3 btn" onClick={() => navigate("/login")}>{t('homepage.title3.un_login')}</div>
                    :
                    <div className="title-3 btn" onClick={() => navigate("/users")}>{t('homepage.title3.logged_in')}</div>}
            </div>
        </div>
    );
}
export default HomePage;