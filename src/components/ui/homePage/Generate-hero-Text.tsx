"use client";

import { TextGenerateEffect } from "../UIverse/text-generation/text-generate-effect";



export function TextGenerateEffectDemo({text}:{text:string}) {
  return <TextGenerateEffect  className='text-5xl text-center font-semibold' words={text} />;
}
