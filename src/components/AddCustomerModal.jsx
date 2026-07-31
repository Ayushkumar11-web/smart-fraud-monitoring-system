import { useState } from "react";
import customerService from "../services/customerService";

function AddCustomerModal({ onCustomerAdded, onClose }) {

    const [customer, setCustomer] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
    });

    const handleChange = (e) => {
        setCustomer({
            ...customer,
            [e.target.name]: e.target.value
        });
    };

    const saveCustomer = async (e) => {
        e.preventDefault();

        if (
            !customer.firstName ||
            !customer.lastName ||
            !customer.email ||
            !customer.phone
        ) {
            alert("Please fill all fields.");
            return;
        }

        try {
            await customerService.addCustomer(customer);
            alert("Customer Added Successfully");
            onCustomerAdded();
        } catch (error) {
            console.error(error);
            alert("Unable to add customer.");
        }
    };

    return (
        <>
            <div
                className="modal fade show"
                style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
            >
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">Add Customer</h5>

                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                            ></button>
                        </div>

                        <form onSubmit={saveCustomer}>

                            <div className="modal-body">

                                <div className="mb-3">
                                    <label className="form-label">First Name</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="firstName"
                                        value={customer.firstName}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Last Name</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="lastName"
                                        value={customer.lastName}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Email</label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={customer.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Phone</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phone"
                                        value={customer.phone}
                                        onChange={handleChange}
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
                                    className="btn btn-primary"
                                >
                                    Save Customer
                                </button>

                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </>
    );
}

export default AddCustomerModal;