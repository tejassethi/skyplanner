"use client";
import Link from "next/link";
import React, { useEffect } from "react";

const Step2 = ({
  onPrevStep,
  onNextStep,
  selectedID,
  selectedMajor,
  textareaContent,
}) => {
  useEffect(() => {
    console.log("Selected ID:", selectedID);
    console.log("Selected Major:", selectedMajor);
    console.log("Textarea Content:", textareaContent);
  }, []);
  return (
    <div className="flex items-center justify-center min-h-dvh bg-gray-100">
      <div className="card bg-base-100 shadow-xl mx-5 h-[480px]">
        <div className="flex-row w-full text-center">
          <ul className="steps w-full pt-4">
            <li className="step step-primary">Step 1</li>
            <li className="step step-primary">Step 2</li>
            <li className="step">Step 3</li>
            <li className="step">Step 4</li>
          </ul>
        </div>
        <div className="card-body relative">
          <div>
            <h1 className="card-title text-2xl mb-1">Title</h1>
            <p className="text-sm mb-2 text-[#5a5a5a]">
              Your id year is : {selectedID}
            </p>
            <p className="text-sm mb-2 text-[#5a5a5a]">
              Your major year is : {selectedMajor}
            </p>
            <p className="text-sm mb-2 text-[#5a5a5a]">
              Your registered courses are: {textareaContent}
            </p>
          </div>
          <div className="absolute bottom-6 right-8">
            <button onClick={onPrevStep} className="btn btn-[#E6E5E5] mr-2">
              Back
            </button>
            <button onClick={onNextStep} className="btn btn-primary">
              Next
            </button>
          </div>
        </div>
      </div>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box ">
          <h3 className="font-bold text-xl">Sample Screenshots</h3>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-primary outline-none focus:outline-none hover:outline-none">
                Close
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button></button>
        </form>
      </dialog>
    </div>
  );
};

export default Step2;
