import { useEffect, useState } from "react";
import ruleService from "../services/ruleService";

function EditRuleModal({ rule, onRuleUpdated }) {

    const [updatedRule, setUpdatedRule] = useState({
        ruleName: "",
        thresholdAmount: "",
        severity: "",
        active: true
    });

    useEffect(() => {

        if (rule) {

            setUpdatedRule(rule);

        }

    }, [rule]);

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setUpdatedRule({
            ...updatedRule,
            [name]: type === "checkbox" ? checked : value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await ruleService.updateRule(
                updatedRule.ruleId,
                updatedRule
            );

            alert("Rule Updated Successfully");

            document.getElementById("closeEditRuleModal").click();

            onRuleUpdated();

        } catch (error) {

            console.error(error);

            alert("Update Failed");

        }

    };

    return (

        <>

            <button
                id="editRuleButton"
                className="d-none"
                data-bs-toggle="modal"
                data-bs-target="#editRuleModal"
            >
                Open
            </button>

            <div
                className="modal fade"
                id="editRuleModal"
                tabIndex="-1"
            >

                <div className="modal-dialog">

                    <div className="modal-content">

                        <form onSubmit={handleSubmit}>

                            <div className="modal-header">

                                <h5>Edit Rule</h5>

                                <button
                                    id="closeEditRuleModal"
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                ></button>

                            </div>

                            <div className="modal-body">

                                <input
                                    className="form-control mb-3"
                                    name="ruleName"
                                    value={updatedRule.ruleName}
                                    onChange={handleChange}
                                    placeholder="Rule Name"
                                    required
                                />

                                <input
                                    className="form-control mb-3"
                                    type="number"
                                    name="thresholdAmount"
                                    value={updatedRule.thresholdAmount}
                                    onChange={handleChange}
                                    placeholder="Threshold Amount"
                                    required
                                />

                                <select
                                    className="form-control mb-3"
                                    name="severity"
                                    value={updatedRule.severity}
                                    onChange={handleChange}
                                >

                                    <option value="LOW">LOW</option>
                                    <option value="MEDIUM">MEDIUM</option>
                                    <option value="HIGH">HIGH</option>

                                </select>

                                <div className="form-check">

                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="active"
                                        checked={updatedRule.active}
                                        onChange={handleChange}
                                    />

                                    <label className="form-check-label">

                                        Active

                                    </label>

                                </div>

                            </div>

                            <div className="modal-footer">

                                <button
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    type="button"
                                >
                                    Cancel
                                </button>

                                <button
                                    className="btn btn-primary"
                                    type="submit"
                                >
                                    Update
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </>

    );

}

export default EditRuleModal;