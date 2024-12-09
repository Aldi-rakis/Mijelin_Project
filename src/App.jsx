import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import icon from '../src/assets/ph_bell (1).png'
 import './App.css'
import Routes from './routes/routes';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
        <Routes />
      
    </>
  )
}

export default App
