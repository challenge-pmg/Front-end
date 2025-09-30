import React, { useState, useEffect } from "react"; // ADICIONE ESTES IMPORTS
import { FaStethoscope, FaVideo, FaClock, FaShieldAlt, FaUserMd, FaMobileAlt, FaArrowRight, FaStar } from "react-icons/fa";
import { usePageTitle } from "../hooks/usePageTitle";

export default function Home() {
  usePageTitle("Início");

  // useState PARA CONTROLAR ESTADOS
  const [activeFeature, setActiveFeature] = useState<number>(0);
  const [showTestimonial, setShowTestimonial] = useState<boolean>(true);
  const [specialtyCount, setSpecialtyCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // useEffect PARA SIDEEFFECTS
  useEffect(() => {
    // Simular loading inicial
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // useEffect para animação do contador de especialidades
  useEffect(() => {
    if (specialtyCount < 15) {
      const timer = setTimeout(() => {
        setSpecialtyCount(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [specialtyCount]);

  // useState PARA DADOS DINÂMICOS
  const [testimonials] = useState([
    {
      id: 1,
      name: "Maria Silva",
      text: "Atendimento excelente! A doutora foi muito atenciosa e resolveu meu problema sem eu precisar sair de casa.",
      rating: 5
    },
    {
      id: 2, 
      name: "João Santos",
      text: "Rápido e eficiente. Em 10 minutos já tinha minha receita digital. Recomendo!",
      rating: 4
    },
    {
      id: 3,
      name: "Ana Oliveira",
      text: "Surpreendente! A qualidade do atendimento é a mesma do consultório físico.",
      rating: 5
    }
  ]);

  const features = [
    {
      icon: <FaVideo className="text-3xl" />,
      title: "Consultas por Videochamada",
      description: "Atendimento médico de qualidade no conforto da sua casa"
    },
    {
      icon: <FaClock className="text-3xl" />,
      title: "Agendamento 24/7", 
      description: "Marque sua consulta a qualquer hora do dia ou noite"
    },
    {
      icon: <FaShieldAlt className="text-3xl" />,
      title: "Segurança de Dados",
      description: "Seus dados médicos protegidos com criptografia avançada"
    },
    {
      icon: <FaUserMd className="text-3xl" />,
      title: "Especialistas Qualificados",
      description: "Corpo clínico do Hospital das Clínicas à sua disposição"
    },
    {
      icon: <FaMobileAlt className="text-3xl" />,
      title: "App Mobile",
      description: "Acesse pelo celular com toda funcionalidade"
    },
    {
      icon: <FaStethoscope className="text-3xl" />,
      title: "Multi-especialidades",
      description: `Mais de ${specialtyCount} especialidades médicas disponíveis`
    }
  ];

  const stats = [
    { number: "10K+", label: "Pacientes Atendidos" },
    { number: "50+", label: "Médicos Especialistas" }, 
    { number: "24/7", label: "Atendimento" },
    { number: "98%", label: "Satisfação" }
  ];

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-blue-600 text-lg">Carregando TeleSaúde HC...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Cuidando de Você, 
              <span className="block text-blue-200">Onde Estiver</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
              Telemedicina de excelência do Hospital das Clínicas. 
              Consultas online com os melhores especialistas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                // useState no click - poderíamos adicionar aqui
                onClick={() => setShowTestimonial(!showTestimonial)}
              >
                Agendar Consulta <FaArrowRight />
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
                Conhecer Mais
              </button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto">
            <path 
              fill="white" 
              d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,74.7C1120,75,1280,53,1360,42.7L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Testimonial Banner - Controlado por useState */}
      {showTestimonial && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mx-4 mt-4 rounded-lg">
          <div className="flex justify-between items-center">
            <p className="text-green-700">
              <strong>🌟 Depoimento:</strong> "{testimonials[0].text}" - {testimonials[0].name}
            </p>
            <button 
              onClick={() => setShowTestimonial(false)}
              className="text-green-600 hover:text-green-800 ml-4"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <section className="bg-white py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section com interatividade useState */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Por que Escolher o <span className="text-blue-600">TeleSaúde HC</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Combinamos tecnologia de ponta com expertise médica para oferecer 
              a melhor experiência em telemedicina
            </p>
            
            {/* Controle de feature ativa com useState */}
            <div className="flex justify-center space-x-4 mt-8">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeFeature === index ? 'bg-blue-600 w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100 group ${
                  index === activeFeature ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className="text-blue-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Depoimentos com useState */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            O que Nossos Pacientes Dizem
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-50 rounded-2xl p-6">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-4">"{testimonial.text}"</p>
                <p className="text-gray-800 font-semibold">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resto do código permanece igual */}
      {/* How It Works, CTA Section, Specialties Preview */}
      
      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Como Funciona em 4 Passos
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { step: "1", title: "Cadastro Rápido", desc: "Crie sua conta em 2 minutos" },
              { step: "2", title: "Escolha o Especialista", desc: "Selecione médico e horário" },
              { step: "3", title: "Consulta Online", desc: "Atendimento por videochamada" },
              { step: "4", title: "Acompanhamento", desc: "Receba receitas e exames" }
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-blue-200"></div>
                )}
                
                <div className="bg-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-lg relative z-10">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Pronto para Sua Primeira Consulta Online?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de pacientes que já experimentaram 
            a comodidade da telemedicina com qualidade Hospital das Clínicas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Começar Agora
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
              Falar com Atendente
            </button>
          </div>
        </div>
      </section>

      {/* Specialties Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Especialidades Disponíveis
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {[
              "Cardiologia", "Dermatologia", "Pediatria", 
              "Psiquiatria", "Ortopedia", "Ginecologia"
            ].map((especialidade, index) => (
              <div key={index} className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-shadow">
                <div className="text-blue-500 font-semibold">
                  {especialidade}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}