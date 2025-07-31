'use client'


import {createContext, useContext, useState, useEffect, ReactNode} from 'react'

type  Meal = {
    idMeal: number,
    isMeal : number,
    strMeal : string,
    strMealThumb: string
}

type SearchContextType = {
    query: string,
    setQuery: (q:string) => void,
    meals: Meal[],
    isLoading: boolean
}

const SearchContext = createContext<SearchContextType>({
    query: "",
    setQuery: () => { },
    meals: [],
    isLoading: false
})

export function SearchProvider ({children}: {children : ReactNode}) {
    const [query, setQuery] = useState('');
    const [meals, setMeals] = useState<Meal[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(query.trim().length=== 0){
            setMeals([])
            setIsLoading(false)
            return
            
        }

        setIsLoading(true);
        const ac = new AbortController();

       const timer =  setTimeout(async ()=> {
                try {
                    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,{
                        signal:ac.signal
                    })
    
                    if(!res.ok){
                        throw new Error('Failed to fetch data')
                    }
                    const data = await res.json();
                    setMeals(data.meals || [])
                } catch (error:unknown) {
                    if (error instanceof Error) {
                        console.log(error.message)
                    } else {
                        console.log('Something went wrong')
                    }
                }finally{
                    setIsLoading(false)
                }
        }, 500)

        return(() => {
            ac.abort();
            clearTimeout(timer);
        })
    },[query])


    return (
        <SearchContext.Provider value = {{query, setQuery, meals, isLoading}}>
            {children}
        </SearchContext.Provider>
    )

}

export const useSerch =() => useContext(SearchContext)