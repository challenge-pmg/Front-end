import "../styles/home.css";

const Home = () => (
  <main>
    <section className="hero">
      <div className="hero-bg" role="img" aria-label="Hospital com médicos e equipamentos" />
      <div className="container">
        <div className="hero-content">
          <h1>TeleSaúde HC</h1>
          <p>Consultas médicas online do Hospital das Clínicas, mais próximas de você</p>
        </div>
      </div>
    </section>

    <div id="main-content">
      <section className="beneficios">
        <div className="container">
          <h2>Por que escolher a teleconsulta?</h2>
          <div className="cards">
            <div className="card">
              <img src="/assets/images/img1.jpg" alt="Paciente fazendo consulta online" />
              <h3>Economia de tempo</h3>
              <p>Sem necessidade de se deslocar até o hospital, evitando longas filas e esperas</p>
            </div>
            <div className="card">
              <img src="/assets/images/img2.jpg" alt="Paciente em casa usando computador" />
              <h3>Mais conforto</h3>
              <p>Atendimento no conforto da sua casa, sem estresse de deslocamento</p>
            </div>
            <div className="card">
              <img src="/assets/images/img3.jpg" alt="Médico usando computador" />
              <h3>Segurança</h3>
              <p>
                Evite exposição desnecessária em ambientes hospitalares, especialmente importante para pacientes com baixa
                imunidade
              </p>
            </div>
            <div className="card">
              <img src="/assets/images/img4.jpg" alt="Equipe médica trabalhando" />
              <h3>Qualidade</h3>
              <p>Atendimento com os melhores profissionais do HC, garantindo o mesmo padrão de excelência</p>
            </div>
          </div>
        </div>
      </section>

      <section className="como-funciona">
        <div className="container">
          <h2>Como Funciona</h2>
          <div className="passos">
            <div className="passo">
              <div className="numero">1</div>
              <h3>Agendamento</h3>
              <p>Agende sua consulta através do SUS Digital ou Central de Atendimento</p>
            </div>
            <div className="passo">
              <div className="numero">2</div>
              <h3>Preparação</h3>
              <p>Receba instruções por e-mail sobre como se preparar para a consulta</p>
            </div>
            <div className="passo">
              <div className="numero">3</div>
              <h3>Consulta</h3>
              <p>No dia e hora marcados, acesse o link enviado para sua consulta online</p>
            </div>
            <div className="passo">
              <div className="numero">4</div>
              <h3>Acompanhamento</h3>
              <p>Receba seu receituário digital e instruções de acompanhamento</p>
            </div>
          </div>
        </div>
      </section>

      <section className="dicas">
        <div className="container">
          <h2>Dicas para sua Teleconsulta</h2>
          <div className="dicas-grid">
            <div className="dica">
              <h3>Prepare seu ambiente</h3>
              <p>Escolha um local silencioso e bem iluminado para sua consulta</p>
            </div>
            <div className="dica">
              <h3>Teste sua conexão</h3>
              <p>Verifique sua internet e câmera antes da consulta</p>
            </div>
            <div className="dica">
              <h3>Tenha seus documentos</h3>
              <p>Mantenha seu cartão SUS e documentos médicos à mão</p>
            </div>
            <div className="dica">
              <h3>Anote suas dúvidas</h3>
              <p>Prepare uma lista de perguntas para aproveitar melhor a consulta</p>
            </div>
          </div>
        </div>
      </section>

      <section className="depoimentos">
        <div className="container">
          <h2>O que dizem nossos pacientes</h2>
          <div className="depoimentos-grid">
            <div className="depoimento">
              <p>
                "A teleconsulta facilitou muito minha vida. Não precisei me deslocar e fui muito bem atendida."
              </p>
              <cite>Maria Silva, 45 anos</cite>
            </div>
            <div className="depoimento">
              <p>"Excelente atendimento! O médico foi muito atencioso e a consulta foi muito produtiva."</p>
              <cite>João Santos, 62 anos</cite>
            </div>
            <div className="depoimento">
              <p>"Economizei tempo e dinheiro com o transporte. A qualidade do atendimento foi a mesma."</p>
              <cite>Ana Oliveira, 38 anos</cite>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
);

export default Home;
