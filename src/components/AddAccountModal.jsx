import { useState } from "react";
import accountService from "../services/accountService";

function AddAccountModal({ customers, onAccountAdded }) {

    const [account, setAccount] = useState({
        customerId: "",
        accountNumber: "",
        balance: "",
        status: "ACTIVE"
    });

    const handleChange = (e) => {

        setAccount({
            ...account,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await accountService.addAccount(account);

            alert("Account Added Successfully");

            setAccount({
                customerId: "",
                accountNumber: "",
                balance: "",
                status: "ACTIVE"
            });

            onAccountAdded();

            document.getElementById("closeAccountModal").click();

        } catch (error) {

            console.error(error);

            alert("Failed to add account.");

        }

    };

    return (

        <>

            <button
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#addAccountModal"
            >
                Add Account
            </button>

            <div
                className="modal fade"
                id="addAccountModal"
                tabIndex="-1"
            >

                <div className="modal-dialog">

                    <div className="modal-content">

                        <div className="modal-header">

                            <h5 className="modal-title">
                                Add Account
                            </h5>

                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>

                        </div>

                        <form onSubmit={handleSubmit}>

                            <div className="modal-body">

                                <select
                                    className="form-select mb-3"
                                    name="customerId"
                                    value={account.customerId}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select Customer
                                    </option>

                                    {

                                        customers.map(customer => (

                                            <option
                                                key={customer.customerId}
                                                value={customer.customerId}
                                            >

                                                {customer.firstName} {customer.lastName}

                                            </option>

                                        ))

                                    }

                                </select>

                                <input
                                    type="text"
                                    className="form-control mb-3"
                                    placeholder="Account Number"
                                    name="accountNumber"
                                    value={account.accountNumber}
                                    onChange={handleChange}
                                    required
                                />

                                <input
                                    type="number"
                                    className="form-control mb-3"
                                    placeholder="Balance"
                                    name="balance"
                                    value={account.balance}
                                    onChange={handleChange}
                                    required
                                />

                                <select
                                    className="form-select"
                                    name="status"
                                    value={account.status}
                                    onChange={handleChange}
                                >

                                    <option value="ACTIVE">
                                        ACTIVE
                                    </option>

                                    <option value="INACTIVE">
                                        INACTIVE
                                    </option>

                                </select>

                            </div>

                            <div className="modal-footer">

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    id="closeAccountModal"
                                >
                                    Close
                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Save
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </>

    );

}

export default AddAccountModal;