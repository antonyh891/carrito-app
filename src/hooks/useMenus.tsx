import { useEffect, useState } from "react";
import FoodServices from "../api/FoodServices";
import { Food, MenuDB, Category } from "../interfaces/MenusInterfaces";



export const useMenus = () => {

    const [ isLoading, setIsLoading ] = useState(true);
    const [ menusDisponibles, setMenusDisponibles ] = useState<Food[]>([])
    const [ categorias, setCategorias ] = useState<Category[]>([])

    const getMenusCategorias = async () => {
        
        const resp = await FoodServices.get<MenuDB>('/foodapp/api.json');
        setMenusDisponibles(resp.data.food);
        setCategorias(resp.data.categories);

        setIsLoading(false);
    }

    useEffect(() => {
    getMenusCategorias();
  },[])

  return {
      menusDisponibles,
      isLoading,
      categorias
  }

}