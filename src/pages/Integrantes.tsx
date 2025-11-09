import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { usePageTitle } from "../hooks/usePageTitle";

export default function Integrantes() {
  usePageTitle("Integrantes");

  const integrantes = [
    {
      nome: "Guilherme Lisboa Silva",
      rm: "RM565187",
      turma: "1TDSPW",
      github: "https://github.com/guilisbooa",
      linkedin: "https://www.linkedin.com/in/guilhermelisboasilva/",
      foto: "https://github.com/guilisbooa.png",
    },
    {
      nome: "Pedro Henrique de Oliveira",
      rm: "RM562312",
      turma: "1TDSPW",
      github: "https://github.com/pedrinzz10",
      linkedin: "https://www.linkedin.com/in/pedro-henrique-oliveira-484336261/",
      foto: "https://github.com/pedrinzz10.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Nossa Equipe</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conheça os desenvolvedores por trás do TeleSaúde HC.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {integrantes.map((integrante, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100"
            >
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 rounded-full shadow-md overflow-hidden border-2 border-white bg-gray-200">
                  <img
                    src={integrante.foto}
                    alt={`Foto de ${integrante.nome}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

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

        <div className="text-center mt-12">
          <p className="text-gray-500">
            Projeto desenvolvido para o Challenge FIAP 2025 - 2º Semestre
          </p>
        </div>
      </div>
    </div>
  );
}
