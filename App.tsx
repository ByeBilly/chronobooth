import React, { useState, useRef } from 'react';
import { Camera } from './components/Camera';
import { ImageUploader } from './components/ImageUploader';
import { ERAS } from './constants';
import { Era, EraId } from './types';
import { analyzeImage, generateTimeTravelPhoto } from './services/gemini';

const App: React.FC = () => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [selectedEra, setSelectedEra] = useState<Era>(ERAS[0]);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [analysisText, setAnalysisText] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  
  const resultRef = useRef<HTMLDivElement>(null);

  const handleCapture = (image: string) => {
    setSourceImage(image);
    setResultImage(null);
    setAnalysisText('');
  };

  const handleReset = () => {
    setSourceImage(null);
    setResultImage(null);
    setAnalysisText('');
    setCustomPrompt('');
  };

  const handleAnalyze = async () => {
    if (!sourceImage) return;
    
    setIsAnalyzing(true);
    try {
      const result = await analyzeImage(sourceImage);
      setAnalysisText(result);
    } catch (error) {
      console.error(error);
      alert("Failed to analyze image.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleTimeTravel = async () => {
    if (!sourceImage) return;

    setIsProcessing(true);
    setLoadingMessage(`Warming up the flux capacitor for ${selectedEra.name}...`);
    setResultImage(null);

    try {
      // 1. If not analyzed yet, we could implicitly analyze, but for now we use what we have.
      // 2. Generate
      const generatedImage = await generateTimeTravelPhoto(
        sourceImage,
        selectedEra.promptModifier,
        customPrompt,
        analysisText // Pass analysis if available to improve likeness
      );

      setResultImage(generatedImage);
      
      // Scroll to result
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (error) {
      console.error(error);
      alert("Time travel malfunction! Please try again.");
    } finally {
      setIsProcessing(false);
      setLoadingMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-chrono-dark text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col items-center justify-center space-y-2 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-lg mb-2">
            <span className="text-4xl">⏳</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            ChronoBooth
          </h1>
          <p className="text-slate-400 max-w-lg">
            Step into the machine. Upload or snap a photo, choose an era, and let AI rewrite history.
          </p>
        </header>

        {/* Main Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Input & Controls */}
          <div className="space-y-6">
            
            {/* Step 1: Image Source */}
            <div className="bg-chrono-panel p-6 rounded-2xl border border-slate-700 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold flex items-center">
                  <span className="bg-slate-700 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                  Source Image
                </h2>
                {sourceImage && (
                  <button 
                    onClick={handleReset}
                    className="text-xs text-red-400 hover:text-red-300 underline"
                  >
                    Clear & Retake
                  </button>
                )}
              </div>

              {!sourceImage ? (
                <div className="space-y-4">
                  <Camera onCapture={handleCapture} />
                  <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t border-slate-600"></div>
                    <span className="flex-shrink-0 mx-4 text-slate-500 text-sm">OR</span>
                    <div className="flex-grow border-t border-slate-600"></div>
                  </div>
                  <ImageUploader onUpload={handleCapture} />
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden shadow-lg border-2 border-slate-600">
                  <img src={sourceImage} alt="Source" className="w-full h-auto object-cover max-h-[400px]" />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-xs text-center text-slate-300">
                    Source Captured
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Analysis (Optional) */}
             <div className={`bg-chrono-panel p-6 rounded-2xl border border-slate-700 shadow-xl transition-opacity ${!sourceImage ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold flex items-center">
                    <span className="bg-slate-700 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                    Analyze Identity
                  </h2>
                  <span className="text-xs px-2 py-1 bg-indigo-900 text-indigo-200 rounded">Optional</span>
                </div>
                <p className="text-slate-400 text-sm mb-4">
                  Use <strong>Gemini 3 Pro</strong> to understand your facial features for better likeness preservation.
                </p>
                
                {!analysisText ? (
                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="w-full py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    {isAnalyzing ? (
                      <><span className="animate-spin">🌀</span> Analyzing...</>
                    ) : (
                      <><span className="material-icons">document_scanner</span> Analyze Face</>
                    )}
                  </button>
                ) : (
                  <div className="bg-slate-800 p-4 rounded-lg text-sm text-slate-300 border border-slate-600">
                     <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-green-400">Analysis Complete</span>
                        <button onClick={() => setAnalysisText('')} className="text-xs hover:text-white">Clear</button>
                     </div>
                     <p className="italic line-clamp-4">{analysisText}</p>
                  </div>
                )}
             </div>

            {/* Step 3: Choose Era & Prompt */}
            <div className={`bg-chrono-panel p-6 rounded-2xl border border-slate-700 shadow-xl transition-opacity ${!sourceImage ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <span className="bg-slate-700 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">3</span>
                Select Destination
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {ERAS.map((era) => (
                  <button
                    key={era.id}
                    onClick={() => setSelectedEra(era)}
                    className={`p-3 rounded-xl flex flex-col items-center justify-center gap-2 transition-all border-2 ${
                      selectedEra.id === era.id 
                        ? 'bg-indigo-600/20 border-indigo-500 scale-105 shadow-lg shadow-indigo-500/20' 
                        : 'bg-slate-800 border-transparent hover:bg-slate-700'
                    }`}
                  >
                    <span className="text-3xl">{era.icon}</span>
                    <span className="text-xs font-semibold text-center">{era.name}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300">Custom Modification (Optional)</label>
                <input
                  type="text"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="e.g., 'Add a monocle', 'Make it rainy'"
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder-slate-600"
                />
              </div>
            </div>

            {/* Step 4: Action */}
            <button
              onClick={handleTimeTravel}
              disabled={!sourceImage || isProcessing}
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 ${
                !sourceImage || isProcessing
                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-indigo-500/30'
              }`}
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {loadingMessage}
                </>
              ) : (
                <>
                  <span>🚀</span> Initiate Time Travel
                </>
              )}
            </button>
          </div>

          {/* Right Column: Output */}
          <div ref={resultRef} className="flex flex-col h-full">
             <div className={`flex-grow bg-black rounded-2xl border-4 border-slate-800 flex items-center justify-center relative overflow-hidden min-h-[500px] shadow-2xl ${isProcessing ? 'animate-pulse' : ''}`}>
                
                {!resultImage && !isProcessing && (
                   <div className="text-center p-8 opacity-50">
                      <span className="text-6xl block mb-4">🌌</span>
                      <p className="text-xl font-light">The void awaits your arrival.</p>
                   </div>
                )}

                {isProcessing && (
                   <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/80 backdrop-blur-sm">
                      <div className="w-20 h-20 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                      <p className="text-indigo-300 font-mono animate-pulse">{loadingMessage}</p>
                   </div>
                )}

                {resultImage && (
                  <>
                    <img 
                      src={resultImage} 
                      alt="Generated Time Travel" 
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute top-4 right-4 z-10 flex gap-2">
                      <a 
                        href={resultImage} 
                        download={`chronobooth-${selectedEra.id}-${Date.now()}.png`}
                        className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full text-white transition-colors border border-white/20"
                        title="Download"
                      >
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                          </svg>
                      </a>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                      <h3 className="text-2xl font-bold text-white mb-1">{selectedEra.name}</h3>
                      <p className="text-sm text-slate-300">Generated by Gemini 2.5 Flash Image</p>
                    </div>
                  </>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
