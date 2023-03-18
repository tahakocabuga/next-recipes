export interface Meal {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strInstructions: string;
    [key: string]: string;
  }
  
  export async function fetchRandomMeal(): Promise<Meal> {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await res.json();
    return data.meals[0];
  }
  
  export async function fetchMealById(id: string): Promise<Meal> {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await res.json();
    return data.meals[0];
  }
  