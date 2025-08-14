import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: number | string;
  unit: string;
  emoji: string;
  maxValue?: number;
}

const StatCard = ({ title, value, unit, emoji, maxValue = 100 }: StatCardProps) => {
  const numericValue = typeof value === 'string' ? 0 : value;
  const percentage = maxValue > 0 ? Math.min((numericValue / maxValue) * 100, 100) : 0;

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>{title}</span>
          <span className="text-2xl">{emoji}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-center">
          <div className="text-3xl font-bold">{value}{unit}</div>
        </div>
        {maxValue > 0 && (
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all duration-300 bg-primary"
              style={{ width: `${percentage}%` }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface SwipeableStatsProps {
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
  healthScore?: string;
  steps?: number;
  caloriesBurned?: number;
  water?: number;
}

const SwipeableStats = ({ 
  protein, 
  carbs, 
  fat, 
  fiber = 25, 
  sugar = 32, 
  sodium = 1800, 
  healthScore = "B+", 
  steps = 8542, 
  caloriesBurned = 320, 
  water = 1200 
}: SwipeableStatsProps) => {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    // Page 1: Macros
    [
      { title: "Protein", value: protein, unit: "g", emoji: "🥩", maxValue: 120 },
      { title: "Carbs", value: carbs, unit: "g", emoji: "🍞", maxValue: 300 },
      { title: "Fat", value: fat, unit: "g", emoji: "🥑", maxValue: 85 }
    ],
    // Page 2: Micronutrients & Health
    [
      { title: "Fiber", value: fiber, unit: "g", emoji: "🌾", maxValue: 40 },
      { title: "Sugar", value: sugar, unit: "g", emoji: "🍯", maxValue: 50 },
      { title: "Sodium", value: sodium, unit: "mg", emoji: "🧂", maxValue: 2300 },
      { title: "Health Score", value: healthScore, unit: "", emoji: "❤️", maxValue: 0 }
    ],
    // Page 3: Activity & Hydration
    [
      { title: "Steps", value: steps, unit: "", emoji: "👟", maxValue: 10000 },
      { title: "Calories Burned", value: caloriesBurned, unit: "", emoji: "🔥", maxValue: 500 },
      { title: "Water", value: water, unit: "ml", emoji: "💧", maxValue: 2000 }
    ]
  ];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left' && currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'right' && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="space-y-4">
      <div 
        className="relative overflow-hidden"
        onTouchStart={(e) => {
          const touch = e.touches[0];
          e.currentTarget.setAttribute('data-start-x', touch.clientX.toString());
        }}
        onTouchEnd={(e) => {
          const startX = parseFloat(e.currentTarget.getAttribute('data-start-x') || '0');
          const endX = e.changedTouches[0].clientX;
          const diff = startX - endX;
          
          if (Math.abs(diff) > 50) {
            if (diff > 0) {
              handleSwipe('left');
            } else {
              handleSwipe('right');
            }
          }
        }}
      >
        <div 
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentPage * 100}%)` }}
        >
          {pages.map((page, pageIndex) => (
            <div key={pageIndex} className="w-full flex-shrink-0">
              <div className={`grid gap-4 ${page.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                {page.map((stat, statIndex) => (
                  <StatCard
                    key={statIndex}
                    title={stat.title}
                    value={stat.value}
                    unit={stat.unit}
                    emoji={stat.emoji}
                    maxValue={stat.maxValue}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center space-x-2">
        {pages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentPage ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SwipeableStats;