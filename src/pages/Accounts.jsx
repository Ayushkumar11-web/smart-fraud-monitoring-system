import { useEffect, useState } from "react";
import accountService from "../services/accountService";
import customerService from "../services/customerService";
import AddAccountModal from "../components/AddAccountModal";
import EditAccountModal from "../components/EditAccountModal";

function Accounts() {

    const [accounts, setAccounts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [selectedAccount, setSelectedAccount] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        loadAccounts();
        loadCustomers();

    }, []);

    // ==========================
    // Load Accounts
    // ==========================

    const loadAccounts = async () => {

        setLoading(true);
        setError("");

        try {

            const response =
                await accountService.getAllAccounts();

            setAccounts(response.data);

        } catch (error) {

            console.error(error);

            setError("Failed to load accounts.");

        } finally {

            setLoading(false);

        }

    };

    // ==========================
    // Load Customers
    // ==========================

    const loadCustomers = async () => {

        try {

            const response =
                await customerService.getAllCustomers();

            setCustomers(response.data);

        } catch (error) {

            console.error(error);

            setError("Failed to load customers.");

        }

    };

    // ==========================
    // Search Accounts
    // ==========================

    const filteredAccounts = accounts.filter((account) => {

        const customerName = account.customer
            ? `${account.customer.firstName} ${account.customer.lastName}`
            : "";

        return (

            account.accountNumber
                .toLowerCase()
                .includes(keyword.toLowerCase())

            ||

            customerName
                .toLowerCase()
                .includes(keyword.toLowerCase())

        );

    });

    // ==========================
    // Delete Account
    // ==========================

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this account?"))
            return;

        try {

            await accountService.deleteAccount(id);

            alert("Account Deleted Successfully");

            loadAccounts();

        } catch (error) {

            console.error(error);

            alert("Delete Failed.");

        }

    };

    // ==========================
    // Edit Account
    // ==========================

    const handleEdit = (account) => {

        setSelectedAccount(account);

        setTimeout(() => {

            document
                .getElementById("editAccountButton")
                .click();

        }, 100);

    };

    // ==========================
    // Loading Spinner
    // ==========================

    if (loading) {

        return (

            <div className="text-center mt-5">

                <div
                    className="spinner-border text-primary"
                    role="status"
                >
                </div>

                <h5 className="mt-3">

                    Loading Accounts...

                </h5>

            </div>

        );

    }

    return (

        <div className="container mt-4">

            {
                error &&

                <div className="alert alert-danger">

                    {error}

                </div>
            }

            <div className="d-flex justify-content-between align-items-center mb-3">

                <h2>
                    Accounts Management
                </h2>

                <AddAccountModal
                    customers={customers}
                    onAccountAdded={loadAccounts}
                />

            </div>

            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search by Account Number or Customer Name"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />

            <table className="table table-bordered table-striped">

                <thead className="table-dark">

                <tr>

                    <th>ID</th>
                    <th>Account Number</th>
                    <th>Customer</th>
                    <th>Balance</th>
                    <th>Status</th>
                    <th width="180">Action</th>

                </tr>

                </thead>

                <tbody>

                {

                    filteredAccounts.length > 0 ? (

                        filteredAccounts.map((account) => (

                            <tr key={account.accountId}>

                                <td>

                                    {account.accountId}

                                </td>

                                <td>

                                    {account.accountNumber}

                                </td>

                                <td>

                                    {

                                        account.customer

                                            ?

                                            `${account.customer.firstName} ${account.customer.lastName}`

                                            :

                                            "-"

                                    }

                                </td>

                                <td>

                                    ₹ {account.balance}

                                </td>

                                <td>

                                        <span
                                            className={`badge ${
                                                account.status === "ACTIVE"
                                                    ? "bg-success"
                                                    : "bg-secondary"
                                            }`}
                                        >

                                            {account.status}

                                        </span>

                                </td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleEdit(account)}
                                    >

                                        Edit

                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(account.accountId)}
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

                                No Accounts Found

                            </td>

                        </tr>

                    )

                }

                </tbody>

            </table>

            <EditAccountModal
                account={selectedAccount}
                customers={customers}
                onAccountUpdated={() => {

                    setSelectedAccount(null);

                    loadAccounts();

                }}
            />

        </div>

    );

}

export default Accounts;