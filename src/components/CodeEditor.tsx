
import React, { useEffect, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { basicSetup } from 'codemirror';
import { StreamLanguage } from '@codemirror/language';
import { EditorView } from '@codemirror/view';
import { keymap } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import { oneDark } from '@codemirror/theme-one-dark';
import { python } from '@codemirror/legacy-modes/mode/python';
import { javascript } from '@codemirror/legacy-modes/mode/javascript';
import { rust } from '@codemirror/legacy-modes/mode/rust';
import { go } from '@codemirror/legacy-modes/mode/go';
import { swift } from '@codemirror/legacy-modes/mode/swift';
import { cpp } from '@codemirror/legacy-modes/mode/clike';
import { lineNumbers } from '@codemirror/view';

type Language = 'javascript' | 'python' | 'rust' | 'go' | 'swift' | 'cpp';

type CodeEditorProps = {
  onChange: (value: string) => void;
  theme: 'light' | 'dark';
  language: Language;
 
};

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, theme, language }) => {
  const editorRef = useRef<HTMLDivElement>(null);


  const getLanguageExtension = (lang: Language) => {
    switch (lang) {
      case 'javascript':
        return StreamLanguage.define(javascript);
      case 'python':
        return StreamLanguage.define(python);
      case 'rust':
        return StreamLanguage.define(rust);
      case 'go':
        return StreamLanguage.define(go);
      case 'swift':
        return StreamLanguage.define(swift);
      case 'cpp':
        return StreamLanguage.define(cpp);
      default:
        return StreamLanguage.define(javascript);
    }
  };

  useEffect(() => {
    if (editorRef.current) {
      const extensions = [
        basicSetup,
        keymap.of(defaultKeymap),
        getLanguageExtension(language),
        theme === 'dark' ? oneDark : [],
        lineNumbers(),
        EditorView.updateListener.of((update) => {
          if (update.changes) {
            onChange(update.state.doc.toString());
          }
        }),
      ];

      const state = EditorState.create({ extensions });
      const view = new EditorView({
        state,
        parent: editorRef.current,
      });

      return () => {
        view.destroy();
      };
    }
  }, [language, theme, onChange]);

  return (
    <div className="border-r-2">
    
      <div
        className={`w-full h-[8vh] pt-4 border ${
          theme === 'dark' ? 'bg-[#2c2e34]' : 'bg-gray-200'
        }`}
      >
        <h2 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
          Input
        </h2>
      </div>

    
      <div ref={editorRef} className="h-96 w-[47vw] min-h-[85vh]"></div>

      <style>
        {`
          /* Styling adjustments for line numbers in dark theme */
          .CodeMirror-linenumber {
            background: none !important;
            color: ${theme === 'dark' ? 'white' : 'black'} !important;
          }
        `}
      </style>
    </div>
  );
};

export default CodeEditor;



