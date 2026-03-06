

import React, { useState } from "react";
import LandingPage from "./LandingPage";
import PlantDiseaseDetector from "./PlantDiseaseDetector";

function App() {
  const [showApp, setShowApp] = useState(false);

  return showApp ? (
    <PlantDiseaseDetector />
  ) : (
    <LandingPage onGetStarted={() => setShowApp(true)} />
  );
}

export default App;