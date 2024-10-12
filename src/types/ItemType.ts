import CategoryType from "./CategoryType";

interface ItemType{
    itemCode: number;
    itemName: string;
    description: string;
    price: number;
    category: CategoryType
}

export default ItemType;