import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAll(){
    return api.get('/data/books?sortBy=_createdOn%20desc');    
}

export async function getMy(){
    const id = getUserData().id;
    return api.get(`/data/books?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`);    
}

export async function getById(id) {
    return api.get('/data/books/' + id);
}

export async function createNew(item) {
    return api.post('/data/books', item);
}

export async function updateThis(item, id) {
    return api.put('/data/books/' + id, item);
}

export async function deleteById(id) {
    return api.del('/data/books/' + id);
}

export async function makeLike(bookId) {
return api.post('/data/likes', {bookId});
}

export async function getAllLikes(bookId) {
    return api.get(`/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`);
}

export async function getMyLikes(bookId, userId) {
    return api.get(`/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}

export function getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'));
}

export function setUserData(data) {
    sessionStorage.setItem('userData', JSON.stringify(data));
}

export function clearUserData() {
    sessionStorage.removeItem('userData');
}