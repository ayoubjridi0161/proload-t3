"use client"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import {main} from "~/lib/ai-copilot"
type Props = {}

export default function AiResponse({}: Props) {
    const [text, setText] = useState("")
    const handleSubmit = async () => {
        try {
            setText("") // Clear previous text
            const stream = await main() 
            if(!stream) return null// Assuming main() now returns a stream
            // for await (const chunk of stream) {
            //     setText(prev => prev + chunk.text)
            // }
            setText(stream)
        } catch(err) {
            console.log(err)
        }
    }

  return (
<div>
    <Button onClick={handleSubmit}>
        generateText
    </Button>
    <p>{text}</p>
</div>
  )
}