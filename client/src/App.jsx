// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider, AuthContext } from "./context/AuthContext";
// import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import Patients from "./pages/Patients";
// import Labs from "./pages/Labs";
// import Bills from "./pages/Bills";
// import Admin from "./pages/Admin";

// function ProtectedRoute({ children, roles }) {
//   const { user } = useContext(AuthContext);
//   if (!user) return <Navigate to="/login" />;
//   if (roles && !roles.includes(user.role)) return <Navigate to="/dashboard" />;
//   return children;
// }

// export default function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Navbar />
//         <div className="flex">
//           <Sidebar />
//           <main className="flex-1 p-4">
//             <Routes>
//               <Route path="/login" element={<Login />} />
//               <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//               <Route path="/patients" element={<ProtectedRoute roles={["RECEPTION","ADMIN"]}><Patients /></ProtectedRoute>} />
//               <Route path="/labs" element={<ProtectedRoute roles={["LAB","ADMIN"]}><Labs /></ProtectedRoute>} />
//               <Route path="/bills" element={<ProtectedRoute roles={["RECEPTION","ADMIN"]}><Bills /></ProtectedRoute>} />
//               <Route path="/admin" element={<ProtectedRoute roles={["ADMIN"]}><Admin /></ProtectedRoute>} />
//             </Routes>
//           </main>
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }



import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Labs from "./pages/Labs";
import Bills from "./pages/Bills";
import Admin from "./pages/Admin";

// Protected Route wrapper
function ProtectedRoute({ children, roles }) {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/dashboard" replace />;

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 p-4">
            <Routes>
              {/* Root redirects to dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              {/* Public route */}
              <Route path="/login" element={<Login />} />

              {/* Protected routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/patients"
                element={
                  <ProtectedRoute roles={["RECEPTION", "ADMIN"]}>
                    <Patients />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/labs"
                element={
                  <ProtectedRoute roles={["LAB", "ADMIN"]}>
                    <Labs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/bills"
                element={
                  <ProtectedRoute roles={["RECEPTION", "ADMIN"]}>
                    <Bills />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute roles={["ADMIN"]}>
                    <Admin />
                  </ProtectedRoute>
                }
              />

              {/* 404 fallback */}
              <Route path="*" element={<h2 className="text-center text-red-500 mt-10">404 - Page Not Found</h2>} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}
