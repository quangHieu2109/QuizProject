import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getQuizDetail, postSubmitQuiz } from "../../services/apiService";
import _ from 'lodash';
import "./DetailQuiz.scss"
import Question from "./Question";
import ResultModal from "./ResultModal";

const DetailQuiz = (props) => {
    const params = useParams();
    const quizId = params.id;
    const location = useLocation();
    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);
    const [isShowModalResult, setIsShowModalResult] = useState(false)
    const [resultData, setResutData] = useState({})

    useEffect(() => {
        fetchQuestion(quizId)
    }, [quizId])
    const fetchQuestion = async (quizId) => {
        const res = await getQuizDetail(quizId);
        if (res && res.EC === 0) {
            let rawDT = res.DT;
            const data = _.chain(rawDT)
                .groupBy("id")
                .map((value, key) => {
                    let answers = [];
                    let questionDsc = "";
                    let questionImg = "";
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDsc = item.description;
                            questionImg = item.image;
                        }
                        item.answers.isSelected = false;
                        answers.push(item.answers)
                    })

                    return {
                        questionId: key,
                        questionDsc,
                        questionImg,
                        answers: answers
                    };
                })
                .value();
            setDataQuiz(data);
        }

    }
    const handlePrev = () => {
        if (index > 0) {
            setIndex(index - 1)

        } else {
            alert("Đây là câu hỏi đầu tiên gòi babeee")
        }
    }

    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1) {
            setIndex(index + 1);
        } else {
            alert("Hết câu hỏi gòi babee")
        }
    }
    const handleCheckBox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId);
        if (index === -1) return;
        let question = dataQuizClone[index];

        if (question && question.answers) {
            let answers = question.answers.map(item => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            })
            question.answers = answers;
        }
        dataQuizClone[index] = question;
        setDataQuiz(dataQuizClone)

    }
    const handleFinish = async () => {
        console.log(">>> check data before submitL: ", dataQuiz)
        let payload = {
            quizId: quizId,
            answers: []
        };
        let answers = [];
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(question => {
                let questionId = question.questionId;
                let userAnswerId = [];
                question.answers.forEach(item => {
                    if (item.isSelected) {
                        userAnswerId.push(item.id);
                    }
                })
                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })
            })

        }
        payload.answers = answers
        const res = await postSubmitQuiz(payload);
        console.log("final payload: ", payload)
        console.log(">>> check res ", res)
        console.log(">>> check res DT: ", res.DT)
        if (res && res.EC === 0) {
            setResutData({
                countCorrect: res.DT.countCorrect,
                countTotal: res.DT.countTotal,
                quizData: res.DT.quizData
            })
            console.log(">>> check resultData: ", resultData)
            setIsShowModalResult(true)
        } else {
            alert("Error")
        }
    }
    return (<div className="detail-quiz-container">
        <div className="left-content">
            <div className="title">
                Quiz {quizId}: {location.state.quizTitle}
            </div>
            <hr />
            <div className="q-body"> <img src="" alt="" /></div>
            <div className="q-content">
                <Question
                    index={index}
                    handleCheckbox={handleCheckBox}
                    data={dataQuiz
                        && dataQuiz.length > 0
                        ? dataQuiz[index]
                        : []}
                />
            </div>
            <div className="footer">
                <button
                    className="btn btn-secondary"
                    disabled={index === 0}
                    onClick={() => handlePrev()}>Prev</button>
                <button
                    className="btn btn-primary ml-3"
                    disabled={index === dataQuiz.length - 1}
                    onClick={() => handleNext()}>Next</button>
                <button
                    className="btn btn-warning"
                    onClick={() => handleFinish()}>Finish</button>
            </div>
        </div>
        <div className="right-content">
            count down
        </div>
        <ResultModal
            show={isShowModalResult}
            setShow={setIsShowModalResult}
            resultData={resultData} />
    </div>)

}
export default DetailQuiz;