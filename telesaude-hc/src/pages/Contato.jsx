import { useState } from "react";
import "../styles/contato.css";

const initialFormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const Contato = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState("");

  const validateField = (name, value) => {
    if (!value.trim()) {
      return "Este campo é obrigatório";
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return "Digite um e-mail válido";
      }
    }

    if (name === "name" && value.trim().length < 3) {
      return "O nome deve ter pelo menos 3 caracteres";
    }

    if (name === "message" && value.trim().length < 10) {
      return "A mensagem deve ter pelo menos 10 caracteres";
    }

    return "";
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: validateField(name, value) }));
    setStatusMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = Object.keys(formData).reduce((acc, key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        acc[key] = error;
      }
      return acc;
    }, {});

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setStatusMessage("Mensagem enviada com sucesso!");
      setFormData(initialFormState);
    }
  };

  return (
    <main>
      <section className="hero">
        <div className="hero-bg" role="img" aria-label="Atendente de telemedicina em atendimento" />
        <div className="container">
          <div className="hero-content">
            <h1>Entre em Contato</h1>
            <p>Estamos aqui para ajudar</p>
          </div>
        </div>
      </section>

      <div id="main-content">
        <section className="contato">
          <div className="container">
            <div className="contato-info">
              <h2>Informações de Contato</h2>
              <div className="info-grid">
                <div className="info-item">
                  <h3>Telefone</h3>
                  <p>(11) 9999-9999</p>
                  <p>Segunda a Sexta, 8h às 18h</p>
                </div>
                <div className="info-item">
                  <h3>E-mail</h3>
                  <p>contato@telesaudehc.com.br</p>
                  <p>Resposta em até 24h</p>
                </div>
                <div className="info-item">
                  <h3>WhatsApp</h3>
                  <p>(11) 99999-9999</p>
                  <p>Atendimento 24h</p>
                </div>
              </div>
            </div>

            <div className="contato-form">
              <h2>Envie sua mensagem</h2>
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="name">Nome completo</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={errors.name ? "error" : ""}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={errors.email ? "error" : ""}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Assunto</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={errors.subject ? "error" : ""}
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="agendamento">Agendamento</option>
                    <option value="duvida">Dúvida</option>
                    <option value="sugestao">Sugestão</option>
                    <option value="reclamacao">Reclamação</option>
                  </select>
                  {errors.subject && <span className="error-message">{errors.subject}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Mensagem</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className={errors.message ? "error" : ""}
                  />
                  {errors.message && <span className="error-message">{errors.message}</span>}
                </div>

                <button type="submit" className="btn-submit">
                  Enviar mensagem
                </button>

                {statusMessage && <p className="success-message">{statusMessage}</p>}
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Contato;
