import api from "../api/axiosConfig";

const getDashboard = async () => {
    return await api.get("/dashboard");
};

const dashboardService = {
    getDashboard,
};

const getRecentFraudAlerts = async () => {
    return await api.get("/fraud-alerts");
};

const getRecentTransactions = async () => {
    return await api.get("/transactions");
};

export default {
    getDashboard,
    getRecentFraudAlerts,
    getRecentTransactions
};

