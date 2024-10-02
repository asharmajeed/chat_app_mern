import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
      <div className='p-4 h-screen flex items-center justify-center'>
        <Outlet/>
        <Toaster/>
      </div>
    </>
  )
}

export default App