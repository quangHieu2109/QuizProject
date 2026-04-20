import axios from "../utils/axiosCustomize";

const postCreateNewUser = (email, password, username, role, image) => {
    const form = new FormData();
    form.append('email', email);
    form.append('password', password);
    form.append('username', username);
    form.append('role', role);
    form.append('userImage', image);
    return axios.post('api/v1/participant', form);
}
const getAllUser = () => {
    return axios.get('api/v1/participant/all');
}
const putUpdateUser = (id, username, role, image) => {
    const form = new FormData();
    form.append('id', id);
    form.append('username', username);
    form.append('role', role);
    form.append('userImage', image);
    return axios.put('api/v1/participant', form);
}
const deleteUser = (userId) => {
    return axios.delete('api/v1/participant', { data: { id: userId } })
}
const getUserWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`)
}
const postLogin = (email, password) => {
    return axios.post(`api/v1/login`, { email, password, delay: 2000 })
    //{ email, password } <=> { email:email, password:password }
}
const postRegister = (email, username, password) => {
    return axios.post(`api/v1/register`, { email, username, password })
    //{ email, password } <=> { email:email, password:password }
}
const getQuizsByUser = () => {
    return axios.get(`api/v1/quiz-by-participant`);
}
const getQuizDetail = (quizId) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${quizId}`);
}
const postSubmitQuiz = (data) => {
    return axios.post(`/api/v1/quiz-submit`, { ...data });
    //post raw data
}
const postCreateNewQuiz = (description, name, difficult, quizImage) => {
    const data = new FormData();
    data.append('description', description)
    data.append('name', name)
    data.append('difficulty', difficult)
    data.append('quizImage', quizImage)

    return axios.post('/api/v1/quiz', data);
}
const getAllQuizForAdmin = () => {
    return axios.get(`/api/v1/quiz/all`);
}
const deleteQuizForAdmin = (quizId) => {
    return axios.delete(`/api/v1/quiz/${quizId}`)
}
const putUpdateQuizForAdmin = (id, description, name, difficulty, quizImage) => {
    const data = new FormData();
    data.append('id', id)
    data.append('description', description)
    data.append('name', name)
    data.append('difficulty', difficulty)
    data.append('quizImage', quizImage)
    return axios.put('/api/v1/quiz', data);
}
const postCreateNewQuestionForQuiz = (quizId, questionDesc, questionImg) => {
    const data = new FormData();
    data.append('quiz_id', quizId)
    data.append('description', questionDesc)
    data.append('questionImage', questionImg)
    return axios.post('/api/v1/question', data);

}
const postCreateNewAnsweForQuestion = (description, correct_answer, question_id) => {

    return axios.post('/api/v1/answer', {
        description,
        correct_answer,
        question_id
    });

}
const postAssignQuizToUser = (quizId, userId) => {
    return axios.post('/api/v1/quiz-assign-to-user', {
        quizId, userId
    });
}
const getQuizWithQA = (quizId) => {
    return axios.get(`/api/v1/quiz-with-qa/${quizId}`
    );
}
export {
    postCreateNewUser,
    getAllUser,
    putUpdateUser,
    deleteUser,
    getUserWithPaginate,
    postLogin,
    postRegister,
    getQuizsByUser,
    getQuizDetail,
    postSubmitQuiz,
    postCreateNewQuiz,
    getAllQuizForAdmin,
    deleteQuizForAdmin,
    putUpdateQuizForAdmin,
    postCreateNewQuestionForQuiz,
    postCreateNewAnsweForQuestion,
    postAssignQuizToUser,
    getQuizWithQA
}