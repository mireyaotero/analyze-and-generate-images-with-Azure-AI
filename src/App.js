import React, { useState } from 'react';
import { analyzeImage } from './azure-image-analysis'; // Import the function from azure-image-analysis.js
import { generateImage } from './azure-image-generation'; // Import the function from azure-image-generation.js


function DisplayResults({ results }) {
  return (
    <div>
      <h2>Analysis Results:</h2>
      
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </div>
  );
}

function App() {
  const [imageUrl, setImageUrl] = useState('');
  const [prompt, setPrompt] = useState('');
  const [analysisResults, setAnalysisResults] = useState(null);

  function isConfigured() {
    if (!process.env.REACT_APP_OPENAI_API_ORGANIZATION|| !process.env.REACT_APP_OPENAI_API_KEY || !process.env.REACT_APP_AZURE_VISION_SUBSCRIPTION_KEY || !process.env.REACT_APP_AZURE_VISION_ENDPOINT) {
        console.log('Azure Vision environment variables are not set.');
        return false;
    }

    // Add checks for other environment variables here

    console.log('All environment variables are set.');
    return true;
}

  const handleAnalysis = async () => {
    // Perform image analysis logic here
    const results = await analyzeImage(imageUrl); // Call the analyzeImage function from azure-image-analysis.js using await
    
    setAnalysisResults(results);
  };

  const handleGeneration = async () => {
    // Perform image generation logic here
    const results = await generateImage(prompt); // Call the generateImage function from azure-image-generation.js using await
    setAnalysisResults(results);
  };

 
  return (
    
    <div>
      {isConfigured() ? (
        <>
      <h1>Computer Vision</h1>
      <label htmlFor="image-input">Image URL or Prompt:</label>
      <br />
      <input
        type="text"
        id="image-input"
        placeholder="Insert URL or type prompt"
        value={imageUrl || prompt}
        onChange={(e) => {
          if (e.target.value.startsWith('http')) {
            setImageUrl(e.target.value);
          } else {
            setPrompt(e.target.value);
          }
        }}
      />
      <br />
      <br /> 
      <button onClick={handleAnalysis}>Analyze</button> {/* Trigger the handleAnalysis function */}
      <button onClick={handleGeneration}>Generate</button>
      <br />
      <br />
      {imageUrl && <img src={imageUrl} alt="Image" style={{ width: '200px', height: '200px' }} />} {/* Display the image if imageUrl is not empty */}
      {analysisResults && <DisplayResults results={analysisResults} />}
      </>
      ) : (
        <p>Environment variables are not set.</p>
      )}
    </div>
  );}

      

    export default App;
