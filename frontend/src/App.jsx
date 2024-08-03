import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import FormPage from "./pages/FormPage";
import { useAuth } from "./utils/AuthProvider";

function App() {
  const { user } = useAuth();

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user ? <HomePage /> : <Navigate to="/signup" />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <FormPage />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <FormPage />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
