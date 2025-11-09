interface CardProps {
  title: string;
  description: string;
  icon: string;
}

export default function Card({ title, description, icon }: CardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition transform hover:scale-105">
      <img src={icon} alt={title} className="w-16 mx-auto mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}