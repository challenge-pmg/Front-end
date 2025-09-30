import React from "react";
import ContactForm from "../components/ContactForm";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";

const Contato = () => {
  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="text-2xl" />,
      title: "Endereço",
      content: "Av. Paulista, 1106 - 7º andar - Cerqueira César São Paulo/SPAv. Dr. Enéas de Carvalho Aguiar, 255"
    },
    {
      icon: <FaPhone className="text-2xl" />,
      title: "Telefone",
      content: "(11) 2661-0000"
    },
    {
      icon: <FaEnvelope className="text-2xl" />,
      title: "Email",
      content: "ouvidoria.geral@hc.fm.usp.br"
    },
    {
      icon: <FaClock className="text-2xl" />,
      title: "Horário de Atendimento",
      content: "Segunda a Sexta: 7h às 19h\nSábados: 7h às 13h"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Fale Conosco
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Estamos aqui para ajudar. Entre em contato conosco para tirar dúvidas, 
            agendar consultas ou dar sugestões.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Informações de Contato */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Nossos Canais
            </h2>
            
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="text-blue-500 mt-1">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {info.title}
                    </h3>
                    <p className="text-gray-600 whitespace-pre-line">
                      {info.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Formulário */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contato;