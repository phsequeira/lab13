import request from 'superagent';

// API url -- different from the front end URL
const URL = 'https://immense-ocean-97679.herokuapp.com';

export async function signUp(email, password) {
    const response = await request
        .post(`${URL}/auth/signup`)
        .send({ email, password })

    return response.body;
}

export async function login(email, password) {
    const response = await request
        .post(`${URL}/auth/signin`)

        .send({ email, password })

    return response.body;
}

export async function getAllTodos(token) {
    const response = await request
        .get(`${URL}/api/todo`)
        .set('Authorization', token)

    return response.body;
}

export async function addTodo(todo, token) {
    const response = await request
        .post(`${URL}/api/todo`)
        .set('Authorization', token)
        .send({ todo })

    return response.body;
}


export async function finishedTodo(todoId, token) {
    const response = await request
        .put(`${URL}/api/todo/${todoId}`)
        .set('Authorization', token)

    return response.body;
}