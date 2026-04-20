import { useEffect, useState } from 'react';
import Select from 'react-select'
import './QuizQA.scss'
import { BsPatchPlus, BsPatchMinus } from "react-icons/bs";
import { AiOutlineMinusSquare, AiOutlinePlusCircle } from "react-icons/ai";
import { LuImagePlus } from "react-icons/lu";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import Lightbox from "react-awesome-lightbox";
import { getAllQuizForAdmin, postCreateNewAnsweForQuestion, postCreateNewQuestionForQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';

const QuizQA = (props) => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [selectedFile, setSelectedFile] = useState(null)
    const [questions, setQuestions] = useState(
        [
            {
                id: uuidv4(),
                description: "",
                imageFile: "",
                imageName: "",
                isInvalid: false,
                answers: [
                    {
                        id: uuidv4(),
                        description: "",
                        isInvalid: false,
                        isCorrect: false

                    },
                    {
                        id: uuidv4(),
                        description: "",
                        isInvalid: false,
                        isCorrect: false
                    }
                ]
            }
        ]
    )
    const [isPreviewImg, setIsPreviewImg] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [listQuizzes, setListQuizzes] = useState([]);
    useEffect(() => {
        fetchListQuiz();
    }, [])
    const fetchListQuiz = async () => {
        const res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuizzes = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`
                }
            })
            setListQuizzes(newQuizzes);
        } else {
            toast.error(res.EM);
        }
    }
    const handleAddRemoveQuestion = (type, id = "") => {
        if (type === 'ADD') {
            let emptyQuestion = {
                id: uuidv4(),
                description: "",
                imageFile: "",
                imageName: "",
                isInvalid: false,
                answers: [
                    {
                        id: uuidv4(),
                        description: "",
                        isInvalid: false,
                        isCorrect: false
                    }
                ]
            }
            setQuestions([...questions, emptyQuestion])
            return;
        }
        if (type === 'REMOVE') {
            let questionsClone = _.cloneDeep(questions);
            questionsClone = questionsClone.filter(item => item.id !== id);
            setQuestions(questionsClone);
            return;
        }
    }
    const handleAddRemoveAnswer = (type, qid, aid = "") => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === qid);
        if (type === 'ADD') {
            let emptyAnswer = {
                id: uuidv4(),
                description: "",
                isInvalid: false,
                isCorrect: false
            }
            questionsClone[index].answers.push(emptyAnswer);
            setQuestions(questionsClone);
            return;
        }
        if (type === 'REMOVE') {
            let newAnswers = questionsClone[index].answers.filter(item => item.id !== aid);
            questionsClone[index].answers = newAnswers;
            setQuestions(questionsClone);
            return;
        }
    }
    const handleOnChange = (type, qid, value) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === qid);
        if (index === -1) return;
        if (type === 'QUESTION') {
            questionsClone[index].description = value;
            questionsClone[index].isInvalid = false;
            setQuestions(questionsClone);
        }
    }
    const handleOnchangeQuestionImg = (qid, event) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === qid);
        if (index === -1) return;
        if (event.target && event.target.files && event.target.files[0]) {
            questionsClone[index].imageFile = event.target.files[0];
            questionsClone[index].imageName = event.target.files[0].name;
            setQuestions(questionsClone);
            console.log(">>> check img file: ", event.target.files[0])
        }
    }
    const handleAnswerQuestion = (type, qid, aid, value) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === qid);
        if (index === -1) return;
        questionsClone[index].answers = questionsClone[index].answers.map(
            answer => {
                if (answer.id === aid) {
                    if (type === 'CHECKBOX') {
                        answer.isCorrect = value;
                    }
                    if (type === 'INPUT') {
                        answer.description = value;
                        answer.isInvalid = false;
                    }
                }
                return answer;
            }
        )
        setQuestions(questionsClone);
    }
    const handleSubmitQuestionForQuiz = async () => {
        //validate selected quiz
        if (_.isEmpty(selectedQuiz)) {
            toast.error("Please choose a Quiz!")
            return;
        }
        //validate question and answer
        let isValid = true;
        let questionsClone = _.cloneDeep(questions)
        questionLoop:
        for (let i = 0; i < questionsClone.length; i++) {
            let curQues = questionsClone[i];
            if (!curQues.description || curQues.description.length === 0) {
                questionsClone[i].isInvalid = true;
                // toast.error(`Question ${i + 1} can not empty!`);
                isValid = false;
                // break;
            }
            for (let j = 0; j < curQues.answers.length; j++) {
                let curAns = curQues.answers[j];
                if (!curAns.description || curAns.description.length === 0) {
                    questionsClone[i].answers[j].isInvalid = true;
                    // toast.error(`Answer ${i + 1} of question ${j + 1} can not empty!`);
                    isValid = false;
                    // break questionLoop;
                }
            }

        }
        if (!isValid) {
            toast.error(`Answer and question can not empty!`);

            setQuestions(questionsClone);
            return;
        }
        return;
        //submit question
        //call nhiều API cùng lúc, k lưu theo thứ tự
        // await Promise.all(questions.map(async (question) => {
        //     const q = await postCreateNewQuestionForQuiz(
        //         +selectedQuiz.value,
        //         question.description,
        //         question.imageFile);
        //     //submit answer
        //     await Promise.all(question.answers.map(async (answer) => {
        //         await postCreateNewAnsweForQuestion(answer.description,
        //             answer.isCorrect,
        //             q.DT.id
        //         )
        //     }))
        // }))
        // postCreateNewQuestionForQuiz(quizId, questionDesc, questionImg)
        //call api lần lượt
        for (let question of questions) {
            const q = await postCreateNewQuestionForQuiz(
                +selectedQuiz.value,
                question.description,
                question.imageFile);
            for (let answer of question.answers) {
                await postCreateNewAnsweForQuestion(answer.description,
                    answer.isCorrect,
                    q.DT.id
                )
            }
        }
    }
    return (

        <div className="questions-container">

            <div className="add-new-question">
                <div className="col-6 form-group">
                    <label className='form-label'>Select quiz</label>
                    <Select

                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuizzes}
                        menuPortalTarget={document.body}
                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                    // className='form-control'
                    />
                </div>
            </div>
            <div className="mt-3 mb-2">
                Add question:
            </div>
            {questions && questions.length > 0
                && questions.map((q, index) => {
                    return (
                        <div key={q.id} className="q-main mb-4">
                            <div className="question-content">
                                <div className="description">
                                    <div className="form-floating">
                                        <input
                                            type="email"
                                            className={`form-control ${q.isInvalid ? "is-invalid" : ""}`}
                                            placeholder=""
                                            value={q.description}
                                            onChange={(event) => handleOnChange('QUESTION', q.id, event.target.value)} />
                                        <label htmlFor="floatingInput">{`Question ${index + 1}'s description`}</label>
                                    </div>
                                </div>

                                <div className="group-upload">
                                    <label for={q.id}>
                                        <LuImagePlus className="label-upload" />
                                        {!q.imageFile && <span>0 file selected</span>}
                                    </label>
                                    <input
                                        type="file"
                                        hidden
                                        id={q.id}
                                        accept="image/*"
                                        onChange={(event) => handleOnchangeQuestionImg(q.id, event)}
                                    />

                                    {q.imageFile &&
                                        <span
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => {
                                                setIsPreviewImg(true)
                                                setPreviewImage(q.imageFile)
                                            }}>{q.imageName}</span>

                                    }

                                </div>
                                <div className="btn-add">
                                    <span onClick={() => handleAddRemoveQuestion('ADD')}>
                                        <BsPatchPlus className='icon-add' />
                                    </span>
                                    {questions.length > 1 &&
                                        <span onClick={() => handleAddRemoveQuestion('REMOVE', q.id)}>
                                            <BsPatchMinus className='icon-remove' />
                                        </span>}
                                </div>
                            </div>
                            {q.answers && q.answers.length > 0
                                && q.answers.map((a, index) => {
                                    return (
                                        <div key={`q_${questions.id}-a_${a.id}`} className="answers-content">
                                            <input
                                                className={`form-check-input isCorrect`}
                                                type="checkbox"
                                                checked={a.isCorrect}
                                                onChange={(event) => handleAnswerQuestion('CHECKBOX', q.id, a.id, event.target.checked)}
                                            />
                                            <div className="form-floating answer-name">
                                                <input
                                                    type="text"
                                                    className={`form-control ${a.isInvalid ? "is-invalid" : ""}`}

                                                    placeholder=""
                                                    value={a.description}
                                                    onChange={(event) => handleAnswerQuestion('INPUT', q.id, a.id, event.target.value)}
                                                />
                                                <label htmlFor="floatingInput">Answer {index + 1}</label>
                                            </div>
                                            <div className="btn-group">
                                                <span className='icon-add' onClick={() => handleAddRemoveAnswer('ADD', q.id)}>
                                                    <AiOutlinePlusCircle />
                                                </span>
                                                {q.answers.length > 1 &&
                                                    <span className='icon-remove' onClick={() => handleAddRemoveAnswer('REMOVE', q.id, a.id)}>
                                                        <AiOutlineMinusSquare />
                                                    </span>}
                                            </div>
                                        </div>
                                    )
                                })}


                        </div>)
                })
            }

            {isPreviewImg &&
                <Lightbox

                    image={previewImage ? URL.createObjectURL(previewImage) : ""}
                    title={previewImage ? previewImage.name : ""}
                    onClose={() => setIsPreviewImg(false)} />}
            {questions && questions.length > 0 &&
                <div>
                    <button
                        onClick={() => handleSubmitQuestionForQuiz()}
                        className="btn btn-warning">Save Question</button>
                </div>}
        </div>
    )
}
export default QuizQA;