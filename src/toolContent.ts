import { ToolItem } from './tools';

export interface ToolFaqItem {
  question: string;
  answer: string;
}

export interface ToolContentInfo {
  summary: string;
  useCases: string[];
  cautions: string[];
  faq: ToolFaqItem[];
}

const ALGO_LABEL: Record<ToolItem['algo'], string> = {
  aes: 'AES',
  des: 'DES',
  tripledes: 'Triple DES',
  rc4: 'RC4',
};

export function getToolContent(tool: ToolItem): ToolContentInfo {
  const algorithm = ALGO_LABEL[tool.algo];
  const summary =
    tool.mode === 'encrypt'
      ? `${algorithm} encryption tool for converting readable text into ciphertext using a shared secret key.`
      : `${algorithm} decryption tool for recovering plaintext from ciphertext using the matching secret key.`;

  const useCases = [
    `Quickly test ${algorithm} ${tool.mode}ion behavior in the browser.`,
    'Create reproducible examples for debugging integration issues.',
    'Validate whether a key and payload pair are compatible before backend integration.',
  ];

  const cautions = [
    'Store and share secret keys carefully. Avoid sending keys over insecure channels.',
    'Clipboard history and browser extensions can expose copied content.',
    tool.algo === 'des' || tool.algo === 'rc4'
      ? `${algorithm} is a legacy algorithm and should not be used for new, sensitive production workloads.`
      : `${algorithm} is stronger than DES/RC4, but security still depends on key management and system design.`,
  ];

  const faq: ToolFaqItem[] = [
    {
      question: `Why does ${tool.mode}ion fail sometimes?`,
      answer:
        'Failure typically means the input format is invalid for the selected mode, or the secret key does not match the original key.',
    },
    {
      question: 'Is my data sent to a server?',
      answer:
        'No. This app performs cryptographic operations in the browser with crypto-js and does not require a backend API.',
    },
    {
      question: `Should I use ${algorithm} in production?`,
      answer:
        tool.algo === 'des' || tool.algo === 'rc4'
          ? `No for new systems. ${algorithm} is considered outdated for modern security requirements.`
          : `It can be used in many systems, but production safety depends on secure key handling, threat modeling, and implementation details.`,
    },
  ];

  return { summary, useCases, cautions, faq };
}

