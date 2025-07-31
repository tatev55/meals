import Link from "next/link";


type Category = {
  idCategory: string,
  strCategory: string,
  strCategoryThumb : string,
  strCategoryDescription: string

}

type CategoryResponse = {
  categories: Category[]
}

export default  async function HomePage() {
   
     
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`, {next: {revalidate: 60}});
  
        if(!res.ok){
          throw new Error('Faild to fetch categories')
        }
  
        const data: CategoryResponse = await res.json()
      
  

  return (
    <div className = 'HomePage container mx-auto p-4'>
      <h1 className="text-center text-3xl text-green-900 font-bold italic p-4">Meal categories</h1>
      <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.categories.map((item) => (
          <li key = {item.idCategory} className = 'shadow-md p-4  bg-green-100 raounded-lg flex flex-col justify-between items-center'>
            <img src ={item.strCategoryThumb} className="w-full" alt = {item.strCategoryDescription}/>
            <h4 className="text-green-700 font-bold text-center text-2xl">{item.strCategory}</h4>
            <p className="text-center text-green-600">{
              item.strCategoryDescription.length > 200?  
              item.strCategoryDescription.slice(0, 200) + '...':
              item.strCategoryDescription
              }</p>
            <Link href = {`/category/${item.strCategory}`} className=" text-green-900">View more...</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
