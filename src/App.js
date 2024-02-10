import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import ProductsList from "./components/ProductsList";
import Dashboard from "./components/Dashboard";
import { UserAuth } from "./context/AuthContext";

function App() {
  const { user } = UserAuth();
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/products" element={<ProductsList />}></Route>
    </Routes>
  );
}


export default App;
