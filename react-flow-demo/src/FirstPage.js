import React, { useState } from 'react';
import './App.css'; // Import your CSS file
import {requirements, req3} from './templete';
import { useNavigate } from 'react-router-dom';

function App() {
    const navigate = useNavigate();
    const [text, setText] = useState('');
    const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleClear = () => {
    setText('');
    setMessage('');
  };

  const handlePreview = () => {
    setMessage(`You entered: ${text}`);
  };

  const handleSubmit = () => {
    navigate('/graph');
  };

  const fillTextAreaWithExample = (exampleText) => {
    setText(exampleText);
  };

  return (
    <div className="App">
      <div className="centered-content">
        <h1>CEG from Requirements</h1>
        <textarea
          rows="9"
          cols="50"
          value={text}
          onChange={handleInputChange}
          placeholder="Enter requirements here.."
        ></textarea>
        <br />
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handlePreview}>Preview</button>
        <button onClick={() => fillTextAreaWithExample(JSON.stringify(requirements, null, 2))}>Example1</button>
        <button onClick={() => fillTextAreaWithExample(JSON.stringify(req3, null, 2))}>Example2</button>
        <div>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
export const req = useState;