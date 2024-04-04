"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Tesseract from "tesseract.js";
import image1 from "../../images/IMG_6500.PNG";
import image2 from "../../images/IMG_6501.PNG";
import image3 from "../../images/IMG_6502.PNG";
import { FiInfo } from "react-icons/fi";
import { IconContext } from "react-icons";

const Step1 = ({
  onNextStep,
  setSelectedID,
  setSelectedMajor,
  setTextareaContent,
  selectedID,
  selectedMajor,
  textareaContent,
}) => {
  const [inputKey, setInputKey] = useState(Date.now());
  const [isProcessing, setIsProcessing] = useState(false);
  const [jobProgress, setJobProgress] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const isFormValid = () => {
    if (!selectedID || !selectedMajor) {
      setErrorMessage("Please select your ID and major.");
      return false;
    }
    if (!textareaContent) {
      setErrorMessage("Please upload images or enter completed courses.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleClear = () => {
    setTextareaContent("");
    setInputKey(Date.now());
    setJobProgress({});
  };

  useEffect(() => {
    console.log(jobProgress);
  }, [jobProgress]);

  const modalRef = useRef(null);
  const showModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const handleImageUpload = async (event) => {
    setIsProcessing(true);
    const files = event.target.files;
    const newTexts = [];
    let currentProgress = 0;
    const progressPromises = Array.from(files).map((file) =>
      Tesseract.recognize(file, "eng", {
        logger: (m) => {
          if (m.status === "recognizing text") {
            if (m.progress > currentProgress) {
              currentProgress = m.progress;
              setJobProgress(Math.round(currentProgress * 100));
            }
          }
        },
      })
        .then((result) => {
          console.log(result.data.text);
          const matches = result.data.text.match(/\b[A-Z]{4}\d{3,4}\b/g);
          if (matches) {
            matches.forEach((match) => {
              if (!newTexts.includes(match)) {
                newTexts.push(match);
              }
            });
          }
        })
        .catch((error) => {
          console.error("Error recognizing file:", error);
        })
    );

    await Promise.all(progressPromises);

    setTextareaContent(newTexts.join(", "));
    setIsProcessing(false);
    setJobProgress(0);
  };

  const handleTextareaChange = (event) => {
    setTextareaContent(event.target.value);
  };

  return (
    <div className="flex items-center justify-center min-h-dvh bg-gray-100">
      {errorMessage && (
        <div
          role="alert"
          className="alert alert-error absolute z-50 top-5 right-5 w-max"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error! Please {errorMessage}</span>
        </div>
      )}
      <div className="card bg-base-100 shadow-xl m-5">
        <div className="card-body relative">
          <div className="flex-row w-full text-center pb-4">
            <ul className="steps w-full">
              <li className="step step-primary">Step 1</li>
              <li className="step">Step 2</li>
              <li className="step">Step 3</li>
            </ul>
          </div>
          <div>
            <div className="flex place-items-center space-x-2">
              <h1 className="card-title text-2xl mb-1">Input Details</h1>
            </div>
            <p className="text-sm mb-2 text-[#5a5a5a]">
              Select your ID and major.
            </p>
            <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
              <select
                className="select select-primary w-full max-w-xs focus:outline-none"
                onChange={(e) => setSelectedID(e.target.value)}
                value={selectedID}
              >
                <option disabled selected>
                  Your ID starts with..
                </option>
                <option value={66}>66xxxxx</option>
                <option value={65}>65xxxxx</option>
                <option value={64}>64xxxxx</option>
                <option value={63}>63xxxxx</option>
                <option value={62}>62xxxxx</option>
              </select>
              <select
                className="select select-primary w-full max-w-xs focus:outline-none"
                onChange={(e) => setSelectedMajor(e.target.value)}
                value={selectedMajor}
              >
                <option disabled selected>
                  Your MUIC Major
                </option>
                <option value={"Computer Science"}>Computer Science</option>
                <option value={"Computer Engineering"}>
                  Computer Engineering
                </option>
              </select>
            </div>
          </div>
          <div>
            <div className="flex place-items-center space-x-2 pt-2">
              <h1 className="card-title text-2xl mb-1">Input Images </h1>
              <div className="cursor-pointer" onClick={showModal}>
                <IconContext.Provider value={{ color: "#949494" }}>
                  <FiInfo size={22} />
                </IconContext.Provider>
              </div>
            </div>
            <p className="text-sm mb-2 text-[#5a5a5a]">
              Automatically upload your completed course records by simply
              sharing screenshots from the grade list section of your Sky App.
            </p>
            <input
              type="file"
              accept="image/*"
              key={inputKey}
              multiple
              className="file-input file-input-bordered w-full max-w-xs mb-2 focus:outline-none"
              onChange={handleImageUpload}
            />
            {textareaContent !== "" && (
              <button className="ml-2 btn btn-[#E6E5E5]" onClick={handleClear}>
                Clear
              </button>
            )}
            {isProcessing ? (
              <div className="w-full h-[160px]">
                <progress
                  className="progress w-full"
                  value={jobProgress}
                  max="100"
                ></progress>
              </div>
            ) : (
              <div className="h-40">
                <textarea
                  className="textarea textarea-bordered w-full h-[160px] text-[16px] focus:outline-none"
                  placeholder="Your completed courses. Ex. ICPY101, ICGC102, ICGS105 .."
                  value={textareaContent}
                  onChange={handleTextareaChange}
                ></textarea>
              </div>
            )}
          </div>
          <div className="w-full text-right">
            <button className="btn btn-primary" onClick={onNextStep}>
              Next
            </button>
          </div>
        </div>
      </div>
      <dialog id="my_modal_2" className="modal" ref={modalRef}>
        <div className="modal-box ">
          <h3 className="font-bold text-xl">Sample Screenshots</h3>
          <div>
            <div className="flex overflow-scroll">
              <Image
                src={image1}
                width={200}
                height={433}
                alt="image 1"
                style={{ width: "auto", height: "auto" }}
              />
              <Image
                src={image2}
                width={200}
                height={433}
                alt="image 2"
                style={{ width: "auto", height: "auto" }}
              />
              <Image
                src={image3}
                width={200}
                height={433}
                alt="image 3"
                style={{ width: "auto", height: "auto" }}
              />
            </div>
          </div>
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

export default Step1;
