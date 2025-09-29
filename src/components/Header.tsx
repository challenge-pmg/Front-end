import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Header(){
  return (
    <header className="bg-white shadow sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">TeleSaúde HC</Link>
        <nav className="space-x-3 hidden md:block">
          <NavLink to="/" className={({isActive}) => isActive? 'text-teal-600 font-semibold' : 'text-slate-700'} end>Home</NavLink>
          <NavLink to="/solucao" className={({isActive}) => isActive? 'text-teal-600 font-semibold' : 'text-slate-700'}>Solução</NavLink>
          <NavLink to="/faq" className={({isActive}) => isActive? 'text-teal-600 font-semibold' : 'text-slate-700'}>FAQ</NavLink>
          <NavLink to="/integrantes" className={({isActive}) => isActive? 'text-teal-600 font-semibold' : 'text-slate-700'}>Integrantes</NavLink>
          <NavLink to="/contato" className={({isActive}) => isActive? 'text-teal-600 font-semibold' : 'text-slate-700'}>Contato</NavLink>
        </nav>
        <div className="md:hidden">
          <button className="p-2 rounded bg-slate-100">Menu</button>
        </div>
      </div>
    </header>
  )
}
