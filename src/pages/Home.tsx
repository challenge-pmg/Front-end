import React from 'react'
import Hero from '../components/Hero'
import Card from '../components/Card'

export default function Home(){
  return (
    <div>
      <Hero />
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Nossas funcionalidades</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card title="Agendamento">Agende consultas e receba confirmação por e-mail.</Card>
          <Card title="Teleconsultas">Atendimento remoto com vídeo.</Card>
          <Card title="Histórico">Acompanhe seu histórico de consultas.</Card>
        </div>
      </section>
    </div>
  )
}
