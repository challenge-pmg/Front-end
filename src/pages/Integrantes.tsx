import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Integrantes() {
  const integrantes = [
    {
      nome: "Guilherme Lisboa Silva",
      rm: "RM565187",
      turma: "1TDSPW",
      github: "https://github.com/guilisbooa",
      linkedin: "https://linkedin.com/in/seu-linkedin",
    },
    {
      nome: "Pedro Henrique de Oliveira",
      rm: "RM562312",
      turma: "1TDSPW",
      github: "https://github.com/seu-github",
      linkedin: "https://linkedin.com/in/seu-linkedin",
    },
    {
      nome: "Rafael Rodrigues Trindade",
      rm: "RM564303",
      turma: "1TDS",
      github: "https://github.com/seu-github",
      linkedin: "https://linkedin.com/in/seu-linkedin",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Integrantes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {integrantes.map((aluno, idx) => (
          <div
            key={idx}
            className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-800">{aluno.nome}</h3>
            <p className="text-gray-600 mt-2">{aluno.rm} - {aluno.turma}</p>

            <div className="flex space-x-4 mt-4">
              <a
                href={aluno.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-black text-2xl"
              >
                <FaGithub />
              </a>
              <a
                href={aluno.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-2xl"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}