'use client'

import Link from "next/link"
// import { GloabalSearch } from "./GlobalSearch"
import GloabalSearch2 from "./GlobalSearch2"



export function Header() {
    return (
        <div className=" w-full h-30 bg-green-800 flex justify-around items-center">
            <Link href="/">
                <h1 className="text-3xl font-bold text-white italic ">Delicious Meals</h1>
            </Link>
            {/* <GloabalSearch/> */}
            <GloabalSearch2/>
        </div>
    )
}