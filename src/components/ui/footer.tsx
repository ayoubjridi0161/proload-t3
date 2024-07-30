import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className=' w-1/2 mx-auto flex my-10 justify-evenly'>
        <Link href="/">© 2024 Name. All Rights Reserved.</Link>
        <Link href="/">Privacy Policy</Link>
        <Link href="/">Terms of Service</Link>
    </footer>
)
}

export default Footer