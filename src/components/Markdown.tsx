import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

interface MarkdownProps {
    content: string;
}

const Markdown: React.FC<MarkdownProps> = ({ content }) => {
    return (
        <ReactMarkdown
            children={content}
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
        />
    );
};

export default Markdown;