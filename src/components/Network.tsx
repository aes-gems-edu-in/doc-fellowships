import { useEffect, useState } from "react";
import { Alert } from "@mui/material";

const NetworkStatus = () => {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (online) return null;

  return (
    <Alert severity="error" sx={{ position: "fixed", top: 0, width: "100%", zIndex: 9999 }}>
      You are offline. Some features may not work.
    </Alert>
  );
};

export default NetworkStatus;
