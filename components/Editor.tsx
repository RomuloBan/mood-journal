'use client'

import { useState } from "react"

const Editor = ({entry}) => {
  const [content, setContent] = useState(entry.content)
  return (
    <div className="w-full h-full">
      <textarea 
        className="w-full h-full p-8 text-xl outline-none" 
        value={content} 
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  )
}
  

export default Editor