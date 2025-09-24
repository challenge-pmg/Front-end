import "../styles/integrantes.css";

const teamMembers = [
  {
    initials: "MB",
    name: "Murilo Bastos",
    rm: "RM561287",
    turma: "1TDSPW",
    github: "https://github.com/murilobast",
    email: "mailto:iam@murilobastos.com",
  },
  {
    initials: "PH",
    name: "Pedro Henrique",
    rm: "RM562312",
    turma: "1TDSPW",
    github: "https://github.com/pedrinzz10",
    email: "mailto:opedro485@gmail.com",
  },
  {
    initials: "GL",
    name: "Guilherme Lisboa",
    rm: "RM565187",
    turma: "1TDSPW",
    github: "https://github.com/guilisboa",
    email: "mailto:guilisboadl@gmail.com",
  },
];

const Integrantes = () => (
  <main>
    <section className="hero">
      <div className="hero-bg" role="img" aria-label="Equipe de desenvolvimento em ambiente hospitalar" />
      <div className="container">
        <div className="hero-content">
          <h1>Nossa Equipe</h1>
          <p>Conheça os talentos por trás do projeto</p>
        </div>
      </div>
    </section>

    <div id="main-content">
      <section className="team">
        <div className="container">
          <div className="team-intro">
            <p>
              O projeto TeleSaúde HC é desenvolvido por uma equipe de estudantes da FIAP, unidos pelo objetivo comum de
              contribuir para a melhoria do acesso à saúde pública. Cada membro traz sua visão única e dedicação para criar
              uma solução que faça a diferença na vida das pessoas.
            </p>
          </div>
          <div className="team-grid">
            {teamMembers.map((member) => (
              <div className="team-member" key={member.name}>
                <div className="avatar">{member.initials}</div>
                <h3>{member.name}</h3>
                <p>{member.rm}</p>
                <p>{member.turma}</p>
                <div className="social-links">
                  <a href={member.github} target="_blank" rel="noreferrer" aria-label={`GitHub de ${member.name}`}>
                    <img src="/assets/images/github.svg" alt="GitHub" />
                  </a>
                  <a href={member.email} aria-label={`E-mail de ${member.name}`}>
                    <img src="/assets/images/email.svg" alt="E-mail" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  </main>
);

export default Integrantes;
