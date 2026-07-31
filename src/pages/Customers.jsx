import AddCustomerModal from "./AddCustomerModal";
import { useEffect, useState } from "react";
import customerService from "../services/customerService";
import EditCustomerModal from "./EditCustomerModal";


function Customers() {


    const [customers, setCustomers] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);


    // Load Customers
    const loadCustomers = async () => {

        setLoading(true);
        setError("");

        try {

            const response = await customerService.getAllCustomers();

            setCustomers(response.data);

        } catch (error) {

            console.error(error);

            setError("Failed to load customers.");

        } finally {

            setLoading(false);

        }

    };



    useEffect(() => {

        loadCustomers();

    }, []);




    // Edit Customer
    const handleEdit = (customer) => {

        console.log("Edit Clicked :", customer);

        setSelectedCustomer(customer);

    };




    // Delete Customer
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this customer?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await customerService.deleteCustomer(id);

            alert("Customer Deleted Successfully");

            loadCustomers();

        } catch (err) {

            console.error(err);

            alert("Delete Failed");

        }

    };




    // Search Customer
    const filteredCustomers = customers.filter((customer) => {

        const text = keyword.toLowerCase();

        return (

            customer.firstName?.toLowerCase().includes(text) ||

            customer.lastName?.toLowerCase().includes(text) ||

            customer.email?.toLowerCase().includes(text) ||

            customer.phone?.toLowerCase().includes(text)

        );

    });

    if (loading) {

        return (

            <div className="text-center mt-5">

                <div className="spinner-border text-primary"></div>

                <h5 className="mt-3">
                    Loading Customers...
                </h5>

            </div>

        );

    }




    return (

        <div className="container mt-4">

            <h2 className="mb-4 text-center">
                Customers Management
            </h2>

            <div className="d-flex justify-content-between align-items-center mb-3">

                <input
                    type="text"
                    className="form-control"
                    placeholder="Search Customer..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    style={{ width: "300px" }}
                />

                <div className="d-flex gap-2">

                    <button
                        className="btn btn-success"
                        onClick={() => setShowAddModal(true)}
                    >
                        + Add Customer
                    </button>

                    <button
                        className="btn btn-primary"
                        onClick={loadCustomers}
                    >
                        Refresh
                    </button>

                </div>

            </div>

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

                    <th>First Name</th>

                    <th>Last Name</th>

                    <th>Email</th>

                    <th>Phone</th>

                    <th>Action</th>

                </tr>

                </thead>

                <tbody>

                {

                    filteredCustomers.length > 0 ? (

                        filteredCustomers.map((customer) => (

                            <tr key={customer.id}>

                                <td>{customer.id}</td>

                                <td>{customer.firstName}</td>

                                <td>{customer.lastName}</td>

                                <td>{customer.email}</td>

                                <td>{customer.phone}</td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleEdit(customer)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(customer.id)}
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

                                No Customers Found

                            </td>

                        </tr>

                    )

                }

                </tbody>

            </table>

            {

                selectedCustomer && (

                    <EditCustomerModal

                        customer={selectedCustomer}

                        onCustomerUpdated={() => {

                            setSelectedCustomer(null);

                            loadCustomers();

                        }}

                        onClose={() => {

                            setSelectedCustomer(null);

                        }}

                    />

                )
            }



            {
                showAddModal && (

                    <AddCustomerModal

                        onCustomerAdded={() => {

                            setShowAddModal(false);

                            loadCustomers();

                        }}

                        onClose={() => {

                            setShowAddModal(false);

                        }}

                    />

                )
            }


        </div>

    );

}

export default Customers;