import React from 'react'
import Link from 'next/link'

export default function Navigation() {
  return (
    <nav>
        <div>
            <Link href="/">Shocker Mechanical</Link>
        </div>
        <div>
            <ul>
                <li>Services</li>
                <li>Performance</li>
                <li><Link href='/contact'>Contact</Link></li>
                <li>Search</li>
            </ul>
        </div>
    </nav>
  )
}
