import Onboarding from "../components/Onboarding";
import { useState, useEffect } from "react";
export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiKeyValue = JSON.parse(localStorage.getItem("octoAPI"));
    if (apiKeyValue) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, []);
  return <Onboarding />;
}
