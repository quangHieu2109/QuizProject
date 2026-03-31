import videoHomePage from "../../assets/video-homepage.mp4"
const HomePage = (props) => {
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
                <div className="title-3">Get's started. It's free</div>
            </div>
        </div>
    );
}
export default HomePage;