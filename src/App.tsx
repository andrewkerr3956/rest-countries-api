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
import CountryDetailsPage from './pages/countries/[countryCode]'

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Get preferred theme
    let mode = 'light';
    if (window.matchMedia('(prefers-color-scheme: dark)')?.matches) {
      mode = 'dark';
    }
    setTheme(mode)
  }, []);

  const handleChangeTheme = (theme: string) => {
    setTheme(theme);
  }

  return (
    <BrowserRouter>
      <ThemeContext.Provider value={theme}>
        <div className={`wrapper ${theme === 'dark' && 'dark'}`}>
          <Header theme={theme} onThemeChange={handleChangeTheme} />
          <main className='container' style={{ paddingBlock: 20 }}>
            <Routes>
              <Route path='/countries/:countryCode' element={<CountryDetailsPage />} />
              <Route path='/' element={<HomePage />} />
              <Route path='*' element={<div>ERROR!</div>} />
            </Routes>
          </main>
        </div>
      </ThemeContext.Provider>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
      <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap" rel="stylesheet" />
    </BrowserRouter>
  )
}

export default App
