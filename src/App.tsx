import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#ffffff');
  const [size, setSize] = useState(5);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;
    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.fillStyle = '#1e1e1e';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    setIsDrawing(true);
    draw(offsetX, offsetY);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const context = canvasRef.current.getContext('2d');
    context.beginPath();
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current.getContext('2d');
    context.strokeStyle = color;
    context.lineWidth = size;
    context.lineTo(offsetX, offsetY);
    context.stroke();
    context.beginPath();
    context.moveTo(offsetX, offsetY);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.fillStyle = '#1e1e1e';
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="App">
      <h1>AC - Drawing App</h1>
      <div className="controls">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <input
          type="range"
          min="1"
          max="50"
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value))}
        />
        <button onClick={clearCanvas}>Clear</button>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onMouseMove={draw}
      />
    </div>
  );
}

export default App;
