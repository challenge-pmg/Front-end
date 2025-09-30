import React, { useState } from "react";
import { usePageTitle } from "../hooks/usePageTitle";

const Faq = () => {
  usePageTitle("FAQ");

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = [
    {
      question: "Como agendar uma consulta?",
      answer: "Para agendar uma consulta, basta criar sua conta em nosso site, escolher a especialidade desejada, selecionar um horário disponível e confirmar o agendamento. Todo o processo leva menos de 5 minutos."
    },
    {
      question: "Quais especialidades estão disponíveis?",
      answer: "Oferecemos mais de 15 especialidades médicas, incluindo Cardiologia, Dermatologia, Pediatria, Psiquiatria, Ortopedia, Ginecologia, Endocrinologia e muitas outras. Nossa equipe é composta por profissionais qualificados do Hospital das Clínicas."
    },
    {
      question: "Como funciona a consulta por videochamada?",
      answer: "Após o agendamento, você receberá um link de acesso para a videochamada. Basta clicar no link no horário marcado usando um computador ou smartphone com câmera e microfone. Nossa plataforma é simples e intuitiva."
    },
    {
      question: "Os médicos podem prescrever receitas?",
      answer: "Sim, nossos médicos podem prescrever receitas médicas digitais, que são válidas em todo território nacional. As receitas são enviadas por email imediatamente após a consulta."
    },
    {
      question: "Quais são os valores das consultas?",
      answer: "Nossos preços são acessíveis e variam de acordo com a especialidade. Consultas a partir de R$ 80,00. Aceitamos cartões de crédito, débito e PIX."
    },
    {
      question: "Preciso de algum equipamento específico?",
      answer: "Você precisa de um dispositivo (computador, tablet ou smartphone) com câmera, microfone, alto-falante e conexão estável com a internet. Não é necessário instalar nenhum software adicional."
    }
  ];

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Perguntas Frequentes
            </h1>
            <p className="text-xl text-gray-600">
              Encontre respostas para as dúvidas mais comuns sobre nossos serviços
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-800 text-lg">
                    {item.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      openIndex === index ? "transform rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {openIndex === index && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Não encontrou o que procurava?
              </h3>
              <p className="text-gray-600 mb-6">
                Nossa equipe de atendimento está pronta para ajudar você
              </p>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Entrar em Contato
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
