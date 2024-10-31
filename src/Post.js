import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import ReactMarkdown from 'react-markdown';
import 'codemirror/lib/codemirror.css';

function Post() {
  const [content, setContent] = useState('');
  
  return (
    <div>
      <h2>Write a Post</h2>
      <CodeMirror
        value={content}
        options={{
          mode: 'markdown',
          lineNumbers: true,
        }}
        onBeforeChange={(editor, data, value) => {
          setContent(value);
        }}
      />
      <h3>Preview</h3>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}

export default Post;
