import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import CreateTicket from "./pages/CreateTicket";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import ProtectedRoute from "./components/ProtectedRoute";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
function App() {
  return (
    <BrowserRouter>

    <Routes>

        <Route
            path="/"
            element={<Login />}
        />

        <Route
            path="/register"
            element={<Register />}
        />

        <Route
            path="/dashboard"
            element={
                <ProtectedRoute>
                    <>
                        <Navbar />
                        <Dashboard />
                    </>
                </ProtectedRoute>
            }
        />

        <Route
            path="/tickets"
            element={
                <ProtectedRoute>
                    <>
                        <Navbar />
                        <Tickets />
                    </>
                </ProtectedRoute>
            }
        />

        <Route
            path="/profile"
            element={
                <ProtectedRoute>
                    <>
                        <Navbar />
                        <Profile />
                    </>
                </ProtectedRoute>
            }
        />

        <Route
            path="/users"
            element={
                <ProtectedRoute>
                    <>
                        <Navbar />
                        <Users />
                    </>
                </ProtectedRoute>
            }
        />

        <Route
            path="/createticket"
            element={
                <ProtectedRoute>
                    <>
                        <Navbar />
                        <CreateTicket />
                    </>
                </ProtectedRoute>
            }
        />

    </Routes>

</BrowserRouter>
  );
}
function AppContent() {

    const location = useLocation();

    const hideNavbar =
        location.pathname === "/" ||
        location.pathname === "/register";

    return (
        <>
            {!hideNavbar && <Navbar />}

            <Routes>

                {/* All your routes stay exactly the same */}

            </Routes>
        </>
    );
}

export default App;