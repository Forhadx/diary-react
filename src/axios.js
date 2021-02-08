import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://diary-ba772-default-rtdb.firebaseio.com/'
});

export default instance;