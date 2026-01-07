import React, { useEffect, useState } from 'react';


function App() {
  const version = process.env.REACT_APP_VERSION || "dev";
  const [apiVersion, setApiVersion] = useState(null);
  const [apiStatus, setApiStatus] = useState("pending");

  useEffect(() => {
    const fetchApiVersion = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/version");
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
