import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import styles from "./User.module.css";

function User() {
  const { user, signout } = useAuth();
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    signout();
    navigate("/");
  }

  if (!user) return;

  return (
    <div className={styles.user}>
      <span>Welcome, {user.name} 😊</span>
      <button onClick={(e) => handleClick(e)}>Sign-out</button>
    </div>
  );
}

export default User;

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/
