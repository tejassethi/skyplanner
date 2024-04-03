"use client";
import Image from "next/image";
import React, { useState } from "react";
import Tesseract from "tesseract.js";
import image1 from "./IMG_6500.PNG";
import image2 from "./IMG_6501.PNG";
import image3 from "./IMG_6502.PNG";
import { FiInfo } from "react-icons/fi";
import { IconContext } from "react-icons";

const Home = () => {
  const [inputKey, setInputKey] = useState(Date.now());
  const [textareaContent, setTextareaContent] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [jobProgress, setJobProgress] = useState({}); // Changed to track progress of each job

  const handleClear = () => {
    setTextareaContent("");
    setInputKey(Date.now());
    setJobProgress({});
  };

  const handleImageUpload = async (event) => {
    setIsProcessing(true);
    const files = event.target.files;
    const newTexts = [];
    let jobUpdates = {}; // Temporary object to hold job progress updates

    const progressPromises = Array.from(files).map((file) =>
      Tesseract.recognize(file, "eng", {
        logger: (m) => {
          if (m.status === "recognizing text") {
            // Update the job progress in the temporary object
            jobUpdates[m.jobId] = Math.round(m.progress * 100);
            // Update the state with the latest job progress
            setJobProgress((prevProgress) => ({
              ...prevProgress,
              ...jobUpdates,
            }));
            console.log(jobProgress);
          }
        },
      })
        .then((result) => {
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
  };

  const handleTextareaChange = (event) => {
    setTextareaContent(event.target.value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="card bg-base-100 shadow-xl mx-5 lg:w-max ">
        <div className="flex-row w-full text-center pt-5">
          <ul className="steps w-full">
            <li className="step step-primary">Step 1</li>
            <li className="step">Step 2</li>
            <li className="step">Step 3</li>
            <li className="step">Step 4</li>
          </ul>
        </div>
        <div className="card-body pt-4">
          <div>
            <div className="flex place-items-center space-x-2">
              <h1 className="card-title text-2xl mb-1">Input Images </h1>
              <div
                className=" cursor-pointer"
                onClick={() =>
                  document.getElementById("my_modal_2").showModal()
                }
              >
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
              className="file-input file-input-bordered w-full max-w-xs mb-2"
              onChange={handleImageUpload}
            />
            {isProcessing ? (
              <div>
                {Object.entries(jobProgress).map(([jobId, progress]) => (
                  <div key={jobId} className="mb-4">
                    <progress
                      className="progress w-full"
                      value={progress}
                      max="100"
                    ></progress>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-40">
                <textarea
                  className="textarea textarea-bordered w-full h-full"
                  placeholder="Your completed courses. Ex. ICPY101, ICGC102, ICGS105 .."
                  value={textareaContent}
                  onChange={handleTextareaChange}
                ></textarea>
              </div>
            )}
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-[#E6E5E5]" onClick={handleClear}>
              Clear
            </button>
            <button className="btn btn-primary">Next</button>
          </div>
        </div>
      </div>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box ">
          <h3 className="font-bold text-xl">Sample Screenshots</h3>
          <div>
            <div className="flex overflow-scroll">
              <Image src={image1} width={200} alt="image 1" />
              <Image src={image2} width={200} alt="image 2" />
              <Image src={image3} width={200} alt="image 3" />
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Home;
