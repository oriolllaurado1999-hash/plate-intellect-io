import React from 'react';

interface WaterGlassProps {
  currentWater: number; // ml de agua actual
  maxWater?: number; // ml máximo (por defecto 2000ml)
  className?: string;
  style?: React.CSSProperties;
}

const WaterGlass: React.FC<WaterGlassProps> = ({ 
  currentWater, 
  maxWater = 2000, 
  className = "w-16 h-16",
  style 
}) => {
  // Calcular el porcentaje de agua (0-100%)
  const waterPercentage = Math.min(Math.max((currentWater / maxWater) * 100, 0), 100);
  
  // Calcular la altura del agua en el vaso (el vaso ocupa desde y=6 hasta y=22, total de 16 unidades)
  const glassHeight = 16;
  const waterHeight = (waterPercentage / 100) * glassHeight;
  const waterY = 22 - waterHeight; // Posición Y donde empieza el agua (desde abajo)

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      {/* Fondo del vaso (contorno) */}
      <path
        d="M5 6l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2L19 6"
        fill="none"
        stroke="#3B82F6"
      />
      
      {/* Agua dentro del vaso */}
      {waterPercentage > 0 && (
        <path
          d={`M6 ${waterY} L6 18 a2 2 0 0 0 2 2 h8 a2 2 0 0 0 2-2 L18 ${waterY} Z`}
          fill="#3B82F6"
          fillOpacity="0.6"
          stroke="none"
        />
      )}
      
      {/* Borde superior del vaso */}
      <path d="M5 6h14" stroke="#3B82F6" />
      
      {/* Superficie del agua (línea ondulada si hay agua) */}
      {waterPercentage > 0 && (
        <path
          d={`M6 ${waterY} Q12 ${waterY - 0.5} 18 ${waterY}`}
          fill="none"
          stroke="#1D4ED8"
          strokeWidth="1"
        />
      )}
    </svg>
  );
};

export default WaterGlass;