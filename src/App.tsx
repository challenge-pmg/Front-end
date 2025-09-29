import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Integrantes from './pages/Integrantes'
import FAQ from './pages/FAQ'
import Contato from './pages/Contato'
import Solucao from './pages/Solucao'
import Header from './components/Header'
import Footer from './components/Footer'

export default function App(){
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/integrantes" element={<Integrantes/>} />
          <Route path="/faq" element={<FAQ/>} />
          <Route path="/contato" element={<Contato/>} />
          <Route path="/solucao" element={<Solucao/>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
