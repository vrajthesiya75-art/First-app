import { Link } from "react-router-dom";

export default function UserList({ users }) {
  return (
    <div className="user-list">
      <h1>All Users</h1>

      {users.length === 0 ? (
        <p>No users yet. Add someone from Home page!</p>
      ) : (
        <div className="table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>City</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td data-label="ID">{user.id}</td>
                  <td data-label="Name">{user.name}</td>
                  <td data-label="Email">{user.email}</td>
                  <td data-label="Age">{user.age}</td>
                  <td data-label="City">{user.city}</td>
                  <td data-label="Role">{user.role}</td>
                  <td data-label="Action">
                    <Link to={`/users/${user.id}`} className="btn-view">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}