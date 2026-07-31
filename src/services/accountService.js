import api from "../api/axiosConfig";

const getAllAccounts = async () => {
    return await api.get("/accounts");
};

const getAccountById = async (id) => {
    return await api.get(`/accounts/${id}`);
};

const addAccount = async (account) => {
    return await api.post("/accounts", account);
};

const updateAccount = async (id, account) => {
    return await api.put(`/accounts/${id}`, account);
};

const deleteAccount = async (id) => {
    return await api.delete(`/accounts/${id}`);
};

const accountService = {
    getAllAccounts,
    getAccountById,
    addAccount,
    updateAccount,
    deleteAccount,
};

export default accountService;