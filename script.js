import React, { useState, useEffect } from "react";

const IMAGES = [
  { id: 1, src: "https://via.placeholder.com/100?text=img1" },
  { id: 2, src: "https://via.placeholder.com/100?text=img2" },
  { id: 3, src: "https://via.placeholder.com/100?text=img3" },
  { id: 4, src: "https://via.placeholder.com/100?text=img4" },
  { id: 5, src: "https://via.placeholder.com/100?text=img5" },
];

// Utility: Shuffle an array (Fisher-Yates)
function shuffleArray(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function RobotVerification() {
  const [shuffledImages, setShuffledImages] = useState([]);
  const [clickedIndexes, setClickedIndexes] = useState([]); // store indexes of clicked tiles
  const [message, setMessage] = useState(
    "Please click on the identical tiles to verify that you are not a robot."
  );
  const [showReset, setShowReset] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [verificationResult, setVerificationResult] = useState("");

  // On mount or reload, prepare the shuffled images with one duplicate:
  useEffect(() => {
    // Pick a random index to duplicate
    const duplicateIndex = Math.floor(Math.random() * IMAGES.length);
    const imagesWithDuplicate = [
      ...IMAGES,
      IMAGES[duplicateIndex],
    ];

    // Shuffle images with duplicate included
    setShuffledImages(shuffleArray(imagesWithDuplicate));
    // Reset states
    setClickedIndexes([]);
    setMessage(
      "Please click on the identical tiles to verify that you are not a robot."
    );
    setShowReset(false);
    setShowVerify(false);
    setVerificationResult("");
  }, []);

  const handleClick = (index) => {
    // Ignore clicks if already two selected or if this tile is already clicked
    if (clickedIndexes.length === 2 || clickedIndexes.includes(index)) return;

    const newClicked = [...clickedIndexes, index];
    setClickedIndexes(newClicked);

    if (newClicked.length === 1) {
      setShowReset(true);
      setShowVerify(false);
      setVerificationResult("");
      setMessage("Please click on the identical tiles to verify that you are not a robot.");
    } else if (newClicked.length === 2) {
      setShowVerify(true);
      setVerificationResult("");
      setMessage("Please click on the identical tiles to verify that you are not a robot.");
    }
  };

  const handleReset = () => {
    setClickedIndexes([]);
    setShowReset(false);
    setShowVerify(false);
    setVerificationResult("");
    setMessage("Please click on the identical tiles to verify that you are not a robot.");
  };

  const handleVerify = () => {
    setShowVerify(false);

    const [firstIndex, secondIndex] = clickedIndexes;
    const firstImage = shuffledImages[firstIndex];
    const secondImage = shuffledImages[secondIndex];

    if (firstImage.id === secondImage.id) {
      setVerificationResult("You are a human. Congratulations!");
    } else {
      setVerificationResult(
        "We can't verify you as a human. You selected the non-identical tiles."
      );
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h3 id="h">{message}</h3>

      <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 20 }}>
        {shuffledImages.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt={`tile-${img.id}`}
            onClick={() => handleClick(i)}
            style={{
              cursor: clickedIndexes.length < 2 && !clickedIndexes.includes(i) ? "pointer" : "default",
              border: clickedIndexes.includes(i) ? "4px solid #4CAF50" : "2px solid gray",
              borderRadius: 8,
              width: 100,
              height: 100,
              objectFit: "cover",
              userSelect: "none",
            }}
            draggable={false}
          />
        ))}
      </div>

      <div>
        {showReset && (
          <button id="reset" onClick={handleReset} style={{ marginRight: 10 }}>
            Reset
          </button>
        )}

        {showVerify && clickedIndexes.length === 2 && (
          <button id="verify" onClick={handleVerify}>
            Verify
          </button>
        )}
      </div>

      {verificationResult && (
        <p id="para" style={{ marginTop: 20, fontWeight: "bold" }}>
          {verificationResult}
        </p>
      )}
    </div>
  );
}

