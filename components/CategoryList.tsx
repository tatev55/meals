"use client"

import { useState } from "react"
import Link from "next/link"
import Image from 'next/image';

type Category = {
  idCategory: string,
  strCategory: string,
  strCategoryThumb : string,
  strCategoryDescription: string

}
type Props = {
    categories: Category[]
}

export const CategoryList = ({categories}: Props) => {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    return (
     <div>
        <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((item) => (
          <li key = {item.idCategory} className = 'shadow-md p-4  bg-green-100 raounded-lg flex flex-col justify-between items-center'>
            <Image src ={item.strCategoryThumb} className="w-full" alt = {item.strCategoryDescription} width={200} height={200}/>
            <h4 className="text-green-700 font-bold text-center text-2xl">{item.strCategory}</h4>
            <p className="text-center text-green-600">{
              item.strCategoryDescription.length > 200? <>
              {item.strCategoryDescription.slice(0, 200) + '...'}
              <button className = 'cursor-pointer' onClick={() => setSelectedCategory(item)}>......</button>
              </> :
              
              item.strCategoryDescription
              }</p>
            <Link href = {`/category/${item.strCategory}`} className=" text-green-900">View more...</Link>
          </li>
        ))}
      </ul>
      {selectedCategory &&  
        <div   
            className = 'fixed text-white bg-black/90 rounded w-[40%] min-h-[40%] left-1/2 top-1/4 -translate-x-1/2 p-5 overflow-auto flex flex-col items-center'
        >
            <button 
                className="absolute top-1 right-2 cursor-pointer text-3xl"
                onClick={()=>setSelectedCategory(null)}
            >
                X
            </button>
          <Image src = {selectedCategory.strCategoryThumb} alt = {selectedCategory.strCategory} width={200} height={200}/>
          <h4 className="text-green-700 font-bold text-center text-2xl">{selectedCategory.strCategory}</h4>
          <p className = 'text-center'>{selectedCategory.strCategoryDescription}</p>
        </div>
      }
     </div>
    )
}