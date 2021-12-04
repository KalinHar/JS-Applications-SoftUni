import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAll(){
    return api.get('/data/albums?sortBy=_createdOn%20desc&distinct=name');    
}

export async function getMy(){
    const id = getUserData().id;
    return api.get(`${id}`);    
}

export async function getById(id) {
    return api.get('/data/albums/' + id);
}

export async function createNew(item) {
    return api.post('/data/albums', item);
}

export async function updateThis(item, id) {
    return api.put('/data/albums/' + id, item);
}

export async function deleteById(id) {
    return api.del('/data/albums/' + id);
}

export async function getSearched(search){
    return api.get(`/data/albums?where=name%20LIKE%20%22${search}%22`);    
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