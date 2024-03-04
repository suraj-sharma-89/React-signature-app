import React, { useRef, useState } from "react";
import "./index.css";
import Photo from "./sign-image.png";
import SignatureCanvas from "react-signature-canvas";

const Popup = () => {
  const signCanvas = useRef(null);

  const [isOpen, setIsOpen] = useState(false); //for open popwindow

  //for open popup window
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  //for clear  the signature canvas
  const clear = () => signCanvas.current.clear();

  //for save the signature
  const save = () => {
    // Get signature canvas and context
    const canvas = signCanvas.current.getCanvas();
    const ctx = canvas.getContext("2d");

    // Save the current signature
    const signatureData = signCanvas.current.toDataURL();

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set canvas background color to white
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Restore the saved signature
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);

      // Convert canvas content to data URL
      const updatedSignatureData = canvas.toDataURL("image/jpeg");

      // Create an anchor element and set its attributes for downloading
      const downloadLink = document.createElement("a");
      downloadLink.href = updatedSignatureData;
      downloadLink.download = "signature.jpg"; // Set the filename for the downloaded image

      // Append the anchor element to the document body and trigger a click event
      document.body.appendChild(downloadLink);
      downloadLink.click();

      document.body.removeChild(downloadLink);

      togglePopup();
    };
    img.src = signatureData;
  };

  return (
    <>
      <header>
        <div class="header-left">
          <h1>MySignature</h1>
        </div>
        <div class="header-right">
          <button className="bounce" onClick={togglePopup}>
            Sign Your Signature
          </button>
        </div>
      </header>
      <main>
        <section class="content-section">
          <div class="highlighted-section">
            <h1>
              Draw Your Signature Online. A simple handwritten signature
              generator.
            </h1>

            <button onClick={togglePopup}>
              Create Hand Writting Signature
            </button>
            {isOpen && (
              <div className="popup">
                <div className="popup-inner">
                  <button className="close-btn" onClick={togglePopup}>
                    Close
                  </button>
                  <button className="clear-btn" onClick={clear}>
                    clear
                  </button>
                  <button className="save-btn" onClick={save}>
                    Download
                  </button>
                  <div className="signature-container">
                    <SignatureCanvas
                      ref={signCanvas}
                      penColor="black"
                      canvasProps={{
                        width: window.innerWidth * 0.6,
                        height: window.innerHeight * 0.6,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div class="vector-image-section">
            <img src={Photo} alt="Person using laptop" />
          </div>
        </section>
      </main>
    </>
  );
};

export default Popup;
