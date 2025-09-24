import { useState } from "react";
import "../styles/faq.css";

const FAQ_ITEMS = [
  {
    question: "O que é teleconsulta?",
    answer:
      "A teleconsulta é uma consulta médica realizada de forma remota, através de videoconferência. O paciente e o médico se conectam pela internet, permitindo que a consulta seja realizada sem a necessidade de deslocamento.",
  },
  {
    question: "Como agendar uma teleconsulta?",
    answer:
      "Você pode agendar sua teleconsulta através do SUS Digital ou pela Central de Atendimento do Hospital das Clínicas. O agendamento é simples e rápido, e você receberá todas as instruções por e-mail.",
  },
  {
    question: "Quais equipamentos preciso para fazer uma teleconsulta?",
    answer:
      "Você precisará de um computador, tablet ou smartphone com câmera e microfone, além de uma conexão estável com a internet. Recomendamos também um ambiente silencioso e bem iluminado para melhor qualidade da consulta.",
  },
  {
    question: "A teleconsulta é segura?",
    answer:
      "Sim, a teleconsulta é totalmente segura. Utilizamos uma plataforma de videoconferência criptografada, que protege a privacidade e a confidencialidade das informações trocadas durante a consulta.",
  },
  {
    question: "Posso receber receitas médicas na teleconsulta?",
    answer:
      "Sim, você receberá suas receitas médicas digitalmente, com a mesma validade das receitas tradicionais. O documento será enviado por e-mail logo após a consulta.",
  },
  {
    question: "E se o médico solicitar exames?",
    answer:
      "Se houver necessidade de exames, o médico irá solicitar e você receberá os encaminhamentos digitalmente. Os exames podem ser realizados em qualquer unidade do SUS mais próxima de você.",
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleItem = (index) => {
    setActiveIndex((current) => (current === index ? null : index));
  };

  return (
    <main>
      <section className="hero">
        <div className="hero-bg" role="img" aria-label="Paciente com dúvidas sobre teleconsulta" />
        <div className="container">
          <div className="hero-content">
            <h1>Perguntas Frequentes</h1>
            <p>Tire suas dúvidas sobre o serviço de teleconsulta</p>
          </div>
        </div>
      </section>

      <div id="main-content">
        <section className="faq">
          <div className="container">
            <div className="faq-list">
              {FAQ_ITEMS.map((item, index) => {
                const isActive = activeIndex === index;
                return (
                  <div className={`faq-item${isActive ? " active" : ""}`} key={item.question}>
                    <button
                      className="faq-question"
                      aria-expanded={isActive}
                      onClick={() => toggleItem(index)}
                    >
                      {item.question}
                      <span className="icon">{isActive ? "−" : "+"}</span>
                    </button>
                    <div className="faq-answer">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Faq;
