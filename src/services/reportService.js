import api from "../api/axiosConfig";

// Get Report
const getReport = async () => {

    return await api.get("/reports");

};

const reportService = {

    getReport

};

export default reportService;