import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAll(){
    return api.get('/data/games?sortBy=_createdOn%20desc');    
}

export async function getLatest(){
    return api.get(`/data/games?sortBy=_createdOn%20desc&distinct=category`);    
}

export async function getById(id) {
    return api.get('/data/games/' + id);
}

export async function createNew(item) {
    return api.post('/data/games', item);
}

export async function updateThis(item, id) {
    return api.put('/data/games/' + id, item);
}

export async function deleteById(id) {
    return api.del('/data/games/' + id);
}

export async function getComments(gameId) {
    return api.get(`/data/comments?where=gameId%3D%22${gameId}%22`);
}

export async function createComment(comment) {
    return api.post(`/data/comments`, comment);
}

export async function getSearched(search){
    return api.get(`${search}`);    
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