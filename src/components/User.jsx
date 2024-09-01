import { useNavigate } from "react-router-dom";
import styles from "./User.module.css";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const userSignOut = async () => {
  const { error } = await supabase.auth.signOut();
};
function User() {
  const navigate = useNavigate();

  function handleClick() {
    userSignOut();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <span>Welcome, User 😊</span>
      <button onClick={handleClick}>Logout</button>
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
