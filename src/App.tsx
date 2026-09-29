import { MouseEvent } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MainLayout from "./layouts/MainLayout";
import Home from "./screens/Home";
import ScrollToTop from "./utils/ScrollToTop";
import LenisSmoothScroll from "./components/LenisSmoothScroll";

function App() {
  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
  };

  return (
    <div onContextMenu={handleContextMenu}>
      <Router>
        <LenisSmoothScroll />
        <ScrollToTop />
        <Toaster
          position="top-center"
          toastOptions={{ style: { zIndex: 9999, fontSize: 15 } }}
        />
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
