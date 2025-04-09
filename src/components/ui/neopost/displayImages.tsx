"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent } from "~/components/ui/dialog"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { cn } from '~/lib/utils'

type Props = {
  media: string[]
}

export default function DisplayImages({ media }: Props) {
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setShowImageDialog(true);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % (media?.length ?? 0));
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + (media?.length ?? 0)) % (media?.length ?? 0));
  };

  return (
    <>
      <div className={cn(
        'w-full overflow-hidden',
        media.length === 1 ? 'h-[500px]' : 'grid gap-1',
        media.length === 2 ? 'grid-cols-2' : '',
        media.length >= 3 ? 'grid-cols-2' : ''
      )}>
        {media.length > 0 && media.map((src, index) => {
          if (index > 3 && media.length > 4) return null;
          
          return (
            <div
              key={index}
              className={cn(
                'relative cursor-pointer',
                media.length === 1 ? 'h-[500px]' : 'h-64',
                index === 3 && media.length > 4 ? 'relative' : ''
              )}
              onClick={() => handleImageClick(index)}
            >
              <Image
                src={src}
                alt={`media-${index}`}
                layout='fill'
                objectFit='cover'
                className={index === 3 && media.length > 4 ? 'brightness-50' : ''}
              />
              {index === 3 && media.length > 4 && (
                <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
                  +{media.length - 4}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent className="sm:max-w-[90vw] h-[90vh] p-0 border-none bg-black/95">
          <button
            onClick={() => setShowImageDialog(false)}
            className="absolute right-4 top-4 text-white z-10 hover:bg-white/10 rounded-full p-2"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative w-full h-full flex items-center justify-center">
            {media[currentImageIndex] && (
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={media[currentImageIndex]}
                  alt={`media-${currentImageIndex}`}
                  fill
                  className="object-contain"
                  quality={100}
                  priority
                />
              </div>
            )}
            {media.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 rounded-full p-2 transition-all"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 rounded-full p-2 transition-all"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
              </>
            )}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full">
              {currentImageIndex + 1} / {media.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}