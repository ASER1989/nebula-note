import React, {useMemo} from 'react';

type Props = {
  keywords: string | Array<string> | undefined;
  children: string;
  focusId: string | undefined;
  id: string;
  testId?: string
};
export default function HighLight({id, focusId, children, keywords, testId}: Props) {
  const isFocused = useMemo(() => id === focusId, [id, focusId]);

  if (keywords) {
    const keywordList = Array.isArray(keywords) ? keywords : [keywords];
    const result = keywordList.reduce((preValue: string, currentValue: string) => {
      return preValue.replace(
        currentValue,
        `<span style="background:yellow">${currentValue}</span>`,
      );
    }, children);
    const style = {
      textDecoration: isFocused ? 'underline' : 'none',
    };
    return (
      <span
        data-testid={testId}
        style={style}
        dangerouslySetInnerHTML={{__html: result as any}}
      ></span>
    );
  }
  return <>{children}</>;
}
