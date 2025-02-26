"use client"
import React from 'react'
import Container from './Container'
import { Line } from 'react-chartjs-2'

type Props = {}

const ChartData = (props: Props) => {
  return (
<Container className="space-y-2 w-full">
<div className="flex min-w-72 flex-1 flex-col gap-2 rounded-xl border border-[#d0e7d1] p-6">
                <p className="text-[#0e1b0e] text-base font-medium leading-normal">Workout frequency per week</p>
                <div className="flex min-h-[180px] flex-1 flex-col gap-8 py-4">
                  <svg width="100%" height="148" viewBox="-3 0 478 150" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path
                      d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H326.769H0V109Z"
                      fill="url(#paint0_linear_1131_5935)"
                    ></path>
                    <path
                      d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
                      stroke="#4e9750"
                      stroke-width="3"
                      stroke-linecap="round"
                    ></path>
                    <defs>
                      <linearGradient id="paint0_linear_1131_5935" x1="236" y1="1" x2="236" y2="149" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#e7f3e8"></stop>
                        <stop offset="1" stop-color="#e7f3e8" stop-opacity="0"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="flex justify-around">
                    <p className="text-[#4e9750] text-[13px] font-bold leading-normal tracking-[0.015em]">Week 1</p>
                    <p className="text-[#4e9750] text-[13px] font-bold leading-normal tracking-[0.015em]">Week 2</p>
                    <p className="text-[#4e9750] text-[13px] font-bold leading-normal tracking-[0.015em]">Week 3</p>
                    <p className="text-[#4e9750] text-[13px] font-bold leading-normal tracking-[0.015em]">Week 4</p>
                  </div>
                </div>
              </div>
          </Container>  )
}

export default ChartData