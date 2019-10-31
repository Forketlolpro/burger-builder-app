import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-react-app-3d9ac.firebaseio.com/'
});

export default instance;