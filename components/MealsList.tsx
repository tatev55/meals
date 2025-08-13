"use client"

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";

type Meal = {
    strMeal:"string",
    strMealThumb:"string",
    idMeal: "number"
}

type Props = {
    meals: Meal[]
}

export default function MealsList({meals}: Props){

    const[page, setPage] = useState(1);
    const [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const itemsPerPage = 8;

     useEffect(() => {
            inputRef.current?.focus();
    }, []);


    const filtered = useMemo(() => meals.filter((meal) => {
        return meal.strMeal.toLowerCase().includes(query.toLowerCase());
    }),[query])

    const totalPages = useMemo(() => Math.ceil(filtered.length / itemsPerPage), [filtered]);


    const current = useMemo(() => {
        const start = (page - 1) * itemsPerPage;
        return filtered.slice(start, start + itemsPerPage)
    }, [page, filtered])

    const handlePrev =() => setPage(p => Math.max(1, p - 1));
    const handleNext = () => setPage(p => Math.min(totalPages, p + 1))

    
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className = 'container  p-4 text-center'> 
            <input
                value = {query}
                onChange={(e) => {setQuery(e.target.value); setPage(1)}}
                type="text"
                placeholder="Search for a meal ..."
                className="p-1 m-1"
                ref={inputRef}
                
            />
            <ul className = 'grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
                {current.map((meal) =>
                    <li key = {meal.idMeal} className= 'text-center shadow-md'>
                        <img src = {meal.strMealThumb} alt = {meal.strMeal} className= 'p-2'/>
                        <Link href = {`/meal/${meal.idMeal}`} className = 'font-bold text-green-800'>{meal.strMeal}</Link>
                    </li>)}
            </ul>
            <div className="text-center p-8">
                <button
                    onClick={handlePrev}
                    disabled={page === 1}
                    className={`px-3 py-1 rounded font-bold m-1 text-green-800 ${
                        page === 1 ? "bg-gray-200 opacity-50 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"
                    }`}
                >
                    Prev
                </button>

                {pageNumbers.map((num) => (
                    <button
                        key={num}
                        onClick={() => setPage(num)}
                        className={`px-3 py-1 text-green-600 rounded m-1 ${
                        num === page
                            ? "bg-green-600 text-white font-bold"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    >
                        {num}
                    </button>
                ))}

                <button
                    onClick={handleNext}
                    disabled={page === pageNumbers.length}
                    className={`px-3 py-1 rounded font-bold m-1 text-green-800 ${
                        page === pageNumbers.length
                        ? "bg-gray-200 opacity-50 cursor-not-allowed"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                >
                    Next
                </button>     
            </div>
        </div>
        )
}