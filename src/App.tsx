import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<div>Login</div>} />
      <Route path="/dashboard" element={<div>Dashboard</div>} />
    </Routes>
  );
}

export default App;
