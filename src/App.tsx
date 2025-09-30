import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Sobre from './pages/Sobre' // ADICIONE ESTA LINHA
import FAQ from './pages/FAQ'
import Integrantes from './pages/Integrantes'
import Contato from './pages/Contato'

export default function App(){
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/sobre" element={<Sobre/>} /> {/* ADICIONE ESTA ROTA */}
          <Route path="/faq" element={<FAQ/>} />
          <Route path="/integrantes" element={<Integrantes/>} />
          <Route path="/contato" element={<Contato/>} />
        </Routes>
      </main>
    </div>
  )
}