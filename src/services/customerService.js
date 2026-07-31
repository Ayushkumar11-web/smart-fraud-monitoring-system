import axios from "axios";

const API_URL = "http://localhost:8080/customers";

const getAllCustomers = () => {
    return axios.get(API_URL);
};

const getCustomerById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

const addCustomer = (customer) => {
    return axios.post(API_URL, customer);
};

const updateCustomer = (id, customer) => {
    return axios.put(`${API_URL}/${id}`, customer);
};

const deleteCustomer = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

const customerService = {
    getAllCustomers,
    getCustomerById,
    addCustomer,
    updateCustomer,
    deleteCustomer
};

export default customerService;