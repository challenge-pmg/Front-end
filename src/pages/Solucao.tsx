import React from 'react'

export default function Solucao(){
  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-4">Solução</h2>
      <p className="text-slate-600 mb-6">Descrição da solução — fluxo de agendamento, arquitetura e telas (copiado do site original).</p>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">Fluxo: Login → Selecionar Especialidade → Agendar → Confirmar</div>
        <div className="bg-white p-4 rounded shadow">Tecnologias: React, Vite, TypeScript, Tailwind</div>
      </div>
    </section>
  )
}
