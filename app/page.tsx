
import { CategoryList } from "@/components/CategoryList";


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
      <CategoryList categories = {data.categories}/>
    </div>
  );
}
