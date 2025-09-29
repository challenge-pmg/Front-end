import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

// Interface para TypeScript
interface Integrante {
  nome: string;
  rm: string;
  turma: string;
  github: string;
  linkedin: string;
}

export default function Integrantes() {
  const integrantes: Integrante[] = [
    {
      nome: "Guilherme Lisboa Silva",
      rm: "RM565187",
      turma: "1TDSPW",
      github: "https://github.com/guilisbooa",
      linkedin: "https://linkedin.com/in/guilherme-lisboa",
    },
    {
      nome: "Pedro Henrique de Oliveira",
      rm: "RM562312",
      turma: "1TDSPW",
      github: "https://github.com/pedrohenrique",
      linkedin: "https://linkedin.com/in/pedro-henrique",
    },
    {
      nome: "Rafael Rodrigues Trindade",
      rm: "RM564303",
      turma: "1TDSPJ",
      github: "https://github.com/rafaeltrindade",
      linkedin: "https://linkedin.com/in/rafael-trindade",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        {/* Header Melhorado */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Nossa Equipe
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conheça os desenvolvedores por trás do TeleSaúde HC
          </p>
        </div>

        {/* Grid de Integrantes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {integrantes.map((integrante, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100"
            >
              {/* Avatar */}
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white text-2xl font-bold">
                    {integrante.nome.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>

              {/* Informações */}
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {integrante.nome}
                </h3>
                <div className="space-y-1 mb-6">
                  <p className="text-gray-600 bg-gray-50 rounded-lg py-1 px-3 inline-block">
                    {integrante.rm}
                  </p>
                  <p className="text-gray-600 bg-blue-50 rounded-lg py-1 px-3 inline-block">
                    {integrante.turma}
                  </p>
                </div>

                {/* Redes Sociais */}
                <div className="flex justify-center space-x-4 pt-4 border-t border-gray-100">
                  <a
                    href={integrante.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors group"
                    title="GitHub"
                  >
                    <FaGithub className="text-gray-700 group-hover:text-black text-lg" />
                  </a>
                  <a
                    href={integrante.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors group"
                    title="LinkedIn"
                  >
                    <FaLinkedin className="text-blue-600 group-hover:text-blue-800 text-lg" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer da Página */}
        <div className="text-center mt-12">
          <p className="text-gray-500">
            Projeto desenvolvido para o Challenge FIAP 2025 - 2º Semestre
          </p>
        </div>
      </div>
    </div>
  );
}