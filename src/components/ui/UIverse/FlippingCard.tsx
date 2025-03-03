"use client"
import { type ReactNode } from "react";
import './flippingCard.css'
interface FlippingCardProps {
    childrenOne: ReactNode;
    childrenTwo: ReactNode;
  }
const FlippingCard: React.FC<FlippingCardProps> = ({ childrenOne, childrenTwo }) => {
  return (
/* From Uiverse.io by vamsidevendrakumar */ 
<div className="card">
  <div className="card-inner">
    <div className="card-front">
      {childrenOne}
    </div>
    <div className="card-back">
      {childrenTwo}
    </div>
  </div>
</div>
  )
}

export default FlippingCard