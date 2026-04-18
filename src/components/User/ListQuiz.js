import { useEffect, useState } from "react";
import { getQuizsByUser } from "../../services/apiService";
import "./ListQuiz.scss";
import { useNavigate } from "react-router-dom";
const ListQuiz = (props) => {
    const [quizs, setQuizs] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getQuizsData();
    }, []);
    const getQuizsData = async () => {
        const res = await getQuizsByUser();
        if (+res.EC === 0) {
            setQuizs(res.DT)
        }
    }
    return (
        <div className="list-quiz-container container">
            {quizs && quizs.length > 0 &&
                quizs.map((quiz, index) => {
                    return (<div key={`${index}-quiz`} className="card" style={{ width: '18rem' }}>
                        <div className="card-img">
                            <img src={`data:image/jpge;base64,${quiz.image}`} className="card-img-top" alt="..." />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{index + 1}</h5>
                            <p className="card-text">{quiz.description}</p>
                            <button className="btn btn-primary" onClick={() => navigate(`/quiz/${quiz.id}`, { state: { quizTitle: quiz.description } })}>Start Now</button>
                        </div>
                    </div>)
                })}
            {quizs && quizs.length === 0 &&
                <div>You don't have any quiz now ...</div>}
        </div>
    )
}
export default ListQuiz;