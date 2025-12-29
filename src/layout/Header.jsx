import { getUser } from "../services/auth";

export default function Header() {
  const user = getUser();

  return (
    <div className="header">
      <div className="header-inner">
        <div className="header-left">
          <h2 className="app-title">Banking System</h2>
        </div>

        <div className="header-right">
          <div className="profile-box">
            <span className="username">{user.userName}</span>
            <span className="avatar">{user?.userName?.charAt(0) || "?"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
