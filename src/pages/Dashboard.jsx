import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Dashboard() {
    return (
        <>
            <Navbar />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <h2>Dashboard</h2>

                    <p>Welcome Admin</p>

                </div>

            </div>
        </>
    );
}

export default Dashboard;