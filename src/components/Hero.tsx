import React from 'react'

export default function Hero(){
  return (
    <section className="container mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">TeleSaúde HC - Sua consulta mais perto de você</h1>
        <p className="text-slate-600 mb-6">Plataforma para agendamento e teleconsultas com foco em facilitar o acesso à saúde.</p>
        <div className="space-x-3">
          <a href="#contato" className="inline-block bg-teal-500 text-white px-4 py-2 rounded">Entrar em contato</a>
          <a href="/solucao" className="inline-block border border-slate-300 px-4 py-2 rounded">Ver solução</a>
        </div>
      </div>
      <div className="rounded-lg overflow-hidden shadow-lg">
        <img src="/assets/images/hero.jpeg" alt="hero" className="w-full h-64 object-cover"/>
      </div>
    </section>
  )
}
