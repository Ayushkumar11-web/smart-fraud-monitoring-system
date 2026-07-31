import { useState } from "react";
import transactionService from "../services/transactionService";

function AddTransactionModal({ onTransactionAdded, onClose }) {

    const [transaction, setTransaction] = useState({
        accountId: "",
        amount: "",
        transactionType: "",
        location: ""
    });

    const handleChange = (e) => {

        setTransaction({
            ...transaction,
            [e.target.name]: e.target.value
        });

    };

    const saveTransaction = async (e) => {

        e.preventDefault();

        if (
            !transaction.accountId ||
            !transaction.amount ||
            !transaction.transactionType ||
            !transaction.location
        ) {

            alert("Please fill all fields.");
            return;

        }

        try {

            await transactionService.addTransaction(transaction);

            alert("Transaction Added Successfully");

            onTransactionAdded();

        } catch (error) {

            console.error(error);

            alert("Unable to add transaction.");

        }

    };

    return (
        <>
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
                                Add Transaction
                            </h5>

                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                            ></button>

                        </div>

                        <form onSubmit={saveTransaction}>

                            <div className="modal-body">

                                <div className="mb-3">

                                    <label className="form-label">
                                        Account ID
                                    </label>

                                    <input
                                        type="number"
                                        step="0.01"
                                        className="form-control"
                                        name="amount"
                                        value={transaction.amount}
                                        onChange={handleChange}
                                        placeholder="Enter Amount"
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Amount
                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        name="amount"
                                        value={transaction.amount}
                                        onChange={handleChange}
                                        placeholder="Enter Amount"
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Transaction Type
                                    </label>

                                    <select
                                        className="form-select"
                                        name="transactionType"
                                        value={transaction.transactionType}
                                        onChange={handleChange}
                                    >

                                        <option value="">
                                            Select Type
                                        </option>

                                        <option value="DEPOSIT">
                                            DEPOSIT
                                        </option>

                                        <option value="WITHDRAW">
                                            WITHDRAW
                                        </option>

                                        <option value="TRANSFER">
                                            TRANSFER
                                        </option>

                                    </select>

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Location
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="location"
                                        value={transaction.location}
                                        onChange={handleChange}
                                        placeholder="Enter Location"
                                    />

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
                                    Save Transaction
                                </button>

                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </>
    );

}

export default AddTransactionModal;