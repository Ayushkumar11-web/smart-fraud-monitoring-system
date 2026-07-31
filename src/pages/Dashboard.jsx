import { useEffect, useState } from "react";
import dashboardService from "../services/dashboardService";
import transactionService from "../services/transactionService";
import fraudAlertService from "../services/fraudAlertService";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement
} from "chart.js";

import { Pie, Bar, Line } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement
);

function Dashboard() {

    const [dashboard, setDashboard] = useState({


        totalCustomers: 0,
        totalAccounts: 0,
        totalTransactions: 0,
        totalFraudAlerts: 0,
        successfulTransactions: 0,
        failedTransactions: 0,
        suspiciousTransactions: 0

    });

    const [recentTransactions, setRecentTransactions] = useState([]);
    const [recentAlerts, setRecentAlerts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        setLoading(true);
        setError("");

        try {

            const dashboardResponse =
                await dashboardService.getDashboard();

            setDashboard(dashboardResponse.data);

            const transactionResponse =
                await transactionService.getAllTransactions();

            const latestTransactions =
                transactionResponse.data
                    .sort(
                        (a, b) =>
                            new Date(b.timestamp) -
                            new Date(a.timestamp)
                    )
                    .slice(0, 5);

            setRecentTransactions(latestTransactions);

            const alertResponse =
                await fraudAlertService.getAllAlerts();

            const latestAlerts =
                alertResponse.data
                    .sort(
                        (a, b) =>
                            new Date(b.createdAt) -
                            new Date(a.createdAt)
                    )
                    .slice(0, 5);

            setRecentAlerts(latestAlerts);

        } catch (error) {

            console.error(error);

            setError("Failed to load dashboard.");

        } finally {

            setLoading(false);

        }

    };

    // ===============================
// Pie Chart
// ===============================

    const pieData = {
        labels: [
            "Success",
            "Failed",
            "Suspicious"
        ],
        datasets: [
            {
                data: [
                    dashboard.successfulTransactions,
                    dashboard.failedTransactions,
                    dashboard.suspiciousTransactions
                ],
                backgroundColor: [
                    "#198754",
                    "#dc3545",
                    "#ffc107"
                ]
            }
        ]
    };

// ===============================
// Bar Chart
// ===============================

    const barData = {
        labels: [
            "Customers",
            "Accounts",
            "Transactions",
            "Fraud Alerts"
        ],
        datasets: [
            {
                label: "Count",
                data: [
                    dashboard.totalCustomers,
                    dashboard.totalAccounts,
                    dashboard.totalTransactions,
                    dashboard.totalFraudAlerts
                ],
                backgroundColor: [
                    "#0d6efd",
                    "#198754",
                    "#0dcaf0",
                    "#dc3545"
                ]
            }
        ]
    };

// ===============================
// Line Chart
// ===============================

    const lineData = {
        labels: [
            "Success",
            "Failed",
            "Suspicious"
        ],
        datasets: [
            {
                label: "Transactions",
                data: [
                    dashboard.successfulTransactions,
                    dashboard.failedTransactions,
                    dashboard.suspiciousTransactions
                ],
                borderColor: "#0d6efd",
                backgroundColor: "#0d6efd",
                tension: 0.4
            }
        ]
    };

    return (

        <div>


            {
                loading && (

                    <div className="text-center mb-4">

                        <div className="spinner-border text-primary"></div>

                        <h5 className="mt-2">
                            Loading Dashboard...
                        </h5>

                    </div>

                )
            }

            {
                error && (

                    <div className="alert alert-danger">

                        {error}

                    </div>

                )
            }


            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>Dashboard</h2>

                <button
                    className="btn btn-primary"
                    onClick={loadDashboard}
                >
                    Refresh
                </button>

            </div>

            {/* Top Row */}

            <div className="row">

                {/* Customers */}
                <div className="col-md-3 mb-4">
                    <div className="card border-0 shadow-lg h-100">
                        <div className="card-body d-flex justify-content-between align-items-center">

                            <div>
                                <h6 className="text-muted mb-2">
                                    Total Customers
                                </h6>

                                <h2 className="fw-bold">
                                    {dashboard.totalCustomers}
                                </h2>
                            </div>

                            <div
                                className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                                style={{
                                    width: "60px",
                                    height: "60px",
                                    fontSize: "28px"
                                }}
                            >
                                <i className="bi bi-people-fill"></i>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Accounts */}
                <div className="col-md-3 mb-4">
                    <div className="card border-0 shadow-lg h-100">
                        <div className="card-body d-flex justify-content-between align-items-center">

                            <div>
                                <h6 className="text-muted mb-2">
                                    Total Accounts
                                </h6>

                                <h2 className="fw-bold">
                                    {dashboard.totalAccounts}
                                </h2>
                            </div>

                            <div
                                className="rounded-circle bg-success text-white d-flex justify-content-center align-items-center"
                                style={{
                                    width: "60px",
                                    height: "60px",
                                    fontSize: "28px"
                                }}
                            >
                                <i className="bi bi-bank"></i>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Transactions */}
                <div className="col-md-3 mb-4">
                    <div className="card border-0 shadow-lg h-100">
                        <div className="card-body d-flex justify-content-between align-items-center">

                            <div>
                                <h6 className="text-muted mb-2">
                                    Total Transactions
                                </h6>

                                <h2 className="fw-bold">
                                    {dashboard.totalTransactions}
                                </h2>
                            </div>

                            <div
                                className="rounded-circle bg-info text-white d-flex justify-content-center align-items-center"
                                style={{
                                    width: "60px",
                                    height: "60px",
                                    fontSize: "28px"
                                }}
                            >
                                <i className="bi bi-cash-stack"></i>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Fraud Alerts */}
                <div className="col-md-3 mb-4">
                    <div className="card border-0 shadow-lg h-100">
                        <div className="card-body d-flex justify-content-between align-items-center">

                            <div>
                                <h6 className="text-muted mb-2">
                                    Fraud Alerts
                                </h6>

                                <h2 className="fw-bold text-danger">
                                    {dashboard.totalFraudAlerts}
                                </h2>
                            </div>

                            <div
                                className="rounded-circle bg-danger text-white d-flex justify-content-center align-items-center"
                                style={{
                                    width: "60px",
                                    height: "60px",
                                    fontSize: "28px"
                                }}
                            >
                                <i className="bi bi-exclamation-triangle-fill"></i>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

            {/* Bottom Row */}

            <div className="row">

                <div className="col-md-4 mb-4">
                    <div className="card shadow border-success">
                        <div className="card-body text-center">

                            <h5>
                                <i className="bi bi-check-circle-fill text-success me-2"></i>
                                Successful Transactions
                            </h5>

                            <h2>{dashboard.successfulTransactions}</h2>

                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card shadow border-danger">
                        <div className="card-body text-center">

                            <h5>
                                <i className="bi bi-x-circle-fill text-danger me-2"></i>
                                Failed Transactions
                            </h5>

                            <h2>{dashboard.failedTransactions}</h2>

                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card shadow border-warning">
                        <div className="card-body text-center">

                            <h5>
                                <i className="bi bi-shield-fill-exclamation text-warning me-2"></i>
                                Suspicious Transactions
                            </h5>

                            <h2>{dashboard.suspiciousTransactions}</h2>

                        </div>
                    </div>
                </div>

                {/* Charts */}

                <div className="row mt-4">

                    {/* Pie Chart */}
                    <div className="col-md-4 mb-4">

                        <div className="card shadow h-100">

                            <div className="card-header bg-success text-white">

                                <h5 className="mb-0">
                                    Transaction Status
                                </h5>

                            </div>

                            <div className="card-body">

                                <Pie data={pieData} />

                            </div>

                        </div>

                    </div>

                    {/* Bar Chart */}
                    <div className="col-md-4 mb-4">

                        <div className="card shadow h-100">

                            <div className="card-header bg-primary text-white">

                                <h5 className="mb-0">
                                    System Summary
                                </h5>

                            </div>

                            <div className="card-body">

                                <Bar data={barData} />

                            </div>

                        </div>

                    </div>

                    {/* Line Chart */}
                    <div className="col-md-4 mb-4">

                        <div className="card shadow h-100">

                            <div className="card-header bg-info text-white">

                                <h5 className="mb-0">
                                    Transaction Trend
                                </h5>

                            </div>

                            <div className="card-body">

                                <Line data={lineData} />

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* Recent Transactions */}
            <div className="card shadow">

                <div className="card-header bg-dark text-white">
                    <h5 className="mb-0">
                        Recent Transactions
                    </h5>
                </div>


                    <div className="card-body">

                        <table className="table table-hover table-bordered">

                            <thead className="table-light">
                            <tr>
                                <th>ID</th>
                                <th>Account</th>
                                <th>Amount</th>
                                <th>Type</th>
                                <th>Status</th>
                            </tr>
                            </thead>

                            <tbody>

                            {
                                recentTransactions.length > 0 ? (

                                    recentTransactions.map((transaction) => (

                                        <tr key={transaction.transactionId}>

                                            <td>{transaction.transactionId}</td>

                                            <td>{transaction.account?.accountNumber}</td>

                                            <td>₹ {transaction.amount}</td>

                                            <td>{transaction.transactionType}</td>

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

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td colSpan="5" className="text-center">
                                            No Transactions Found
                                        </td>

                                    </tr>

                                )
                            }

                            </tbody>

                        </table>

                    </div>

                </div>

                <div className="card shadow mt-4">

                    <div className="card-header bg-danger text-white">
                        <h5 className="mb-0">
                            Recent Fraud Alerts
                        </h5>
                    </div>
                </div>


                    <div className="card-body">

                        <table className="table table-bordered table-hover">

                            <thead className="table-light">

                            <tr>
                                <th>ID</th>
                                <th>Reason</th>
                                <th>Severity</th>
                                <th>Created At</th>
                            </tr>

                            </thead>

                            <tbody>

                            {
                                recentAlerts.length > 0 ? (

                                    recentAlerts.map((alert) => (

                                        <tr key={alert.alertId}>

                                            <td>{alert.alertId}</td>

                                            <td>{alert.reason}</td>

                                            <td>
                            <span
                                className={`badge ${
                                    alert.severity === "HIGH"
                                        ? "bg-danger"
                                        : alert.severity === "MEDIUM"
                                            ? "bg-warning text-dark"
                                            : "bg-success"
                                }`}
                            >
                                {alert.severity}
                            </span>
                                            </td>

                                            <td>
                                                {new Date(alert.createdAt).toLocaleString()}
                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td colSpan="4" className="text-center">
                                            No Fraud Alerts Found
                                        </td>

                                    </tr>

                                )
                            }

                            </tbody>

                        </table>

                    </div>

                </div>
    );

}

export default Dashboard;