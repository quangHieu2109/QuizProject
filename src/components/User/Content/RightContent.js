import CountDown from "./CountDown";

const RightContent = (props) => {
    const dataQuiz = props.dataQuiz;
    const index = props.index;
    const getClassQuestion = (index, question) => {
        let isAnswered = false;
        let isSelected = index === props.index;
        if (question && question.answers.length > 0) {
            isAnswered = question.answers.find(a => a.isSelected);
        }
        return `question ${isAnswered ? 'answered' : ''} ${isSelected ? "selected" : ""}`
    }
    const onTimeUP = () => {
        props.handleFinish();
    }
    return (

        <>
            <div className="main-timer">
                <CountDown onTimeUP={onTimeUP} />
            </div>
            Right content
            <div className="main-question">
                {dataQuiz && dataQuiz.length > 0
                    && dataQuiz.map((quiz, index) => {
                        return (
                            <div
                                key={`quiz-${index}`}
                                className={getClassQuestion(index, quiz)}
                                onClick={() => props.setIndex(index)}
                            >{index + 1}
                            </div>
                        )
                    })}

            </div>
        </>
    );
}
export default RightContent;