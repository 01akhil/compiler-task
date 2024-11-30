"use client";

import { useContext, useState } from 'react';
import CodeEditor from '../components/CodeEditor';
import Sidebar from '../components/Sidebar';
import '../app/globals.css';
import { ThemeContext } from './layout';

type Language = 'javascript' | 'python' | 'rust' | 'go' | 'swift' | 'cpp';

const Home: React.FC = () => {
  const [language, setLanguage] = useState<Language>('javascript');
  const [code, setCode] = useState<string>('');
  const { theme } = useContext(ThemeContext); // Access theme from context

  return (
    <div className="min-h-screen flex  ">
      <Sidebar onSelectLanguage={setLanguage} theme={theme} />
      <div className="flex border">
        <CodeEditor
          language={language}
          theme={theme}
          code={code}
          onChange={setCode}
        />

        {/* Dynamic background for Output div */}
        <div
          className={`w-[48vw] pt-4 h-[8vh] border ${
            theme === 'dark' ? 'bg-[#2c2e34]' : 'bg-gray-200'
          }`}
        >
          <h2
            className={`text-lg font-bold ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}
          >
            Output
          </h2>
          <div className="mt-[1vh]">
            <pre
              className={`rounded mt-[11px] h-[4vh] p-2 ${
                theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-[#cceeff44] text-black'
              }`}
            >
              {code}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

