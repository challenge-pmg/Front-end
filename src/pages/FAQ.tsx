import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";

const Faq = () => {
  usePageTitle("FAQ");
  const { id } = useParams<{ id?: string }>();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // DEBUG: Verificar se useParams está funcionando
  console.log("useParams id:", id);
  console.log("Tipo do id:", typeof id);

  // useEffect CORRIGIDO
  useEffect(() => {
    console.log("useEffect executando com id:", id);
    
    if (id && id !== "undefined") {
      const faqIndex = parseInt(id) - 1;
      console.log("FAQ index calculado:", faqIndex);
      
      if (faqIndex >= 0 && faqIndex < faqItems.length) {
        console.log("Abrindo FAQ index:", faqIndex);
        setOpenIndex(faqIndex);
      } else {
        console.log("Index inválido:", faqIndex);
      }
    } else {
      console.log("Sem ID ou ID undefined");
      setOpenIndex(null);
    }
  }, [id]);

  const faqItems = [
    {
      question: "Como agendar uma consulta?",
      answer: "Para agendar uma consulta, basta criar sua conta em nosso site, escolher a especialidade desejada, selecionar um horário disponível e confirmar o agendamento. Todo o processo leva menos de 5 minutos."
    },
    {
      question: "Quais especialidades estão disponíveis?",
      answer: "Oferecemos mais de 15 especialidades médicas, incluindo Cardiologia, Dermatologia, Pediatria, Psiquiatria, Ortopedia, Ginecologia, Endocrinologia e muitas outras."
    },
    {
      question: "Como funciona a consulta por videochamada?",
      answer: "Após o agendamento, você receberá um link de acesso para a videochamada. Basta clicar no link no horário marcado usando um computador ou smartphone com câmera e microfone."
    }
  ];

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header com indicação se tem ID */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Perguntas Frequentes
            </h1>
            <p className="text-xl text-gray-600">
              {id ? `FAQ #${id}` : "Encontre respostas para dúvidas comuns"}
            </p>
            
            {/* DEBUG VISUAL */}
            {id && (
              <div className="mt-4 p-3 bg-green-100 rounded-lg">
                <p className="text-green-700 text-sm">
                  <strong>useParams funcionando!</strong> ID capturado: <code>{id}</code>
                </p>
              </div>
            )}
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all ${
                  openIndex === index ? 'ring-2 ring-blue-500' : ''
                }`}
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

          {/* Links de teste */}
          <div className="mt-8 text-center space-x-4">
            <p className="text-gray-600 mb-2">Teste useParams:</p>
            <Link to="/faq/1" className="text-blue-600 hover:text-blue-800">FAQ 1</Link>
            <Link to="/faq/2" className="text-blue-600 hover:text-blue-800">FAQ 2</Link>
            <Link to="/faq/3" className="text-blue-600 hover:text-blue-800">FAQ 3</Link>
            <Link to="/faq" className="text-gray-600 hover:text-gray-800">Todas FAQs</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;