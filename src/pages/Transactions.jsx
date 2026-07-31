import { useEffect, useState } from "react";
import transactionService from "../services/transactionService";
import AddTransactionModal from "./AddTransactionModal";

function Transactions() {

    const [transactions, setTransactions] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);

    const [filteredTransactions, setFilteredTransactions] = useState([]);

    const [statusFilter, setStatusFilter] = useState("ALL");

    // Load All Transactions
    const loadTransactions = async () => {

        setLoading(true);

        setError("");

        try {

            const response =
                await transactionService.getAllTransactions();

            const sorted =
                response.data.sort(
                    (a, b) =>
                        new Date(b.timestamp) -
                        new Date(a.timestamp)
                );

            setTransactions(sorted);

            setFilteredTransactions(sorted);

        }

        catch (error) {

            console.error(error);

            setError("Failed to load transactions.");

        }
        finally {

            setLoading(false);

        }

    };

    const handleSearch = (value) => {

        setKeyword(value);

        let data = transactions;

        if (value !== "") {

            data = data.filter(transaction =>

                transaction.account?.accountNumber
                    ?.toLowerCase()
                    .includes(value.toLowerCase())

                ||

                transaction.location
                    ?.toLowerCase()
                    .includes(value.toLowerCase())

            );

        }

        if (statusFilter !== "ALL") {

            data = data.filter(
                transaction =>
                    transaction.status === statusFilter
            );

        }

        setFilteredTransactions(data);

    };

    const handleStatus = (value) => {

        setStatusFilter(value);

        let data = transactions;

        if (keyword !== "") {

            data = data.filter(transaction =>

                transaction.account?.accountNumber
                    ?.toLowerCase()
                    .includes(keyword.toLowerCase())

                ||

                transaction.location
                    ?.toLowerCase()
                    .includes(keyword.toLowerCase())

            );

        }

        if (value !== "ALL") {

            data = data.filter(
                transaction =>
                    transaction.status === value
            );

        }

        setFilteredTransactions(data);

    };

    useEffect(() => {

        loadTransactions();

    }, []);

    // Delete Transaction
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this transaction?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await transactionService.deleteTransaction(id);

            alert("Transaction Deleted Successfully");

            loadTransactions();

        } catch (err) {

            console.error(err);

            alert("Delete Failed");

        }

    };

    return (

        <div className="container mt-4">

            <h2 className="mb-4 text-center">
                Transaction Management
            </h2>

            <div className="d-flex justify-content-between align-items-center mb-3">

                <input
                    type="text"
                    className="form-control"
                    placeholder="Search Transaction..."
                    value={keyword}
                    onChange={(e) => handleSearch(e.target.value)}
                />

                <button
                    className="btn btn-info"
                    onClick={() => handleSearch(keyword)}
                >
                    Search
                </button>

                <select
                    className="form-select"
                    style={{ width: "200px" }}
                    value={statusFilter}
                    onChange={(e) => handleStatus(e.target.value)}
                >
                    <option value="ALL">All Status</option>
                    <option value="SUCCESS">SUCCESS</option>
                    <option value="FAILED">FAILED</option>
                    <option value="SUSPICIOUS">SUSPICIOUS</option>
                </select>

                <button
                    className="btn btn-success"
                    onClick={() => setShowAddModal(true)}
                >
                    + Add Transaction
                </button>

                <button
                    className="btn btn-primary"
                    onClick={loadTransactions}
                >
                    Refresh
                </button>

            </div>

            {
                loading &&
                <h5>Loading Transactions...</h5>
            }

            {
                error &&
                <div className="alert alert-danger">
                    {error}
                </div>
            }

            <table className="table table-bordered table-striped">

                <thead className="table-dark">

                <tr>

                    <th>ID</th>
                    <th>Account ID</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Timestamp</th>
                    <th>Action</th>

                </tr>

                </thead>

                <tbody>
                {
                    filteredTransactions.length > 0 ? (

                        filteredTransactions.map((transaction) => (

                            <tr key={transaction.transactionId}>

                                <td>{transaction.transactionId}</td>

                                <td>{transaction.account?.accountId}</td>

                                <td>{transaction.amount}</td>

                                <td>{transaction.transactionType}</td>

                                <td>{transaction.location}</td>

                                <td>
                                    <span
                                        className={`badge ${
                                            transaction.status === "SUCCESS"
                                                ? "bg-success"
                                                : transaction.status === "FAILED" 
                                                    ? "bg-danger"
                                                    : "bg-warning text-dark"
                                        }`}
                                    >
        {transaction.status}
    </span>
                                </td>

                                <td>
                                    {transaction.timestamp
                                        ? transaction.timestamp.replace("T", " ")
                                        : "-"}
                                </td>

                                <td>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            handleDelete(transaction.transactionId)
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan="8"
                                className="text-center"
                            >
                                No Transactions Found
                            </td>

                        </tr>

                    )
                }

                </tbody>

            </table>

            {
                showAddModal && (

                    <AddTransactionModal

                        onTransactionAdded={() => {

                            setShowAddModal(false);

                            loadTransactions();

                        }}

                        onClose={() => {

                            setShowAddModal(false);

                        }}

                    />

                )
            }

        </div>

    );

}

export default Transactions;