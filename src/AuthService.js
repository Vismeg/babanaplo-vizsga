import axios from 'axios';
import React, { useState, useEffect } from 'react';

let token;



export function login(logindata) {
    return axios.post('https://localhost:7256/auth/login', logindata,
        res=>{
            token = res.data.token;
});
}

export function logout() {
    return axios.post('http://localhost:5244/api/Auth/logout', {},
        res=>{
            token = res.data.token;
});
}

export function register(registerdata) {
    return axios.post('https://localhost:7256/auth/register', registerdata,
        res=>{
            token = res.data.token;
});
}





