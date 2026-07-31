import { Link } from "react-router-dom";

function Sidebar() {

    return (

        <div
            className="bg-dark text-white p-3"
            style={{
                width: "240px",
                minHeight: "calc(100vh - 56px)",
                flexShrink: 0
            }}
        >

            <h4 className="text-center mb-4">
                Admin Panel
            </h4>

            <ul className="nav flex-column">

                <li className="nav-item mb-2">
                    <Link className="nav-link text-white" to="/dashboard">
                        <i className="bi bi-speedometer2 me-2"></i>
                        Dashboard
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link className="nav-link text-white" to="/customers">
                        <i className="bi bi-people-fill me-2"></i>
                        Customers
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link className="nav-link text-white" to="/accounts">
                        <i className="bi bi-bank me-2"></i>
                        Accounts
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link className="nav-link text-white" to="/transactions">
                        <i className="bi bi-cash-stack me-2"></i>
                        Transactions
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link className="nav-link text-white" to="/rules">
                        <i className="bi bi-sliders me-2"></i>
                        Rules
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link className="nav-link text-white" to="/alerts">
                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                        Fraud Alerts
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link className="nav-link text-white" to="/reports">
                        <i className="bi bi-bar-chart-fill me-2"></i>
                        Reports
                    </Link>
                </li>

            </ul>

        </div>

    );

}

export default Sidebar;