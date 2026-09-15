import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
export function CodeBlock({code,language}:{code:string;language?:string}){
 const [copied,setCopied]=useState(false);
 async function copy(){await navigator.clipboard?.writeText(code);setCopied(true);setTimeout(()=>setCopied(false),1200)}
 return <div className="code-block"><div className="code-header"><span>{language||'code'}</span><button onClick={copy}>{copied?<Check size={14}/>:<Copy size={14}/>} {copied?'Copied':'Copy'}</button></div><pre><code>{code}</code></pre></div>
}
