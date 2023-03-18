import { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import MealCard from '../components/MealCard';
import { Meal } from '../types/Meal';

interface ApiResponse {
  meals: Meal[];
}

export default function Home() {
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    const savedMeals = JSON.parse(localStorage.getItem('meals') || '[]');
    setMeals(savedMeals);
  }, []);

  const getRandomMeal = async () => {
    try {
      const timestamp = new Date().getTime(); // cache busting
      const response = await axios.get<ApiResponse>(
        `https://www.themealdb.com/api/json/v1/1/random.php?t=${timestamp}`
      );
      const newMeals = response.data.meals;
      setMeals((prevMeals) => [...newMeals, ...prevMeals]);
      localStorage.setItem('meals', JSON.stringify([...newMeals, ...meals]));
    } catch (error) {
      console.error(error);
    }
  };
  
  

  const clearMeals = () => {
    setMeals([]);
    localStorage.removeItem('meals');
  };

  return (
    <div className="container mx-auto" >
      <Head>
        <title>Random Meal Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center">
      <main className="py-4 mb-8">
        <h1 className="text-center font-bold text-4xl mb-4">
          Random Meal Generator
        </h1>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
            onClick={getRandomMeal}
          >
            Generate Random Meal
          </button>
          {meals.length > 0 && (
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={clearMeals}
            >
              Clear Meals
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
  {meals.map((meal) => <MealCard key={meal.idMeal} meal={meal} />)}
</div>

      </main>
      </div>
    </div>
  );
}

