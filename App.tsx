
import React, { useState, useMemo, useCallback } from 'react';
import { ControlPanel } from './components/ControlPanel';
import { PreviewPanel } from './components/PreviewPanel';
import { GenerationParams, AspectRatio } from './types';
import { generatePrompts } from './services/geminiService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'script' | 'prompts'>('script');
  const [scriptText, setScriptText] = useState('');
  const [scenes, setScenes] = useState('5');
  const [niche, setNiche] = useState('');
  const [styleImageFile, setStyleImageFile] = useState<File | null>(null);
  const [styleKeywords, setStyleKeywords] = useState('cinematic, realistic, 4K, dramatic light');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { wordCount, charCount, sceneCount } = useMemo(() => {
    const words = scriptText.trim().split(/\s+/).filter(Boolean);
    const scenes = scriptText.match(/scene/gi) || [];
    return {
      wordCount: scriptText.trim() ? words.length : 0,
      charCount: scriptText.length,
      sceneCount: scenes.length,
    };
  }, [scriptText]);

  const fileToBase64 = (file: File): Promise<{base64: string, mimeType: string}> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        resolve({ base64, mimeType: file.type });
      };
      reader.onerror = error => reject(error);
    });
  }

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedContent('');

    let styleImage: { base64: string; mimeType: string; } | null = null;
    if (styleImageFile) {
      try {
        styleImage = await fileToBase64(styleImageFile);
      } catch (e) {
        setError('Failed to read the style image file.');
        setIsLoading(false);
        return;
      }
    }

    const params: GenerationParams = {
      script: scriptText,
      scenes,
      niche,
      styleKeywords,
      aspectRatio,
      styleImage,
    };
    
    try {
      const result = await generatePrompts(params);
      setGeneratedContent(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [scriptText, scenes, niche, styleKeywords, aspectRatio, styleImageFile]);

  return (
    <div className="min-h-screen flex flex-col p-4 sm:p-6 lg:p-8 bg-slate-900 font-sans">
      <header className="text-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">AI Video Script to Prompt Generator</h1>
        <p className="text-slate-400 mt-2">Turn your ideas into visually rich prompts for AI video generation.</p>
      </header>
      
      <main className="flex-grow flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/5">
          <ControlPanel
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            scriptText={scriptText}
            setScriptText={setScriptText}
            scenes={scenes}
            setScenes={setScenes}
            niche={niche}
            setNiche={setNiche}
            styleImageFile={styleImageFile}
            setStyleImageFile={setStyleImageFile}
            styleKeywords={styleKeywords}
            setStyleKeywords={setStyleKeywords}
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
            wordCount={wordCount}
            charCount={charCount}
            sceneCount={sceneCount}
          />
        </div>
        <div className="w-full lg:w-3/5">
          <PreviewPanel 
            generatedContent={generatedContent}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>

      <footer className="mt-6">
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            'Generate Prompts'
          )}
        </button>
      </footer>
    </div>
  );
};

export default App;
