
import React from 'react';
import { SiJavascript, SiPython, SiRust, SiGo, SiSwift } from 'react-icons/si'; 
import { TbBrandCpp } from "react-icons/tb";

type SidebarProps = {
  onSelectLanguage: (language: 'javascript' | 'python' | 'rust' | 'go' | 'swift' | 'cpp') => void;
  theme: 'light' | 'dark'; 
};

const Sidebar: React.FC<SidebarProps> = ({ onSelectLanguage, theme }) => {
 
  const languageIcons = {
    javascript: <SiJavascript />,
    python: <SiPython />,
    rust: <SiRust />,
    go: <SiGo />,
    swift: <SiSwift />,
    cpp: <TbBrandCpp />
  };

  return (
    <div
      className={`w-14 p-1 ${
        theme === 'dark' ? 'bg-[#1d2030]' : 'bg-[#ffffff]'
      } transition-colors duration-100`}
    >
      <div className="">
        {['javascript', 'python', 'rust', 'go', 'swift', 'cpp'].map((lang) => (
          <button
            key={lang}
            onClick={() => onSelectLanguage(lang as 'javascript' | 'python' | 'rust' | 'go' | 'swift' | 'cpp')}
            className="w-full text-left px-4 py-2 mb-2 rounded border hover:bg-gray-300 "
          >
            <div className="w-full h-full flex justify-center items-center">
              {languageIcons[lang]}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
