import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Accounts from "./pages/Accounts";
import Transactions from "./pages/Transactions";
import FraudAlerts from "./pages/FraudAlerts";
import Reports from "./pages/Reports";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/alerts" element={<FraudAlerts />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
  );
}

export default App;