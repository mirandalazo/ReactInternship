import Axios from 'axios';

const http = Axios.create({
    baseURL: 'http://localhost:4000/',
});

export default http;