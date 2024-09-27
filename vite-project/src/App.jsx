import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SendSMS from './SendSms'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     
<SendSMS/>
    </>
  )
}

export default App
