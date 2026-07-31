import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Accounts from "./pages/Accounts";
import Transactions from "./pages/Transactions";
import FraudAlerts from "./pages/FraudAlerts";
import Reports from "./pages/Reports";
import Rules from "./pages/Rules";

function App() {

    return (

        <Routes>

            {/* Login */}
            <Route
                path="/"
                element={<Login />}
            />

            {/* Dashboard */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Layout>
                            <Dashboard />
                        </Layout>
                    </ProtectedRoute>
                }
            />

            {/* Customers */}
            <Route
                path="/customers"
                element={
                    <ProtectedRoute>
                        <Layout>
                            <Customers />
                        </Layout>
                    </ProtectedRoute>
                }
            />

            {/* Accounts */}
            <Route
                path="/accounts"
                element={
                    <ProtectedRoute>
                        <Layout>
                            <Accounts />
                        </Layout>
                    </ProtectedRoute>
                }
            />

            {/* Transactions */}
            <Route
                path="/transactions"
                element={
                    <ProtectedRoute>
                        <Layout>
                            <Transactions />
                        </Layout>
                    </ProtectedRoute>
                }
            />

            {/* Fraud Alerts */}
            <Route
                path="/alerts"
                element={
                    <ProtectedRoute>
                        <Layout>
                            <FraudAlerts />
                        </Layout>
                    </ProtectedRoute>
                }
            />

            {/* Rules */}
            <Route
                path="/rules"
                element={
                    <ProtectedRoute>
                        <Layout>
                            <Rules />
                        </Layout>
                    </ProtectedRoute>
                }
            />

            {/* Reports */}
            <Route
                path="/reports"
                element={
                    <ProtectedRoute>
                        <Layout>
                            <Reports />
                        </Layout>
                    </ProtectedRoute>
                }
            />

        </Routes>

    );

}

export default App;