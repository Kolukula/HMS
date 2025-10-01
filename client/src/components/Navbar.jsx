import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, setAuthToken, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Clear context state
    setAuthToken(null);
    setUser(null);
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">Hospital Management</h1>
      {user && (
        <div>
          <span>{user.name} ({user.role})</span>
          <button
            className="ml-4 bg-red-500 px-2 py-1 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
