import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import styles from "./PageNav.module.css";
import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);



function PageNav() {
  const [user, setUser] = useState(null);

  const userSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    setUser(null)
  };
  useEffect(() => {
    if (user == null) {
      const checkUser = async () => {
        const user = await supabase.auth.getUser();
        console.log(user.data.user);
        setUser(user.data.user);
      };
      checkUser();
    }
  }, [user]);
  return (
    <nav className={styles.nav}>
      <Logo />

      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          {user ? (
            <NavLink onClick={() => userSignOut()} to="/">
              Sign Out
            </NavLink>
          ) : (
            <NavLink to="/login">Sign In</NavLink>
          )}
        </li>
        <li>
        <NavLink to="/signup">Sign Up</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
