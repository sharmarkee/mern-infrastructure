// users-service.js

// Import all named exports attached to a usersAPI object
// This syntax can be helpful documenting where the methods come from 
import * as usersAPI from './users-api';




export async function signUp(userData) {
  
    const token = await usersAPI.signUp(userData);
      // Persist the "token"
    localStorage.setItem('token', token);
    return getUser();

}

export function getToken() {
  // getItem returns null if there's no string
  const token = localStorage.getItem('token');
  if (!token) return null;
  // Obtain the payload of the token
  const payload = JSON.parse(atob(token.split('.')[1]));
  // A JWT's exp is expressed in seconds, not milliseconds, so convert
  if (payload.exp < Date.now() / 1000) {
    // Token has expired - remove it from localStorage
    localStorage.removeItem('token');
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  // If there's a token, return the user in the payload, otherwise return null
  return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export function logOut() {
  localStorage.removeItem('token');
}
export async function login(credentials) {
  const token = await usersAPI.login(credentials);
  localStorage.setItem('token', token);
  return getUser();
}

export function checkToken() {
  return usersAPI.checkToken()
    .then(dateStr => new Date(dateStr));
}