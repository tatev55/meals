'use client '

import { useSerch } from "@/context/SearchContext"
import { useState, useRef, useEffect } from 'react'
import Link from "next/link"

export const GloabalSearch = () => {
    const { query, setQuery, isLoading, meals } = useSerch();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
                setQuery('')
            }
        }
        document.addEventListener('mousedown', handleOutsideClick);

        return (() => {
            document.removeEventListener('mousedown', handleOutsideClick);
        })
    }, [])

    return (
        <div className="relative w-100 mt-4" ref={ref}>
            <input
                type='text'
                placeholder="Serach Meals..."
                value={query}
                onChange={(e) => { setQuery(e.target.value); setOpen(true) }}

                className="w-full px-4 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"

            />
            {open && <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto">
                <button
                    onClick={() => { setOpen(false); setQuery('') }}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-sm"
                    aria-label="Close dropdown"
                >
                    ✕
                </button>
                {isLoading && <li className="px-4 py-2 text-gray-500">Loading...</li>}
                {!isLoading && meals.length === 0 && query.trim().length > 0 && <li className="px-4 py-2 text-gray-500">No result</li>}
                {
                    !isLoading && meals.slice(0, 5).map((item) =>
                        <li
                            key={item.idMeal}
                            onClick={() => { setOpen(false); setQuery('') }}
                            className="hover:bg-gray-100 cursor-pointer"
                        >
                            <Link href={`/meal/${item.idMeal}`} className="block px-4 py-2 text-gray-800 flex justify-between items-center">
                                <img
                                    src={item.strMealThumb}
                                    alt={item.strMeal}
                                    className="w-36 h-16 object-cover rounded-md shadow-md mt-2"
                                />
                                <span>
                                    {item.strMeal}
                                </span>
                            </Link>
                        </li>)
                }
            </ul>
            }
        </div>
    )
}