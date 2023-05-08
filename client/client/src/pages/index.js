import Link from 'next/link';
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from './components/navbar';
import Footer from './components/footer';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className='MainContainer'>
        <h2>Sign In before upload a image</h2>
        <p>Click on the top corner, or <Link href="/register"><button>click here</button></Link></p>
      </div>
      <Footer />
    </main>
  )
}