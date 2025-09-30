import React from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaEnvelope, FaPhone, FaComment, FaPaperPlane } from "react-icons/fa";

interface ContactFormData {
  nome: string;
  email: string;
  telefone: string;
  mensagem: string;
}

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    // Simulando envio para API
    console.log("Dados do formulário:", data);
    
    // Aqui você integraria com sua API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert("Mensagem enviada com sucesso!");
    reset();
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Entre em Contato
      </h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Campo Nome */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <FaUser className="mr-2 text-blue-500" />
            Nome Completo
          </label>
          <input
            {...register("nome", {
              required: "Nome é obrigatório",
              minLength: {
                value: 3,
                message: "Nome deve ter pelo menos 3 caracteres"
              }
            })}
            type="text"
            placeholder="Seu nome completo"
            className={`w-full p-4 border rounded-xl focus:ring-2 focus:border-transparent transition-all ${
              errors.nome 
                ? "border-red-500 focus:ring-red-200" 
                : "border-gray-300 focus:ring-blue-200"
            }`}
          />
          {errors.nome && (
            <p className="text-red-500 text-sm mt-2 flex items-center">
              ⚠️ {errors.nome.message}
            </p>
          )}
        </div>

        {/* Campo Email */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <FaEnvelope className="mr-2 text-blue-500" />
            Email
          </label>
          <input
            {...register("email", {
              required: "Email é obrigatório",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido"
              }
            })}
            type="email"
            placeholder="seu@email.com"
            className={`w-full p-4 border rounded-xl focus:ring-2 focus:border-transparent transition-all ${
              errors.email 
                ? "border-red-500 focus:ring-red-200" 
                : "border-gray-300 focus:ring-blue-200"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-2 flex items-center">
              ⚠️ {errors.email.message}
            </p>
          )}
        </div>

        {/* Campo Telefone */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <FaPhone className="mr-2 text-blue-500" />
            Telefone
          </label>
          <input
            {...register("telefone", {
              required: "Telefone é obrigatório",
              pattern: {
                value: /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/,
                message: "Telefone inválido (ex: (11) 99999-9999)"
              }
            })}
            type="tel"
            placeholder="(11) 99999-9999"
            className={`w-full p-4 border rounded-xl focus:ring-2 focus:border-transparent transition-all ${
              errors.telefone 
                ? "border-red-500 focus:ring-red-200" 
                : "border-gray-300 focus:ring-blue-200"
            }`}
          />
          {errors.telefone && (
            <p className="text-red-500 text-sm mt-2 flex items-center">
              ⚠️ {errors.telefone.message}
            </p>
          )}
        </div>

        {/* Campo Mensagem */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <FaComment className="mr-2 text-blue-500" />
            Mensagem
          </label>
          <textarea
            {...register("mensagem", {
              required: "Mensagem é obrigatória",
              minLength: {
                value: 10,
                message: "Mensagem deve ter pelo menos 10 caracteres"
              },
              maxLength: {
                value: 500,
                message: "Mensagem muito longa (máx. 500 caracteres)"
              }
            })}
            rows={5}
            placeholder="Como podemos ajudar você?"
            className={`w-full p-4 border rounded-xl focus:ring-2 focus:border-transparent transition-all resize-none ${
              errors.mensagem 
                ? "border-red-500 focus:ring-red-200" 
                : "border-gray-300 focus:ring-blue-200"
            }`}
          />
          {errors.mensagem && (
            <p className="text-red-500 text-sm mt-2 flex items-center">
              ⚠️ {errors.mensagem.message}
            </p>
          )}
        </div>

        {/* Botão de Envio */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-3 ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 hover:scale-105 shadow-lg"
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Enviando...
            </>
          ) : (
            <>
              <FaPaperPlane />
              Enviar Mensagem
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;