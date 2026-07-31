import { useEffect, useState } from "react";
import reportService from "../services/reportService";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    Legend
} from "recharts";

function Reports() {

    const [report, setReport] = useState({

        totalCustomers: 0,
        totalAccounts: 0,
        totalTransactions: 0,
        totalFraudAlerts: 0,
        successfulTransactions: 0,
        failedTransactions: 0,
        suspiciousTransactions: 0

    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadReport();

    }, []);

    const loadReport = async () => {

        try {

            const response = await reportService.getReport();

            setReport(response.data);

        } catch (error) {

            console.error(error);

            alert("Failed to load report.");

        } finally {

            setLoading(false);

        }

    };

    const barData = [

        {
            name: "Success",
            value: report.successfulTransactions
        },

        {
            name: "Failed",
            value: report.failedTransactions
        },

        {
            name: "Suspicious",
            value: report.suspiciousTransactions
        }

    ];

    const pieData = [

        {
            name: "Customers",
            value: report.totalCustomers
        },

        {
            name: "Accounts",
            value: report.totalAccounts
        },

        {
            name: "Transactions",
            value: report.totalTransactions
        },

        {
            name: "Fraud Alerts",
            value: report.totalFraudAlerts
        }

    ];

    const COLORS = [

        "#0d6efd",
        "#198754",
        "#0dcaf0",
        "#dc3545"

    ];

    if (loading) {

        return (

            <div className="container mt-5 text-center">

                <h3>Loading Report...</h3>

            </div>

        );

    }

    const exportPDF = () => {

        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("Fraud Detection Report", 14, 20);

        autoTable(doc, {

            startY: 30,

            head: [[
                "Report",
                "Value"
            ]],   // <-- comma yaha

            body: [

                ["Total Customers", report.totalCustomers],
                ["Total Accounts", report.totalAccounts],
                ["Total Transactions", report.totalTransactions],
                ["Fraud Alerts", report.totalFraudAlerts],
                ["Successful Transactions", report.successfulTransactions],
                ["Failed Transactions", report.failedTransactions],
                ["Suspicious Transactions", report.suspiciousTransactions]

            ]   // <-- yaha comma nahi lagega

        });

        doc.save("Fraud_Report.pdf");

    };


    const exportExcel = () => {

        const worksheet = XLSX.utils.json_to_sheet([report]);

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Reports"
        );

        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array"
        });

        const fileData = new Blob(
            [excelBuffer],
            {
                type:
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            }
        );

        saveAs(fileData, "Fraud_Report.xlsx");

    };

    const printReport = () => {

        window.print();

    };


    return (

        <div className="container mt-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>
                    Reports Dashboard
                </h2>

                <button
                    className="btn btn-primary"
                    onClick={loadReport}
                >
                    <i className="bi bi-arrow-clockwise me-2"></i>

                    Refresh

                </button>

                <button
                    className="btn btn-danger"
                    onClick={exportPDF}
                >
                    Export PDF
                </button>

                <button
                    className="btn btn-success"
                    onClick={exportExcel}
                >
                    Export Excel
                </button>

                <button
                    className="btn btn-secondary"
                    onClick={printReport}
                >
                    Print
                </button>

            </div>

            <div className="row">

                <div className="col-md-3 mb-4">

                    <div className="card shadow border-primary h-100">

                        <div className="card-body text-center">

                            <i className="bi bi-people-fill text-primary fs-1"></i>

                            <h5 className="mt-3">

                                Customers

                            </h5>

                            <h2>

                                {report.totalCustomers}

                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-3 mb-4">

                    <div className="card shadow border-success h-100">

                        <div className="card-body text-center">

                            <i className="bi bi-bank text-success fs-1"></i>

                            <h5 className="mt-3">

                                Accounts

                            </h5>

                            <h2>

                                {report.totalAccounts}

                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-3 mb-4">

                    <div className="card shadow border-info h-100">

                        <div className="card-body text-center">

                            <i className="bi bi-cash-stack text-info fs-1"></i>

                            <h5 className="mt-3">

                                Transactions

                            </h5>

                            <h2>

                                {report.totalTransactions}

                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-3 mb-4">

                    <div className="card shadow border-danger h-100">

                        <div className="card-body text-center">

                            <i className="bi bi-exclamation-triangle-fill text-danger fs-1"></i>

                            <h5 className="mt-3">

                                Fraud Alerts

                            </h5>

                            <h2>

                                {report.totalFraudAlerts}

                            </h2>

                        </div>

                    </div>

                </div>

            </div>

            <div className="card shadow mt-4">

                <div className="card-header bg-dark text-white">

                    <h4 className="mb-0">

                        Transaction Summary

                    </h4>

                </div>

                <div className="card-body">

                    <table className="table table-bordered text-center">

                        <thead className="table-light">

                        <tr>

                            <th>Transaction Type</th>
                            <th>Total</th>

                        </tr>

                        </thead>

                        <tbody>

                        <tr>

                            <td>Successful Transactions</td>

                            <td className="text-success fw-bold">

                                {report.successfulTransactions}

                            </td>

                        </tr>

                        <tr>

                            <td>Failed Transactions</td>

                            <td className="text-danger fw-bold">

                                {report.failedTransactions}

                            </td>

                        </tr>

                        <tr>

                            <td>Suspicious Transactions</td>

                            <td className="text-warning fw-bold">

                                {report.suspiciousTransactions}

                            </td>

                        </tr>

                        </tbody>

                    </table>

                </div>

            </div>

            <div className="row mt-4">

                <div className="col-md-6">

                    <div className="card shadow">

                        <div className="card-header">

                            <h5 className="mb-0">

                                Transaction Statistics

                            </h5>

                        </div>

                        <div className="card-body">

                            <ResponsiveContainer
                                width="100%"
                                height={300}
                            >

                                <BarChart data={barData}>

                                    <CartesianGrid strokeDasharray="3 3" />

                                    <XAxis dataKey="name" />

                                    <YAxis />

                                    <Tooltip />

                                    <Bar
                                        dataKey="value"
                                        fill="#0d6efd"
                                    />

                                </BarChart>

                            </ResponsiveContainer>

                        </div>

                    </div>

                </div>

                <div className="col-md-6">

                    <div className="card shadow">

                        <div className="card-header">

                            <h5 className="mb-0">

                                Overall Distribution

                            </h5>

                        </div>

                        <div className="card-body">

                            <ResponsiveContainer
                                width="100%"
                                height={300}
                            >

                                <PieChart>

                                    <Pie

                                        data={pieData}

                                        dataKey="value"

                                        nameKey="name"

                                        outerRadius={100}

                                        label

                                    >

                                        {

                                            pieData.map((entry, index) => (

                                                <Cell

                                                    key={index}

                                                    fill={

                                                        COLORS[
                                                        index %
                                                        COLORS.length
                                                            ]

                                                    }

                                                />

                                            ))

                                        }

                                    </Pie>

                                    <Tooltip />

                                    <Legend />

                                </PieChart>

                            </ResponsiveContainer>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Reports;