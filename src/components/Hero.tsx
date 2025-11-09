export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-primary to-secondary text-white py-20 text-center">
      <h1 className="text-4xl md:text-6xl font-title mb-6">
        Conecte Pacientes e Profissionais
      </h1>
      <p className="max-w-xl mx-auto mb-8 text-lg">
        Plataforma moderna para agendamento e acompanhamento médico.
      </p>
      <a
        href="/sobre"
        className="bg-accent text-dark px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
      >
        Saiba Mais
      </a>
    </section>
  );
}