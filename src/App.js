import React, { useEffect, useState } from 'react';


function App() {
  const version = process.env.REACT_APP_VERSION || "dev";
  const [apiVersion, setApiVersion] = useState(null);
  const [apiStatus, setApiStatus] = useState("pending");

  useEffect(() => {
    const fetchApiVersion = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";
        const response = await fetch(`${apiUrl}/version`);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        setApiVersion(data.version);
        setApiStatus("ok");
      } catch (error) {
        setApiStatus("error");
      }
    };

    fetchApiVersion();
  }, []);

  return (
    <div>
      <h1>Hello from React Frontend!</h1>
      <p>Frontend Version: {version}</p>
      <p>API Status: {apiStatus}</p>
      {apiVersion && <p>API Version: {apiVersion}</p>}
    </div>
  );
}

export default App;
