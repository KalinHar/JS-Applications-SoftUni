import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAll(){
    return api.get('/data/catalog');    
}

export async function getMyItems(){
    const id = getUserData().id;
    return api.get(`/data/catalog?where=_ownerId%3D%22${id}%22`);    
}

export async function getById(id) {
    return api.get('/data/catalog/' + id);
}

export async function createItem(item) {
    return api.post('/data/catalog', item);
}

export async function updateItem(item, id) {
    return api.put('/data/catalog/' + id, item);
}

export async function deleteById(id) {
    return api.del('/data/catalog/' + id);
}

export function getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'));
}

export function setUserData(data) {
    sessionStorage.setItem('userData', JSON.stringify(data))
}

export function clearUserData() {
    sessionStorage.removeItem('userData')
}