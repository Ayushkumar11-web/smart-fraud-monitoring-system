import api from "../api/axiosConfig";

// ==========================
// Get All Transactions
// ==========================
const getAllTransactions = async () => {
    return await api.get("/transactions");
};

// ==========================
// Get Transaction By ID
// ==========================
const getTransactionById = async (id) => {
    return await api.get(`/transactions/${id}`);
};

// ==========================
// Add Transaction
// ==========================
const addTransaction = async (transaction) => {
    return await api.post("/transactions", transaction);
};

// ==========================
// Update Transaction
// ==========================
const updateTransaction = async (id, transaction) => {
    return await api.put(`/transactions/${id}`, transaction);
};

// ==========================
// Delete Transaction
// ==========================
const deleteTransaction = async (id) => {
    return await api.delete(`/transactions/${id}`);
};

// ==========================
// Search Transactions
// ==========================
const searchTransactions = async (keyword) => {
    return await api.get(`/transactions/search?keyword=${keyword}`);
};

// ==========================
// Get Transactions By Status
// ==========================
const getTransactionsByStatus = async (status) => {
    return await api.get(`/transactions/status/${status}`);
};

// ==========================
// Pagination
// ==========================
const getTransactionsPage = async (
    page = 0,
    size = 10,
    sortBy = "timestamp"
) => {
    return await api.get(
        `/transactions/page?page=${page}&size=${size}&sortBy=${sortBy}`
    );
};

// ==========================
// Export
// ==========================
const transactionService = {
    getAllTransactions,
    getTransactionById,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    searchTransactions,
    getTransactionsByStatus,
    getTransactionsPage
};

export default transactionService;