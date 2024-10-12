import ItemType from "./ItemType";

interface OrderType{
    orderId: number,
    orderDateTime: Date,
    discount: number,
    totalPrice: number,
    paymentMethod: string,
    orderedItems: ItemType[]
}

export default OrderType;