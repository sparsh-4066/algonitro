import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import LeetcodeDashboard from "./pages/LeetcodeDashboard";
import CodeforcesDashboard from "./pages/CodeforcesDashboard";
import CodechefDashboard from "./pages/CodechefDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

    <Router>

      <Routes>

        {/* Default Route */}
        <Route path="/" element={<Login />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leetcode"
          element={
            <ProtectedRoute>
              <LeetcodeDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/codeforces"
          element={
            <ProtectedRoute>
              <CodeforcesDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/codechef"
          element={
            <ProtectedRoute>
              <CodechefDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>

    </Router>

  );
}

export default App;