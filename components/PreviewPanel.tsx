
import React from 'react';

interface PreviewPanelProps {
  generatedContent: string;
  isLoading: boolean;
  error: string | null;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ generatedContent, isLoading, error }) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <svg className="animate-spin h-10 w-10 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-slate-300">Generating prompts...</p>
        </div>
      );
    }

    if (error) {
       return (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <p className="text-red-400 font-semibold">An Error Occurred</p>
          <p className="mt-2 text-slate-400 text-sm bg-red-900/50 p-3 rounded-lg">{error}</p>
        </div>
       )
    }

    if (!generatedContent) {
      return (
        <div className="flex items-center justify-center h-full text-center text-slate-400">
          <p>Your generated content will appear here. Fill in the details on the left and click ‘Generate Prompts’ to start.</p>
        </div>
      );
    }
    
    return (
        <pre className="whitespace-pre-wrap break-words font-sans text-slate-200 p-2">
            {generatedContent}
        </pre>
    )
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-md h-full w-full p-6">
      <div className="h-full w-full overflow-y-auto pr-2">
        {renderContent()}
      </div>
    </div>
  );
};
