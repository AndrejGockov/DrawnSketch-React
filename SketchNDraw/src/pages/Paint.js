import React, { useEffect, useRef, useState } from "react";

import Backwards from "./sections/Backwards.js";

export const Paint = () => {
  //Canvas and Context References
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    //Canvas
    const canvas = canvasRef.current;

    //Canvas Dimensions
    if (window.innerWidth >= 810) {
      canvas.width = 800;
      canvas.height = 400;
    } else {
      canvas.width = 400;
      canvas.height = 500;
    }

    //Context
    const ctx = canvas.getContext("2d");
    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = "round";
    ctx.lineWidth = 5;

    //Sets the Context so it can be used globally
    contextRef.current = ctx;

    //Message for Refreshing the page
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  //Drawing Functions

  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = ({ nativeEvent }) => {
    setIsDrawing(true);
    const { offsetX, offsetY } = nativeEvent;

    contextRef.current.beginPath();
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const Drawing = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    } else {
      if (nativeEvent.type === "touchmove") {
        var touch = nativeEvent.touches[0];
        let mouseEvent = new MouseEvent("mousemove", {
          clientX: touch.clientX,
          clientY: touch.clientY,
        });
        canvasRef.current.dispatchEvent(mouseEvent);
        contextRef.current.lineTo(
          mouseEvent.clientX - canvasRef.current.offsetLeft,
          mouseEvent.clientY - canvasRef.current.offsetTop
        );

        // console.log("touch");
        // console.log(touch.clientX + " + " + touch.clientY);
      } else {
        const { offsetX, offsetY } = nativeEvent;
        console.log(offsetX + " + " + offsetY);

        contextRef.current.lineTo(offsetX, offsetY);
        nativeEvent.preventDefault();
      }
      contextRef.current.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    contextRef.current.stroke();
  };

  //Paint and Eraser Functions

  const setToDraw = () => {
    contextRef.current.globalCompositeOperation = "source-over";

    //Inputs Fields
    document.querySelector(".brush-size").style.visibility = "visible";
    document.querySelector(".eraser-size").style.visibility = "hidden";
  };

  const setToErase = () => {
    contextRef.current.globalCompositeOperation = "destination-out";

    //If this isn't there then the eraser will have the same size as the brush
    contextRef.current.lineWidth = 5;

    //Input Fields
    document.querySelector(".eraser-size").style.visibility = "visible";
    document.querySelector(".brush-size").style.visibility = "hidden";
  };

  //Tool Functions

  const colorChange = (e) => {
    contextRef.current.strokeStyle = e.target.value;
  };

  const brushSize = (e) => {
    contextRef.current.lineWidth = e.target.value;
  };

  // const eraserSize = (e) => {
  //   contextRef.current.lineWidth = e.target.value;
  // };

  const downloadDrawing = (event) => {
    //Selects the target of the event the current state of the Canvas.
    //Then downloads it as an image and names it "Sketch.png"
    let link = event.currentTarget;
    let image = canvasRef.current.toDataURL("image/png");
    link.setAttribute("download", "SketchNDraw.png");
    link.setAttribute("href", image);
  };

  function clearCanvas(e) {
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    contextRef.current.fillStyle = "white";
    // console.log(canvasRef);
  }

  return (
    <>
      <div className="tool-menu">
        <input className="checkbox" type="checkbox" name="" id="" />

        <svg className="menu" viewBox="0 0 24 24">
          <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
        </svg>

        <div className="tools">
          <div className="tool">
            <svg viewBox="0 0 24 24" id="pen" onClick={setToDraw}>
              <path d="M7.061 22c1.523 0 2.84-.543 3.91-1.613 1.123-1.123 1.707-2.854 1.551-4.494l8.564-8.564a3.123 3.123 0 0 0-.002-4.414c-1.178-1.18-3.234-1.18-4.412 0l-8.884 8.884c-1.913.169-3.807 1.521-3.807 3.919 0 .303.021.588.042.86.08 1.031.109 1.418-1.471 2.208a1.001 1.001 0 0 0-.122 1.717C2.52 20.563 4.623 22 7.061 22c-.001 0-.001 0 0 0zM18.086 4.328a1.144 1.144 0 0 1 1.586.002 1.12 1.12 0 0 1 0 1.584L12 13.586 10.414 12l7.672-7.672zM6.018 16.423c-.018-.224-.037-.458-.037-.706 0-1.545 1.445-1.953 2.21-1.953.356 0 .699.073.964.206.945.475 1.26 1.293 1.357 1.896.177 1.09-.217 2.368-.956 3.107C8.865 19.664 8.049 20 7.061 20H7.06c-.75 0-1.479-.196-2.074-.427 1.082-.973 1.121-1.989 1.032-3.15z"></path>
            </svg>

            <div className="brush-size">
              <input
                type="range"
                min="1"
                max="100"
                onChange={brushSize}
                id="pen-size"
              />
            </div>
          </div>
          <div className="tool">
            <svg viewBox="0 0 24 24" id="eraser" onClick={setToErase}>
              <path d="M12.48 3 7.73 7.75 3 12.59a2 2 0 0 0 0 2.82l4.3 4.3A1 1 0 0 0 8 20h12v-2h-7l7.22-7.22a2 2 0 0 0 0-2.83L15.31 3a2 2 0 0 0-2.83 0zM8.41 18l-4-4 4.75-4.84.74-.75 4.95 4.95-4.56 4.56-.07.08z"></path>
              {/* <input
                type="range"
                min="1"
                max="100"
                onChange={eraserSize}
                id="pen-size"
              /> */}
            </svg>

            <div className="eraser-size">
              <input type="range" min="1" max="100" id="eraser-size" />
            </div>
          </div>
          <div className="tool">
            <input type="color" id="color" onChange={colorChange} />
          </div>
          <div className="tool">
            <a href="blank" onClick={downloadDrawing}>
              <svg viewBox="0 0 24 24" className="download">
                <path d="m12 16 4-5h-3V4h-2v7H8z"></path>
                <path d="M20 18H4v-7H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-2v7z"></path>
              </svg>
            </a>
          </div>
          <div className="tool">
            <svg
              viewBox="0 0 24 24"
              className="clear-canvas"
              onClick={clearCanvas}
            >
              <path d="M19.937 8.68c-.011-.032-.02-.063-.033-.094a.997.997 0 0 0-.196-.293l-6-6a.997.997 0 0 0-.293-.196c-.03-.014-.062-.022-.094-.033a.991.991 0 0 0-.259-.051C13.04 2.011 13.021 2 13 2H6c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V9c0-.021-.011-.04-.013-.062a.99.99 0 0 0-.05-.258zM16.586 8H14V5.414L16.586 8zM6 20V4h6v5a1 1 0 0 0 1 1h5l.002 10H6z"></path>
            </svg>
          </div>
        </div>
      </div>

      <Backwards />

      <canvas
        id="canvas"
        ref={canvasRef}
        //For PC
        onMouseDown={startDrawing}
        onMouseMove={Drawing}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        //For Mobile
        onTouchStart={startDrawing}
        onTouchMove={Drawing}
        onTouchEnd={stopDrawing}
      />
    </>
  );
};

export default Paint;
