import { BrowserRouter, Routes, Route } from "react-router";

import AdminLayout from "./layouts/AdminLayout";
import { ItemDatalist } from "./components/ItemSelect";

import Dev from "./pages/Test/Dev";
import Login from "./pages/Settings/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Buy from "./pages/Lab/Buy";
import BCS from "./pages/Lab/BCS";
import Sell from "./pages/Lab/Sell";

// import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <BrowserRouter>
      <AdminLayout>
        <ItemDatalist />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/bcs" element={<BCS />} />
        </Routes>
      </AdminLayout>
    </BrowserRouter>
  );
}

export default App;
