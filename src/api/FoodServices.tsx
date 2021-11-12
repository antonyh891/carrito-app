import axios from 'axios';

const FoodServices = axios.create({
    baseURL: 'http://tutofox.com'
});

export default FoodServices;
