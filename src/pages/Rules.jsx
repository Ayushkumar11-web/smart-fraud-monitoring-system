import { useEffect, useState } from "react";
import ruleService from "../services/ruleService";
import AddRuleModal from "./AddRuleModal";
import EditRuleModal from "../components/EditRuleModal";

function Rules() {

    const [rules, setRules] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedRule, setSelectedRule] = useState(null);

    // Load Rules
    const loadRules = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await ruleService.getAllRules();

            setRules(response.data || response);

        } catch (err) {

            console.error(err);

            setError("Unable to load rules.");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadRules();

    }, []);

    // Search
    const handleSearch = async () => {

        if (keyword.trim() === "") {

            loadRules();
            return;

        }

        try {

            const response =
                await ruleService.searchRules(keyword);

            setRules(response.data);

        } catch (err) {

            console.error(err);

            alert("Search Failed");

        }

    };

    // Delete
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this rule?"
        );

        if (!confirmDelete) return;

        try {

            await ruleService.deleteRule(id);

            alert("Rule Deleted Successfully");

            loadRules();

        } catch (err) {

            console.error(err);

            alert("Delete Failed");

        }

    };

    // Edit
    const handleEdit = (rule) => {

        setSelectedRule(rule);

        setTimeout(() => {

            document.getElementById("editRuleButton").click();

        }, 100);

    };

    return (

        <div className="container mt-4">

            <h2 className="text-center mb-4">
                Fraud Detection Rules
            </h2>

            <div className="d-flex justify-content-between align-items-center mb-3">

                <input
                    type="text"
                    className="form-control"
                    placeholder="Search Rule..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    style={{ width: "250px" }}
                />

                <div className="d-flex gap-2">

                    <button
                        className="btn btn-info"
                        onClick={handleSearch}
                    >
                        Search
                    </button>

                    <button
                        className="btn btn-success"
                        onClick={() => setShowAddModal(true)}
                    >
                        + Add Rule
                    </button>

                    <button
                        className="btn btn-primary"
                        onClick={loadRules}
                    >
                        Refresh
                    </button>

                </div>

            </div>

            {
                loading &&
                <h5>Loading Rules...</h5>
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
                    <th>Rule Name</th>
                    <th>Threshold</th>
                    <th>Severity</th>
                    <th>Status</th>
                    <th>Action</th>

                </tr>

                </thead>

                <tbody>

                {

                    rules.length > 0 ? (

                        rules.map((rule) => (

                            <tr key={rule.ruleId}>

                                <td>{rule.ruleId}</td>

                                <td>{rule.ruleName}</td>

                                <td>{rule.thresholdAmount}</td>

                                <td>{rule.severity}</td>

                                <td>

                                    {

                                        rule.active ?

                                            <span className="badge bg-success">

                ACTIVE

            </span>

                                            :

                                            <span className="badge bg-danger">

                INACTIVE

            </span>

                                    }

                                </td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleEdit(rule)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(rule.ruleId)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan="6"
                                className="text-center"
                            >
                                No Rules Found
                            </td>

                        </tr>

                    )

                }

                </tbody>

            </table>

            {
                showAddModal && (

                    <AddRuleModal

                        onRuleAdded={() => {

                            setShowAddModal(false);

                            loadRules();

                        }}

                        onClose={() => {

                            setShowAddModal(false);

                        }}

                    />

                )
            }

            <EditRuleModal
                rule={selectedRule}
                onRuleUpdated={loadRules}
            />

        </div>

    );

}

export default Rules;

