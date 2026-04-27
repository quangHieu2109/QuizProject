import CountDown from "./CountDown";

const RightContent = (props) => {
    const dataQuiz = props.dataQuiz;

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
                        return (<div key={`quiz-${index}`} className="question">{index + 1}</div>)
                    })}

            </div>
        </>
    );
}
export default RightContent;