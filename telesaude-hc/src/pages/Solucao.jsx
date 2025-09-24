import "../styles/solucao.css";

const components = [
  {
    title: "Bot de WhatsApp",
    description:
      "Atendimento inicial automatizado via WhatsApp, permitindo que os pacientes iniciem o processo de agendamento a qualquer momento, 24 horas por dia.",
    items: ["Respostas instantâneas", "Coleta de informações básicas", "Verificação de elegibilidade", "Agendamento automático"],
  },
  {
    title: "Bot de Conversa",
    description:
      "Assistente virtual integrado ao site, oferecendo suporte imediato e personalizado para os pacientes que preferem iniciar o contato pela web.",
    items: ["Suporte instantâneo", "Respostas personalizadas", "Suporte multilíngue", "Integração com agendamento"],
  },
  {
    title: "Sistema de Agendamento",
    description:
      "Plataforma inteligente que gerencia a agenda dos médicos, otimizando o tempo e garantindo o melhor aproveitamento dos recursos disponíveis.",
    items: ["Agenda integrada", "Confirmação automática", "Lembretes por WhatsApp", "Reagendamento fácil"],
  },
  {
    title: "Plataforma de Teleconsulta",
    description:
      "Ambiente seguro e intuitivo para realização das consultas online, com recursos que facilitam a interação entre médico e paciente.",
    items: ["Videoconferência HD", "Compartilhamento de arquivos", "Prontuário digital", "Receitas eletrônicas"],
  },
  {
    title: "Benefícios",
    description:
      "Nossa solução traz diversos benefícios tanto para os pacientes quanto para o Hospital das Clínicas, transformando a experiência de atendimento.",
    items: ["Redução de filas", "Economia de tempo", "Maior acesso à saúde", "Otimização de recursos"],
  },
];

const steps = [
  {
    number: "1",
    title: "Primeiro Contato",
    description: "O paciente inicia o atendimento através do WhatsApp ou bot de conversa do site",
  },
  {
    number: "2",
    title: "Coleta de Dados",
    description: "O bot coleta informações básicas e verifica a elegibilidade do paciente",
  },
  {
    number: "3",
    title: "Agendamento",
    description: "Sistema agenda a consulta e envia confirmação por WhatsApp",
  },
  {
    number: "4",
    title: "Consulta",
    description: "Paciente e médico se conectam na plataforma de teleconsulta",
  },
];

const Solucao = () => (
  <main>
    <section className="hero">
      <div className="hero-bg" role="img" aria-label="Sistema de telemedicina em funcionamento" />
      <div className="container">
        <div className="hero-content">
          <h1>Nossa Solução</h1>
          <p>Conheça a tecnologia por trás do TeleSaúde HC</p>
        </div>
      </div>
    </section>

    <div id="main-content">
      <section className="intro">
        <div className="container">
          <p>
            O TeleSaúde HC é uma solução completa que integra inteligência artificial, automação e atendimento humanizado
            para revolucionar o acesso à saúde pública. Nossa plataforma foi desenvolvida para atender às necessidades específicas
            do Hospital das Clínicas, garantindo eficiência e qualidade no atendimento.
          </p>
        </div>
      </section>

      <section className="solucao">
        <div className="container">
          <h2>Componentes da Solução</h2>
          <div className="solucao-grid">
            {components.map((component) => (
              <div className="solucao-item" key={component.title}>
                <h3>{component.title}</h3>
                <p>{component.description}</p>
                <ul>
                  {component.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fluxo">
        <div className="container">
          <h2>Como Funciona</h2>
          <div className="fluxo-steps">
            {steps.map((step) => (
              <div className="fluxo-step" key={step.number}>
                <div className="step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  </main>
);

export default Solucao;
