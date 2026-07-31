import { useEffect, useState } from "react";
import accountService from "../services/accountService";

function EditAccountModal({ account, customers, onAccountUpdated }) {

    const [updatedAccount, setUpdatedAccount] = useState({
        customer: {
            customerId: ""
        },
        accountNumber: "",
        balance: "",
        status: ""
    });

    useEffect(() => {

        if (account) {

            setUpdatedAccount({
                customer: {
                    customerId: account.customer?.customerId || ""
                },
                accountNumber: account.accountNumber,
                balance: account.balance,
                status: account.status
            });

        }

    }, [account]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        if (name === "customerId") {

            setUpdatedAccount({
                ...updatedAccount,
                customer: {
                    customerId: value
                }
            });

        } else {

            setUpdatedAccount({
                ...updatedAccount,
                [name]: value
            });

        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await accountService.updateAccount(
                account.accountId,
                updatedAccount
            );

            alert("Account Updated Successfully");

            document.getElementById("closeEditAccount").click();

            onAccountUpdated();

        } catch (error) {

            console.error(error);

            alert("Update Failed");

        }

    };

    if (!account) return null;

    return (
        <>
            <button
                hidden
                id="editAccountButton"
                data-bs-toggle="modal"
                data-bs-target="#editAccountModal"
            >
            </button>

            <div className="modal fade" id="editAccountModal">

                <div className="modal-dialog">

                    <div className="modal-content">

                        <form onSubmit={handleSubmit}>

                            <div className="modal-header">

                                <h5>Edit Account</h5>

                                <button
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                >
                                </button>

                            </div>

                            <div className="modal-body">

                                <select
                                    className="form-select mb-3"
                                    name="customerId"
                                    value={updatedAccount.customer.customerId}
                                    onChange={handleChange}
                                >

                                    <option value="">Select Customer</option>

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
                                    className="form-control mb-3"
                                    name="accountNumber"
                                    value={updatedAccount.accountNumber}
                                    onChange={handleChange}
                                />

                                <input
                                    className="form-control mb-3"
                                    type="number"
                                    name="balance"
                                    value={updatedAccount.balance}
                                    onChange={handleChange}
                                />

                                <select
                                    className="form-select"
                                    name="status"
                                    value={updatedAccount.status}
                                    onChange={handleChange}
                                >

                                    <option value="ACTIVE">ACTIVE</option>
                                    <option value="BLOCKED">BLOCKED</option>

                                </select>

                            </div>

                            <div className="modal-footer">

                                <button
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    id="closeEditAccount"
                                    type="button"
                                >
                                    Close
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

export default EditAccountModal;