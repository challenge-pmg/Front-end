import React from 'react'

const items = [
  {q: 'O que é TeleSaúde HC?', a: 'Plataforma de agendamento e teleconsultas.'},
  {q: 'Como agendar?', a: 'Acesse a página de solução e siga o fluxo de agendamento.'}
]

export default function FAQ(){
  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">FAQ</h2>
      <div className="space-y-4">
        {items.map((it,idx)=>(
          <div key={idx} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">{it.q}</h3>
            <p className="text-slate-600 text-sm">{it.a}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
