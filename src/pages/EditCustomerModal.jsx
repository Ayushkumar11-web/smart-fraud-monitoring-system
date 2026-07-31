import { useEffect, useState } from "react";
import customerService from "../services/customerService";

function EditCustomerModal({ customer, onCustomerUpdated, onClose }) {

    const [updatedCustomer, setUpdatedCustomer] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
    });

    useEffect(() => {
        if (customer) {
            setUpdatedCustomer({
                firstName: customer.firstName,
                lastName: customer.lastName,
                email: customer.email,
                phone: customer.phone
            });
        }
    }, [customer]);

    const handleChange = (e) => {
        setUpdatedCustomer({
            ...updatedCustomer,
            [e.target.name]: e.target.value
        });
    };

    const updateCustomer = async (e) => {
        e.preventDefault();

        if (
            !updatedCustomer.firstName ||
            !updatedCustomer.lastName ||
            !updatedCustomer.email ||
            !updatedCustomer.phone
        ) {
            alert("Please fill all fields.");
            return;
        }

        try {
            await customerService.updateCustomer(customer.id, updatedCustomer);

            alert("Customer Updated Successfully");

            onCustomerUpdated();

        } catch (error) {
            console.error(error);
            alert("Unable to update customer.");
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
                                Edit Customer
                            </h5>

                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                            ></button>
                        </div>

                        <form onSubmit={updateCustomer}>

                            <div className="modal-body">

                                <div className="mb-3">
                                    <label className="form-label">
                                        First Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="firstName"
                                        value={updatedCustomer.firstName}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Last Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="lastName"
                                        value={updatedCustomer.lastName}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={updatedCustomer.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Phone
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phone"
                                        value={updatedCustomer.phone}
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
                                    className="btn btn-warning"
                                >
                                    Update Customer
                                </button>

                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </>
    );
}

export default EditCustomerModal;