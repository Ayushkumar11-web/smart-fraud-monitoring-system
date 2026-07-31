import { useEffect, useState } from "react";
import fraudAlertService from "../services/fraudAlertService";

function FraudAlerts() {

    const [alerts, setAlerts] = useState([]);

    const [filteredAlerts, setFilteredAlerts] = useState([]);

    const [keyword, setKeyword] = useState("");

    const [severityFilter, setSeverityFilter] = useState("ALL");

    const [selectedAlert, setSelectedAlert] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    useEffect(() => {

        loadAlerts();

    }, []);

    const loadAlerts = async () => {

        setLoading(true);

        setError("");

        try {

            const response =
                await fraudAlertService.getAllAlerts();

            const sortedAlerts = response.data.sort(
                (a, b) =>
                    new Date(b.createdAt) -
                    new Date(a.createdAt)
            );

            setAlerts(sortedAlerts);

            setFilteredAlerts(sortedAlerts);

        } catch (error) {

            console.error(error);

            setError("Failed to load fraud alerts.");

        } finally {

            setLoading(false);

        }

    };



    const handleDelete = async (id) => {

        if (!window.confirm("Delete this alert?"))
            return;

        try {

            await fraudAlertService.deleteAlert(id);

            loadAlerts();

        } catch (error) {

            console.error(error);

            alert("Delete failed.");

        }

    };


    const getBadge = (severity) => {

        if (severity === "HIGH")
            return "bg-danger";

        if (severity === "MEDIUM")
            return "bg-warning text-dark";

        return "bg-success";

    };

    const handleSearch = (value) => {

        setKeyword(value);

        let data = alerts;

        if (value !== "") {

            data = data.filter(

                alert =>

                    alert.reason
                        .toLowerCase()
                        .includes(value.toLowerCase())

            );

        }

        if (severityFilter !== "ALL") {

            data = data.filter(

                alert =>

                    alert.severity === severityFilter

            );

        }

        setFilteredAlerts(data);

    };

    const handleSeverity = (value) => {

        setSeverityFilter(value);

        let data = alerts;

        if (keyword !== "") {

            data = data.filter(

                alert =>

                    alert.reason
                        .toLowerCase()
                        .includes(keyword.toLowerCase())

            );

        }

        if (value !== "ALL") {

            data = data.filter(

                alert =>

                    alert.severity === value

            );

        }

        setFilteredAlerts(data);

    };

    const handleView = (alert) => {

        setSelectedAlert(alert);

    };

    return (

        <div className="container mt-4">

            <div className="d-flex justify-content-between align-items-center mb-3">

                <h2>Fraud Alerts</h2>

                <button
                    className="btn btn-primary"
                    onClick={loadAlerts}
                >
                    Refresh
                </button>

            </div>

            <div className="row mb-4">

                <div className="col-md-3">
                    <div className="card border-primary shadow">
                        <div className="card-body text-center">
                            <h6>Total Alerts</h6>
                            <h2>{alerts.length}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card border-danger shadow">
                        <div className="card-body text-center">
                            <h6>High</h6>
                            <h2>
                                {
                                    alerts.filter(a => a.severity === "HIGH").length
                                }
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card border-warning shadow">
                        <div className="card-body text-center">
                            <h6>Medium</h6>
                            <h2>
                                {
                                    alerts.filter(a => a.severity === "MEDIUM").length
                                }
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card border-success shadow">
                        <div className="card-body text-center">
                            <h6>Low</h6>
                            <h2>
                                {
                                    alerts.filter(a => a.severity === "LOW").length
                                }
                            </h2>
                        </div>
                    </div>
                </div>

            </div>

            <div className="row mb-3">

                <div className="col-md-4">

                    <select
                        className="form-select"
                        value={severityFilter}
                        onChange={(e) => handleSeverity(e.target.value)}
                    >

                        <option value="ALL">All Severity</option>
                        <option value="HIGH">High</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="LOW">Low</option>

                    </select>

                </div>

            </div>

            <div
                className="modal fade"
                id="viewAlertModal"
                tabIndex="-1"
            >

                <div className="modal-dialog">

                    <div className="modal-content">

                        <div className="modal-header bg-danger text-white">

                            <h5 className="modal-title">

                                Fraud Alert Details

                            </h5>

                            <button
                                className="btn-close btn-close-white"
                                data-bs-dismiss="modal"
                            ></button>

                        </div>

                        <div className="modal-body">

                            {

                                selectedAlert && (

                                    <>

                                        <p>

                                            <strong>Alert ID :</strong>

                                            {selectedAlert.alertId}

                                        </p>

                                        <p>

                                            <strong>Transaction ID :</strong>

                                            {

                                                selectedAlert.transaction
                                                    ?.transactionId

                                            }

                                        </p>

                                        <p>

                                            <strong>Reason :</strong>

                                            {selectedAlert.reason}

                                        </p>

                                        <p>

                                            <strong>Severity :</strong>

                                            <span
                                                className={`badge ms-2 ${getBadge(selectedAlert.severity)}`}
                                            >

                                    {selectedAlert.severity}

                                </span>

                                        </p>

                                        <p>

                                            <strong>Created :</strong>

                                            {

                                                selectedAlert.createdAt
                                                    ?.replace("T", " ")

                                            }

                                        </p>

                                    </>

                                )

                            }

                        </div>

                    </div>

                </div>

            </div>

            {
                loading && (

                    <div className="text-center mb-3">

                        <div className="spinner-border text-primary"></div>

                        <h5 className="mt-2">
                            Loading Fraud Alerts...
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

            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search by Reason or Severity"
                value={keyword}
                onChange={(e) => handleSearch(e.target.value)}
            />

            <table className="table table-bordered table-striped">

                <thead className="table-dark">

                <tr>

                    <th>ID</th>
                    <th>Transaction ID</th>
                    <th>Reason</th>
                    <th>Severity</th>
                    <th>Created At</th>
                    <th>Action</th>

                </tr>

                </thead>

                <tbody>

                {

                    filteredAlerts.length === 0 ? (

                        <tr>

                            <td
                                colSpan="6"
                                className="text-center"
                            >
                                No Fraud Alerts Found
                            </td>

                        </tr>

                    ) : (

                        filteredAlerts.map((alert) => (

                            <tr key={alert.alertId}>

                                <td>{alert.alertId}</td>

                                <td>

                                    {
                                        alert.transaction
                                            ? alert.transaction.transactionId
                                            : "-"
                                    }

                                </td>

                                <td>{alert.reason}</td>

                                <td>

                                    <span
                                        className={`badge ${getBadge(alert.severity)}`}
                                    >
                                        {alert.severity}
                                    </span>

                                </td>

                                <td>

                                    {
                                        alert.createdAt
                                            ?.replace("T", " ")
                                    }

                                </td>

                                <td>

                                    <button
                                        className="btn btn-info btn-sm me-2"
                                        onClick={() => handleView(alert)}
                                        data-bs-toggle="modal"
                                        data-bs-target="#viewAlertModal"
                                    >
                                        View
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            handleDelete(alert.alertId)
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))

                    )

                }

                </tbody>

            </table>

        </div>

    );

}

export default FraudAlerts;