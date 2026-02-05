import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo ">
  <img 
    src="../../Logo.png"
    alt="UserHub Logo"
    className="img-fluid bg-transparent"
    style={{ height: "50px" }}
  />
</div>

      <div className="links">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/staff">staff</NavLink>        
      </div>
    </nav>
  );
}