import ItemType from "./ItemType";

interface StockType{
    stockId: number,
    item: ItemType,
    quantityOnHand: number,
    location: string
}

export default StockType;