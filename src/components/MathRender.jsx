import React from 'react';
import katex from 'katex';

export const MathRender = ({ content, className = '' }) => {
  if (!content) return null;

  // Function to split text into math parts ($...$ or $$...$$) and normal text
  const parseMathText = (text) => {
    const parts = [];
    let lastIndex = 0;
    // Regex for block math $$...$$ and inline math $...$
    const regex = /\$\$(.*?)\$\$|\$(.*?)\$/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          value: text.substring(lastIndex, match.index)
        });
      }

      if (match[1] !== undefined) {
        // Block math
        parts.push({
          type: 'math',
          value: match[1],
          displayMode: true
        });
      } else if (match[2] !== undefined) {
        // Inline math
        parts.push({
          type: 'math',
          value: match[2],
          displayMode: false
        });
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push({
        type: 'text',
        value: text.substring(lastIndex)
      });
    }

    return parts;
  };

  const renderPart = (part, index) => {
    if (part.type === 'math') {
      try {
        const html = katex.renderToString(part.value, {
          displayMode: part.displayMode,
          throwOnError: false
        });
        return (
          <span
            key={index}
            className={part.displayMode ? 'katex-block-wrapper my-2 block text-center' : 'katex-inline-wrapper'}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      } catch (err) {
        return <code key={index} className="text-red-400">${part.value}$</code>;
      }
    }

    // Simple markdown formatting for bold (**text**) and italic (*text*)
    const formattedText = part.value
      .split('\n')
      .map((line, lIdx) => {
        let textLine = line
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        return (
          <React.Fragment key={lIdx}>
            <span dangerouslySetInnerHTML={{ __html: textLine }} />
            {lIdx < part.value.split('\n').length - 1 && <br />}
          </React.Fragment>
        );
      });

    return <span key={index}>{formattedText}</span>;
  };

  const parts = parseMathText(content);

  return (
    <div className={`math-render-container ${className}`}>
      {parts.map((part, index) => renderPart(part, index))}
    </div>
  );
};
