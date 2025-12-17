import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/layout/Header/Header'
import SearchInput from './components/ui/SearchInput/SearchInput'
import Filter from './components/ui/Filter/Filter'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home'
import ThemeContext from './contexts/ThemeContext'

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Get preferred theme
    let mode = 'light';
    if(window.matchMedia('(prefers-color-scheme: dark)')?.matches) {
      mode = 'dark';
    }
    setTheme(mode)
  }, []);

  return (
    <BrowserRouter>
      <ThemeContext.Provider value={theme}>
        <div className={`wrapper ${theme === 'dark' && 'dark'}`}>
          <Header />
          <main className='container' style={{ paddingBlock: 20 }}>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='*' element={<div>ERROR!</div>} />
            </Routes>
          </main>
        </div>
      </ThemeContext.Provider>
    </BrowserRouter>
  )
}

export default App
