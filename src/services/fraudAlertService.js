import api from "../api/axiosConfig";

// Get All Alerts
const getAllAlerts = async () => {
    return await api.get("/fraud-alerts");
};

// Get Alert By ID
const getAlertById = async (id) => {
    return await api.get(`/fraud-alerts/${id}`);
};

// Delete Alert
const deleteAlert = async (id) => {
    return await api.delete(`/fraud-alerts/${id}`);
};

const fraudAlertService = {
    getAllAlerts,
    getAlertById,
    deleteAlert
};

export default fraudAlertService;