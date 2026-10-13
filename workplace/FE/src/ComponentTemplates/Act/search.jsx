import { mockProducts } from "../../Data/data";

export default function search(searchKeyword){
    const products = mockProducts.filter(({name}) => name.toLowerCase().trim().includes(searchKeyword))

    return products;
}