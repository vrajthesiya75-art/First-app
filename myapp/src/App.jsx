import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotFound from "./components/404NotFound";
import StaffList from "./components/StaffList";
import NewStaffForm from "./components/NewStaffForm";

import Home from "./pages/Home";
import UserList from "./pages/UserList";
import UserDetail from "./pages/UserDetail";

import { mockUsers } from "./data/mockUsers"; // still import initial data

import "./index.css";

function App() {
  const [users, setUsers] = useState(mockUsers); // ← shared state here!

  return (
    <div className="app">
      <Navbar />

      <main className="container">
        <Routes>
          <Route
            path="/"
            element={<Home users={users} setUsers={setUsers} />}
          />
          <Route
            path="/users"
            element={<UserList users={users} setUsers={setUsers} />} // pass to list too (optional)
          />
          <Route
            path="/users/:id"
            element={<UserDetail users={users} />} // pass for detail page
          />
          <Route 
            path="/staff" 
            element={<StaffList />} 
          />
          <Route 
            path="/new-staff" 
            element={<NewStaffForm />} 
          />
          <Route 
            path="/edit-staff/:id" 
            element={<NewStaffForm isEdit />} 
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;