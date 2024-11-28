import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:5000/api/v1"
});
//https://myshop-api-1j3g.onrender.com/api/v1