import React from "react";
import {
  FaHeartbeat,
  FaUserMd,
  FaMobileAlt,
  FaShieldAlt,
  FaRocket,
  FaUsers,
} from "react-icons/fa";
import { usePageTitle } from "../hooks/usePageTitle";

const Sobre = () => {
  usePageTitle("Sobre");

  const stats = [
    { icon: <FaUserMd className="text-3xl" />, number: "50+", label: "Médicos Especialistas" },
    { icon: <FaUsers className="text-3xl" />, number: "10.000+", label: "Pacientes Atendidos" },
    { icon: <FaMobileAlt className="text-3xl" />, number: "24/7", label: "Disponibilidade" },
    { icon: <FaHeartbeat className="text-3xl" />, number: "15+", label: "Especialidades" },
  ];

  const valores = [
    {
      icon: "💙",
      title: "Humanização",
      description:
        "Colocamos o paciente no centro de tudo que fazemos, com atendimento humanizado e empático.",
    },
    {
      icon: "🚀",
      title: "Inovação",
      description:
        "Utilizamos tecnologia de ponta para revolucionar o acesso à saúde no Brasil.",
    },
    {
      icon: "🛡️",
      title: "Confiança",
      description:
        "Mantemos os mais altos padrões de segurança e ética médica em todos os atendimentos.",
    },
    {
      icon: "🌍",
      title: "Acessibilidade",
      description:
        "Democratizamos o acesso à saúde de qualidade, removendo barreiras geográficas e financeiras.",
    },
  ];

  const timeline = [
    {
      year: "2024",
      title: "Fundação",
      description:
        "Criação do TeleSaúde HC com parceria do Hospital das Clínicas.",
    },
    {
      year: "2025",
      title: "Expansão",
      description:
        "Ampliação para 15 especialidades e atendimento em todo o Brasil.",
    },
    {
      year: "2026",
      title: "Inovação",
      description:
        "Implementação de IA para triagem e diagnóstico assistido.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Sobre o <span className="text-blue-600">TeleSaúde HC</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto">
            Uma revolução na forma de cuidar da saúde, combinando a excelência médica 
            do Hospital das Clínicas com a conveniência da tecnologia moderna.
          </p>
          <div className="bg-blue-50 rounded-2xl p-6 inline-block">
            <p className="text-lg text-blue-700 font-semibold">
              🎯 <strong>Missão:</strong> Democratizar o acesso à saúde de qualidade através da telemedicina.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <div className="text-3xl font-bold mb-1">{stat.number}</div>
              <div className="text-blue-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* História */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Nossa História
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                O <strong>TeleSaúde HC</strong> nasceu da necessidade de levar a excelência médica
                do Hospital das Clínicas para além dos limites físicos. Milhões de brasileiros 
                não tinham acesso a especialistas qualificados devido a barreiras geográficas e financeiras.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Em 2024, unimos a tradição e expertise do HC com a tecnologia de ponta em telemedicina,
                criando uma plataforma que conecta pacientes e médicos de forma simples, segura e eficiente.
              </p>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <p className="text-green-700">
                  <strong>💡 Visão:</strong> Ser referência nacional em telemedicina, 
                  impactando positivamente a vida de milhões de brasileiros até 2030.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-2xl p-8 shadow-md">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Nossa Jornada</h3>
              <div className="space-y-6">
                {timeline.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold">
                      {item.year}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-lg">{item.title}</h4>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">Nossos Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {valores.map((valor, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{valor.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {valor.title}
                </h3>
                <p className="text-gray-600">{valor.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Faça Parte Dessa Revolução na Saúde</h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Junte-se aos milhares de pacientes que já descobriram os benefícios da telemedicina 
          com qualidade Hospital das Clínicas.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition">
            Agendar Primeira Consulta
          </button>
          <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition">
            Conhecer Especialistas
          </button>
        </div>
      </section>
    </div>
  );
};

export default Sobre;
