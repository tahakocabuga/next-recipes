import React, { useState } from 'react';
import { Meal } from '../types/Meal';
import Image from 'next/image';

interface MealCardProps {
  meal: Meal;
}

const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push({ ingredient, measure });
    } else {
      break;
    }
  }
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={meal.strMealThumb} alt={meal.strMeal} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{meal.strMeal}</div>
        <ul>
          {ingredients.map(({ ingredient, measure }, index) => (
            <li key={index}>
              <img
                src={`https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`}
                alt={ingredient}
                className="w-6 h-6 inline-block mr-2"
              />
              {ingredient} - {measure}
            </li>
          ))}
        </ul>
        <p className="text-gray-400 text-base mt-4">
        {isExpanded
            ? meal.strInstructions
            : `${meal.strInstructions.substring(0, 100)}...`}
        </p>
        <button
          className="text-blue-500 hover:text-blue-700 font-semibold"
          onClick={toggleExpanded}
        >
          {isExpanded ? 'See less' : 'See more'}
        </button>
      </div>
      <div className="px-6 py-4">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          {meal.strCategory}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          {meal.strArea}
        </span>
      </div>
    </div>
  );
};

export default MealCard;
 