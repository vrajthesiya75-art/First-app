import { useParams, useNavigate } from "react-router-dom";
import NotFound from "../components/404NotFound";

export default function UserDetail({ users }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = users.find((u) => u.id === Number(id ));

  if (!user) {
    return <div className="loading">
      <NotFound/>
    </div>;
  }

  return (
    <div className="user-detail">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back to list
      </button>

      <div className="detail-card">
        <h1>{user.name}</h1>
        <div className="info">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>City:</strong> {user.city}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      </div>
    </div>
  );
}