import { Lock, Unlock } from 'lucide-react';

export type ToolCategory = 'Cryptography';

export interface ToolItem {
  id: string;
  name: string;
  mode: 'encrypt' | 'decrypt';
  algo: 'aes' | 'des' | 'tripledes' | 'rc4';
  category: ToolCategory;
  icon: any;
}

export const TOOLS: ToolItem[] = [
  // AES
  { id: 'aes-encrypt', name: 'AES Encrypt', mode: 'encrypt', algo: 'aes', category: 'Cryptography', icon: Lock },
  { id: 'aes-decrypt', name: 'AES Decrypt', mode: 'decrypt', algo: 'aes', category: 'Cryptography', icon: Unlock },
  // DES
  { id: 'des-encrypt', name: 'DES Encrypt', mode: 'encrypt', algo: 'des', category: 'Cryptography', icon: Lock },
  { id: 'des-decrypt', name: 'DES Decrypt', mode: 'decrypt', algo: 'des', category: 'Cryptography', icon: Unlock },
  // Triple DES
  { id: 'tripledes-encrypt', name: 'Triple DES Encrypt', mode: 'encrypt', algo: 'tripledes', category: 'Cryptography', icon: Lock },
  { id: 'tripledes-decrypt', name: 'Triple DES Decrypt', mode: 'decrypt', algo: 'tripledes', category: 'Cryptography', icon: Unlock },
  // RC4
  { id: 'rc4-encrypt', name: 'RC4 Encrypt', mode: 'encrypt', algo: 'rc4', category: 'Cryptography', icon: Lock },
  { id: 'rc4-decrypt', name: 'RC4 Decrypt', mode: 'decrypt', algo: 'rc4', category: 'Cryptography', icon: Unlock },
];

