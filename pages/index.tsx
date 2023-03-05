import Onboarding from "../components/Onboarding";
import { useState, useEffect } from "react";
export default function Home() {
  const [onboardStatus, setStatus] = useState(false);

  useEffect(() => {
    const apiKeyValue = localStorage.getItem("octoAPI");
    if (apiKeyValue) {
      return setStatus(true);
    } else {
      return setStatus(false);
    }
  }, []);
  return <Onboarding />;
}
