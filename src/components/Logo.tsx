import React from "react";

interface LogoProps {
  className?: string;
  withText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "w-8 h-8", withText = true }) => {
  return (
    <div className="flex items-center space-x-3">
      <svg 
        className={className}
        viewBox="0 0 40 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="20" cy="20" r="20" fill="#2563EB"/>
        <rect x="18" y="10" width="4" height="20" fill="white"/>
        <rect x="10" y="18" width="20" height="4" fill="white"/>
        <path 
          d="M20 28C20 28 24 24 24 21C24 18.5 22 17 20 17C18 17 16 18.5 16 21C16 24 20 28 20 28Z" 
          fill="#FECACA"
        />
      </svg>

      {withText && (
        <div className="flex flex-col">
          <span className="font-bold text-gray-800 text-lg leading-5">TeleSaúde</span>
          <span className="font-semibold text-blue-600 text-sm leading-4">HC</span>
        </div>
      )}
    </div>
  );
};

export default Logo;