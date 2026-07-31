import api from "../api/axiosConfig";

// Get All Rules
const getAllRules = async () => {
    return await api.get("/rules");
};

// Get Rule By ID
const getRuleById = async (id) => {
    return await api.get(`/rules/${id}`);
};

// Add Rule
const addRule = async (rule) => {
    return await api.post("/rules", rule);
};

// Update Rule
const updateRule = async (id, rule) => {
    return await api.put(`/rules/${id}`, rule);
};

// Delete Rule
const deleteRule = async (id) => {
    return await api.delete(`/rules/${id}`);
};

// Search Rules
const searchRules = async (keyword) => {
    return await api.get(`/rules/search?keyword=${keyword}`);
};

const ruleService = {
    getAllRules,
    getRuleById,
    addRule,
    updateRule,
    deleteRule,
    searchRules,
};

export default ruleService;