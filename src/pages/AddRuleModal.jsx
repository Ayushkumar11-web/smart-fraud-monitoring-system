import { useState } from "react";
import ruleService from "../services/ruleService";

function AddRuleModal({ onRuleAdded, onClose }) {

    const [rule, setRule] = useState({
        ruleName: "",
        thresholdAmount: "",
        severity: "",
        active: true
    });

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setRule({
            ...rule,
            [name]: type === "checkbox" ? checked : value
        });

    };

    const saveRule = async (e) => {

        e.preventDefault();

        if (
            !rule.ruleName ||
            !rule.thresholdAmount ||
            !rule.severity
        ) {
            alert("Please fill all fields.");
            return;
        }

        try {

            await ruleService.addRule(rule);

            alert("Rule Added Successfully");

            onRuleAdded();

        } catch (error) {

            console.error(error);

            alert("Unable to add rule.");

        }

    };

    return (

        <div
            className="modal fade show"
            style={{
                display: "block",
                backgroundColor: "rgba(0,0,0,0.5)"
            }}
        >

            <div className="modal-dialog">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5 className="modal-title">
                            Add Rule
                        </h5>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        ></button>

                    </div>

                    <form onSubmit={saveRule}>

                        <div className="modal-body">

                            <div className="mb-3">

                                <label className="form-label">
                                    Rule Name
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="ruleName"
                                    value={rule.ruleName}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Threshold Amount
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="thresholdAmount"
                                    value={rule.thresholdAmount}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Severity
                                </label>

                                <select
                                    className="form-select"
                                    name="severity"
                                    value={rule.severity}
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Select Severity
                                    </option>

                                    <option value="LOW">
                                        LOW
                                    </option>

                                    <option value="MEDIUM">
                                        MEDIUM
                                    </option>

                                    <option value="HIGH">
                                        HIGH
                                    </option>

                                </select>

                            </div>

                            <div className="form-check">

                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="active"
                                    checked={rule.active}
                                    onChange={handleChange}
                                />

                                <label className="form-check-label">
                                    Active Rule
                                </label>

                            </div>

                        </div>

                        <div className="modal-footer">

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={onClose}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="btn btn-success"
                            >
                                Save Rule
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default AddRuleModal;