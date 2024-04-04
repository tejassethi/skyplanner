"use client";
import React, { useEffect, useRef, useState } from "react";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";

const Home = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedID, setSelectedID] = useState(0);
  const [selectedMajor, setSelectedMajor] = useState("");
  const [textareaContent, setTextareaContent] = useState("");

  return (
    <div className="flex items-center justify-center min-h-dvh bg-gray-100">
      {currentStep === 1 && (
        <Step1
          onNextStep={() => setCurrentStep(2)}
          setSelectedID={setSelectedID}
          setSelectedMajor={setSelectedMajor}
          setTextareaContent={setTextareaContent}
          selectedID={selectedID}
          selectedMajor={selectedMajor}
          textareaContent={textareaContent}
        />
      )}
      {currentStep === 2 && (
        <Step2
          onPrevStep={() => setCurrentStep(1)}
          onNextStep={() => setCurrentStep(3)}
          selectedID={selectedID}
          selectedMajor={selectedMajor}
          textareaContent={textareaContent}
        />
      )}
    </div>
  );
};

export default Home;
