import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAll(){
    return api.get('/data/memes?sortBy=_createdOn%20desc');    
}

export async function getSearched(search){
    return api.get(`/data/memes?where%3Dtitle%20LIKE%20${search}`);    
}

export async function getMyMemes(){
    const id = getUserData().id;
    return api.get(`/data/memes?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`);    
}

export async function getById(id) {
    return api.get('/data/memes/' + id);
}

export async function createMeme(item) {
    return api.post('/data/memes', item);
}

export async function updateMeme(item, id) {
    return api.put('/data/memes/' + id, item);
}

export async function deleteById(id) {
    return api.del('/data/memes/' + id);
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