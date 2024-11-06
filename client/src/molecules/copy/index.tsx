import React, {useState} from 'react';
import Button from "@client/atoms/button";

export type Props = {
  code?: string;
}
export const Copy = ({code}: Props) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code ?? '');
      setIsCopied(true);

      // 2秒后重置复制状态
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <Button type={isCopied ? 'default' : 'primary'} disabled={isCopied}
            onClick={handleCopy}>{isCopied ? 'Copied!' : 'Copy'}</Button>
  );
};

export default Copy;

