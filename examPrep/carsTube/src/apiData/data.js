import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAll(){
    return api.get('/data/cars?sortBy=_createdOn%20desc');    
}

export async function getMy(){
    const id = getUserData().id;
    return api.get(`/data/cars?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`);    
}

export async function getById(id) {
    return api.get('/data/cars/' + id);
}

export async function createNew(item) {
    return api.post('/data/cars', item);
}

export async function updateThis(item, id) {
    return api.put('/data/cars/' + id, item);
}

export async function deleteById(id) {
    return api.del('/data/cars/' + id);
}

export async function getSearched(search){
    return api.get(`/data/cars?where=year%3D${encodeURIComponent(search)}`);    
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