# Paint-Website-SketchNDraw

## About the project
- [Summary](#Summary)
- [Features](#Features)
- [Made with](#Made-with)
- [How it works](#How-it-works)

## Summary
SketchNDraw is a webiste made in React that creates an easy to use UI that allows the user to: load up the website, get an empty canvas, and start drawing.

## Features
  SketchNDraw's features include:
- #### Brush Tool
- #### Changing brush size and color
- #### Eraser Tool
- #### Downloading drawings
- #### Multilanguage

## Made with
- ### React
- ### I18Next

## How it works
The drawing, as well as many of the other functionalities, are made with the HTML canvas element.
And so, many of the functionalities orient around this canvas element:

      <canvas
        // Canvas reference
        id="canvas"
        ref={canvasRef}
        // For PC
        onMouseDown={startDrawing}
        onMouseMove={Drawing}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        // For Mobile
        onTouchStart={startDrawing}
        onTouchMove={Drawing}
        onTouchEnd={stopDrawing}
      />

As for drawing on the canvas, it's separated into three consts:
- startDrawing - Begins the drawing path with one dot
-  Drawing - Continues the drawing path and follows the users movement on the canvas
- stopDrawing - Ends the drawing path until the user clicks on the canvas again
  
They all run with the boolean:

    const [isDrawing, setIsDrawing] = useState(false);

The boolean is set to false.
Once the user interacts with the canvas, the startDrawing const is called, and it's set to true. 
It's then repeadtedly checked, in the Drawing const, and if true it will continue drawing and following the user around the canvas.
After the user stops it's set to false in stopDrawing and it stops following the users movement on the canvas.
