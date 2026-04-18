import { useEffect, useState } from 'react';
import Select from 'react-select'
import './Questions.scss'
import { BsPatchPlus, BsPatchMinus } from "react-icons/bs";
import { AiOutlineMinusSquare, AiOutlinePlusCircle } from "react-icons/ai";
import { LuImagePlus } from "react-icons/lu";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import Lightbox from "react-awesome-lightbox";
import { getAllQuizForAdmin, postCreateNewAnsweForQuestion, postCreateNewQuestionForQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';

const Questions = (props) => {
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
                description: "question 1",
                imageFile: "",
                imageName: "",
                answers: [
                    {
                        id: uuidv4(),
                        description: "answer 1",
                        isCorrect: false
                    },
                    {
                        id: uuidv4(),
                        description: "answer 2",
                        isCorrect: false
                    }
                ]
            },
            {
                id: uuidv4(),
                description: "question 2",
                imageFile: "",
                imageName: "",
                answers: [
                    {
                        id: uuidv4(),
                        description: "answer 1",
                        isCorrect: false
                    },
                    {
                        id: uuidv4(),
                        description: "answer 2",
                        isCorrect: true
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
    console.log(">>> check list quizzes ", listQuizzes)
    const handleAddRemoveQuestion = (type, id = "") => {
        console.log(">>> check handleAddRemoveQuestion. type: ", type, " ", id)
        if (type === 'ADD') {
            let emptyQuestion = {
                id: uuidv4(),
                description: "new empty question",
                imageFile: "",
                imageName: "",
                answers: [
                    {
                        id: uuidv4(),
                        description: "new empty answer",
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
        console.log(">>> question index ", index)
        console.log(">>> check handleAddRemoveAnswer. type: ", type, " qid ", qid, " aid ", aid)
        if (type === 'ADD') {
            let emptyAnswer = {
                id: uuidv4(),
                description: "empty answer",
                isCorrect: false
            }
            questionsClone[index].answers.push(emptyAnswer);
            setQuestions(questionsClone);
            return;
        }
        if (type === 'REMOVE') {
            let newAnswers = questionsClone[index].answers.filter(item => item.id !== aid);
            console.log(">>> check new answers ", newAnswers)
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
                    }
                }
                return answer;
            }
        )
        setQuestions(questionsClone);
    }
    const handleSubmitQuestionForQuiz = async () => {
        console.log(">>> question: ", questions);
        await Promise.all(questions.map(async (question) => {
            const q = await postCreateNewQuestionForQuiz(
                +selectedQuiz.value,
                question.description,
                question.imageFile);
            await Promise.all(question.answers.map(async (answer) => {
                await postCreateNewAnsweForQuestion(answer.description,
                    answer.isCorrect,
                    q.DT.id
                )
            }))
        }))
        // postCreateNewQuestionForQuiz(quizId, questionDesc, questionImg)
    }
    return (

        <div className="questions-container">
            <div className="title">
                Question component
            </div>
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
                                            className="form-control"
                                            placeholder=""
                                            value={q.description}
                                            onChange={(event) => handleOnChange('QUESTION', q.id, event.target.value)} />
                                        <label htmlFor="floatingInput">{`Question ${index + 1}'s description`}</label>
                                    </div>
                                </div>

                                <div className="group-upload">
                                    <label for={q.id}>
                                        <LuImagePlus className="label-upload" />
                                    </label>
                                    <input
                                        type="file"
                                        hidden
                                        id={q.id}
                                        onChange={(event) => handleOnchangeQuestionImg(q.id, event)}
                                    />

                                    {q.imageFile ?
                                        <span
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => {
                                                setIsPreviewImg(true)
                                                setPreviewImage(q.imageFile)
                                            }}>{q.imageName}</span>
                                        : <span>0 file selected</span>
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
                                                className="form-check-input isCorrect"
                                                type="checkbox"
                                                checked={a.isCorrect}
                                                onChange={(event) => handleAnswerQuestion('CHECKBOX', q.id, a.id, event.target.checked)}
                                            />
                                            <div className="form-floating answer-name">
                                                <input
                                                    type="text"
                                                    className="form-control"
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
export default Questions;