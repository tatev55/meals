"use server"

import PaginatedMeals from "@/components/PaginatedMeals"


type Meal = {
    strMeal:"string",
    strMealThumb:"string",
    idMeal: "number"
}

type MealsResponse = {
    meals: Meal[]
}

type Params = {
    params: Promise<{category: string}>
}



export  default async function CategoryPage({params} : Params) {

    const {category} = await params;

    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`, {next: {revalidate: 60}})

    if(!response.ok){
        throw new Error(`Faild to fetch meals for category ${category}`)
    }

    const data: MealsResponse = await response.json()
    return (
        <div className = 'container  p-4'>
            <h1 className="text-3xl text-center mb-4 font-bold italic text-green-800">Meals in {category}</h1>
            <PaginatedMeals  meals={data.meals}/>
        </div>
    )
}