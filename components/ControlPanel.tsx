
import React, { useRef } from 'react';
import { AspectRatio } from '../types';
import { FileUpload } from './FileUpload';
import { AspectRatioSelector } from './AspectRatioSelector';
import { StatCounter } from './StatCounter';
import { TabButton } from './TabButton';

interface ControlPanelProps {
  activeTab: 'script' | 'prompts';
  setActiveTab: (tab: 'script' | 'prompts') => void;
  scriptText: string;
  setScriptText: (text: string) => void;
  scenes: string;
  setScenes: (scenes: string) => void;
  niche: string;
  setNiche: (niche: string) => void;
  styleImageFile: File | null;
  setStyleImageFile: (file: File | null) => void;
  styleKeywords: string;
  setStyleKeywords: (keywords: string) => void;
  aspectRatio: AspectRatio;
  setAspectRatio: (ratio: AspectRatio) => void;
  wordCount: number;
  charCount: number;
  sceneCount: number;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-slate-800 border border-slate-700 p-5 rounded-xl shadow-md space-y-4">
    <h2 className="text-xl font-semibold text-white">{title}</h2>
    {children}
  </div>
);

export const ControlPanel: React.FC<ControlPanelProps> = (props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'text/plain') {
        const reader = new FileReader();
        reader.onload = (event) => {
          props.setScriptText(event.target?.result as string);
        };
        reader.readAsText(file);
      } else {
        alert('Only .txt files are supported for script upload.');
      }
    }
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <Section title="Provide Content">
        <div className="flex border-b border-slate-600">
          <TabButton isActive={props.activeTab === 'script'} onClick={() => props.setActiveTab('script')}>
            From Script
          </TabButton>
          <TabButton isActive={props.activeTab === 'prompts'} onClick={() => props.setActiveTab('prompts')}>
            From Prompts
          </TabButton>
        </div>
        <div className="pt-2">
          {props.activeTab === 'script' && (
            <>
              <textarea
                value={props.scriptText}
                onChange={(e) => props.setScriptText(e.target.value)}
                placeholder="Write or paste your script here..."
                className="w-full h-48 p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 text-slate-200 placeholder-slate-400"
              />
              <div className="grid grid-cols-3 gap-2 text-center mt-2">
                <StatCounter value={props.wordCount} label="Words" />
                <StatCounter value={props.charCount} label="Characters" />
                <StatCounter value={props.sceneCount} label="Scenes" />
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-4 w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Upload Script File (.txt)
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".txt"
                className="hidden"
              />
            </>
          )}
          {props.activeTab === 'prompts' && (
             <div className="text-slate-400 text-center py-12">
                Feature coming soon. Please use the "From Script" tab.
             </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label htmlFor="scenes" className="block text-sm font-medium text-slate-300 mb-1">Number of Scenes</label>
                <input
                    type="number"
                    id="scenes"
                    value={props.scenes}
                    onChange={(e) => props.setScenes(e.target.value)}
                    className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
            </div>
            <div>
                <label htmlFor="niche" className="block text-sm font-medium text-slate-300 mb-1">Niche / Topic</label>
                <input
                    type="text"
                    id="niche"
                    value={props.niche}
                    onChange={(e) => props.setNiche(e.target.value)}
                    placeholder="e.g., Sci-fi, Documentary"
                    className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition placeholder-slate-400"
                />
            </div>
        </div>
      </Section>

      <Section title="Define Image Style">
        <FileUpload file={props.styleImageFile} setFile={props.setStyleImageFile} />
        <div>
            <label htmlFor="style-keywords" className="block text-sm font-medium text-slate-300 mb-1">Style Keywords</label>
            <input
                type="text"
                id="style-keywords"
                value={props.styleKeywords}
                onChange={(e) => props.setStyleKeywords(e.target.value)}
                placeholder="cinematic, realistic, 4K, dramatic light"
                className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition placeholder-slate-400"
            />
        </div>
      </Section>
      
      <Section title="Aspect Ratio">
        <AspectRatioSelector selectedRatio={props.aspectRatio} onSelectRatio={props.setAspectRatio} />
      </Section>
    </div>
  );
};
