import Link from "next/link"
import Image from 'next/image';

type Params = {
  params: Promise<{ id: string }>
}

type Meal = {
  idMeal: string,
  strMeal: string,
  strMealAlternate: string,
  strCategory: string,
  strArea: string,
  strYoutube: string | null,
  strMealThumb: string | null,
  [key: string]: string | null
}

type MealResponse = {
  meals: Meal[]
}

export default async function MealPage({ params }: Params) {
  const { id } = await params

  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`, { next: { revalidate: 60 } })
  if (!response.ok) throw new Error('Failed to fetch data')

  const data: MealResponse = await response.json()

  if (!data.meals || data.meals.length === 0) {
    return <p className="text-center text-red-600 mt-10">No meal found with ID {id}</p>
  }

  const meal = data.meals[0]

  const ingredients: { ingredients: string, measure: string }[] = []
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`]
     const mea = meal[`strMeasure${i}`] ??''
    if (ing && ing !== '') {
      ingredients.push({ ingredients: ing, measure: mea })
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-4xl font-bold text-center text-gray-800">{meal.strMeal}</h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          {meal.strCategory} | {meal.strArea}
        </p>

       
        {meal.strMealThumb && (
          <div className="flex justify-center mb-6">
            <Image
              src={meal.strMealThumb}
              alt={meal.strMeal}
              width={500}
              height={300}
              className="rounded-lg shadow-md w-full max-w-md hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

       
        {meal.strYoutube && (
          <div className="text-center my-6">
            <Link
              href={meal.strYoutube}
              target="_blank"
              className="inline-block px-6 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition"
            >
             Watch on YouTube
            </Link>

            <div className="aspect-video max-w-2xl mx-auto mt-4">
              <iframe
                src={`https://www.youtube.com/embed/${new URL(meal.strYoutube).searchParams.get("v")}`}
                className="w-full h-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        )}


        <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-700 text-center">Ingredients</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {ingredients.map((item, index) => (
            <li
              key={index}
              className="bg-gray-50  p-4 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <p className="font-semibold text-green-900 ">{item.ingredients}</p>
              <p className="text-gray-600 text-sm">{item.measure}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
    