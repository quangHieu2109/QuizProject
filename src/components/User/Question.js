import _ from 'lodash'

const Question = (props) => {
    const { index, data } = props;
    const handleCheckbox = props.handleCheckbox;
    const handleSelectAnswer = (e, answerId, questionId) => {
        handleCheckbox(answerId, questionId);
    }
    if (_.isEmpty(data)) return (<></>)
    return (

        < >
            <div className='q-image'>
                <img src={`data:image/jpge;base64,${data.questionImg}`} className="card-img-top" alt="..." />

            </div>

            <div className="question">Question {index + 1}: {data.questionDsc}?</div>
            <div className="answer">
                {data.answers && data.answers.length > 0 &&
                    data.answers.map((a, index) => {
                        return (
                            <div key={`answer-${index}`} class="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={a.isSelected}
                                    onChange={(e) => handleSelectAnswer(e, a.id, data.questionId)}
                                    id={`answer-${index}`} />
                                <label className="form-check-label" for={`answer-${index}`}>
                                    {a.description}
                                </label>
                            </div>

                        )
                    })
                }

            </div>
        </>
    )
}
export default Question;