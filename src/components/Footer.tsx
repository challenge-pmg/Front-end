export default function Footer() {
  return (
    <footer className="bg-dark text-light py-8 px-6 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h2 className="text-lg font-title mb-2">HealthConnect</h2>
          <p className="text-sm text-gray-300">
            Cuidando da sua saúde com tecnologia.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Links úteis</h3>
          <ul className="space-y-1">
            <li><a href="/" className="hover:text-accent">Home</a></li>
            <li><a href="/faq" className="hover:text-accent">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Contato</h3>
          <p>Email: contato@healthconnect.com</p>
        </div>
      </div>
      <p className="text-center text-xs mt-6 text-gray-400">
        © 2025 HealthConnect. Todos os direitos reservados.
      </p>
    </footer>
  );
}