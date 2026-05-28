import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import { ToolLayout, CopyButton } from '../components/ToolLayout';
import { ToolItem } from '../tools';
import { ArrowLeftRight } from 'lucide-react';

interface EncryptionToolProps {
  tool: ToolItem;
  onSwapTool?: (newToolId: string) => void;
}

export function EncryptionTool({ tool, onSwapTool }: EncryptionToolProps) {
  const [encryptInput, setEncryptInput] = useState('');
  const [decryptInput, setDecryptInput] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [encryptOutput, setEncryptOutput] = useState('');
  const [decryptOutput, setDecryptOutput] = useState('');

  const mode = tool.mode;
  const algo = tool.algo;

  const input = mode === 'encrypt' ? encryptInput : decryptInput;
  const setInput = mode === 'encrypt' ? setEncryptInput : setDecryptInput;
  const output = mode === 'encrypt' ? encryptOutput : decryptOutput;
  const setOutput = mode === 'encrypt' ? setEncryptOutput : setDecryptOutput;

  const handleSwap = () => {
    if (output && !output.startsWith('Decryption failed')) {
      const pairMode = mode === 'encrypt' ? 'decrypt' : 'encrypt';
      if (pairMode === 'encrypt') {
        setEncryptInput(output);
      } else {
        setDecryptInput(output);
      }
      const pairId = `${algo}-${pairMode}`;
      if (onSwapTool) {
        onSwapTool(pairId);
      }
    }
  };

  useEffect(() => {
    if (!input || !secretKey) {
      setOutput('');
      return;
    }

    try {
      let res = '';
      if (mode === 'encrypt') {
        switch (algo) {
          case 'aes':
            res = CryptoJS.AES.encrypt(input, secretKey).toString();
            break;
          case 'des':
            res = CryptoJS.DES.encrypt(input, secretKey).toString();
            break;
          case 'tripledes':
            res = CryptoJS.TripleDES.encrypt(input, secretKey).toString();
            break;
          case 'rc4':
            res = CryptoJS.RC4.encrypt(input, secretKey).toString();
            break;
        }
      } else {
        switch (algo) {
          case 'aes':
            res = CryptoJS.AES.decrypt(input, secretKey).toString(CryptoJS.enc.Utf8);
            break;
          case 'des':
            res = CryptoJS.DES.decrypt(input, secretKey).toString(CryptoJS.enc.Utf8);
            break;
          case 'tripledes':
            res = CryptoJS.TripleDES.decrypt(input, secretKey).toString(CryptoJS.enc.Utf8);
            break;
          case 'rc4':
            res = CryptoJS.RC4.decrypt(input, secretKey).toString(CryptoJS.enc.Utf8);
            break;
        }
        if (!res) throw new Error('Decryption failed');
      }
      setOutput(res);
    } catch (e) {
      setOutput('Decryption failed. Please check your data and key.');
    }
  }, [input, secretKey, algo, mode]);

  return (
    <ToolLayout title={tool.name} description={`Symmetric ${mode}ion using the ${algo.toUpperCase()} algorithm.`}>
      
      <div className="flex items-center justify-end mb-4">
        <button
          onClick={handleSwap}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:text-slate-900 dark:hover:text-slate-200 transition-colors shadow-sm dark:shadow-none"
          title={`Swap Input and Output and switch to ${mode === 'encrypt' ? 'Decrypt' : 'Encrypt'}`}
        >
          <ArrowLeftRight className="w-4 h-4" />
          Swap to {mode === 'encrypt' ? 'Decrypt' : 'Encrypt'}
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Secret Key / Passphrase</label>
          <input
             type="text"
             className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-500/40 focus:border-blue-500 dark:focus:border-blue-500 text-slate-900 dark:text-slate-100 transition-all"
             placeholder="Enter secret key..."
             value={secretKey}
             onChange={(e) => setSecretKey(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="space-y-2 flex flex-col">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Input Text</label>
            <textarea
               className="w-full h-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-500/40 focus:border-blue-500 dark:focus:border-blue-500 text-slate-900 dark:text-slate-100 transition-all"
               placeholder={`Enter text to ${mode}...`}
               value={input}
               onChange={(e) => setInput(e.target.value)}
            />
          </div>

          <div className="space-y-2 flex flex-col">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Output Result</label>
              <CopyButton text={output} />
            </div>
            <textarea
              className={`w-full h-48 rounded-xl p-4 font-mono text-sm resize-none focus:outline-none cursor-default transition-all ${
                output.startsWith('Decryption failed') ? 'bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/30' : 'bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
              placeholder={`Computed ${mode} result will appear here...`}
              value={output}
              readOnly
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
