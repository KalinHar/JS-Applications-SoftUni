import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export function getAllIdeas(){
    return api.get('/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc');    
}

export function getById(id) {
    return api.get('/data/ideas/' + id);
}

export function createIdea(idea) {
    return api.post('/data/ideas', idea);
}

export function deleteById(id) {
    return api.del('/data/ideas/' + id);
}
