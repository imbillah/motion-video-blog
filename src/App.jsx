import { Route, Routes, useNavigate } from "react-router-dom";
import { Home, Login } from "./components";
import { useEffect } from "react";
import userStore from "./store/userStore";
function App() {
  const { user } = userStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    } else return;
  }, [user]);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
}

export default App;
