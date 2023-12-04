import Link from 'next/link'


import './styles/error.css'

export default function NotFound() {
  return (
    <div className="errorPage">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}


