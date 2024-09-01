import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://rixilniwczuwtckakqjf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpeGlsbml3Y3p1d3Rja2FrcWpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUxMjc3ODgsImV4cCI6MjA0MDcwMzc4OH0.lqR10NF_sLPjHuyEOOyu6Yw4Vmjr_w-uT9ikRQ-gBZc"
);

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate();

 

  useEffect(() => {

      const checkUser = async () => {
        const user = await supabase.auth.getUser();
        if(user.data.user == null){
          setIsAuthenticated(false);
          navigate("/login")
        }
        else{
          setIsAuthenticated(true)
        }
      };
      checkUser();

  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
