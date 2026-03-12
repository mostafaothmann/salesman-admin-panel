export interface Order {
    id: number
    assistant_id?: number;
    pharmacist_id?: number;
    salesman_id?: number;
    validated_at?: Date;
    base_total_price: number;
    return_total_price?: number;
    total_price: number;
    base_quantity: number;
    return_quantity: number;
    total_quantity: number;
    is_return: boolean;
    is_there_return: boolean;
    return_date?: Date;
}

export interface OnlineOrder {
    id: number;
    assistant_id: number;
    online_customer_id: number;
    salesman_id: number;
    validated_at: Date;
    base_total_price: number;
    return_total_price?: number;
    total_price: number;
    base_quantity: number;
    return_quantity: number;
    total_quantity: number;
}

export interface Product {
    id: number;
    quantity: number;
    type_id: number;
    order_id: number;
    price_for_piece: number;
    base_total_price: number;
    return_total_price?: number;
    total_price: number;
    base_quantity: number;
    return_quantity: number;
    total_quantity: number;
    has_return: boolean;
    return_discount?: number;
    return_date?: Date;
}

export interface OnlineProduct {
    id: number;
    quantity: number;
    type_id?: number;
    online_order_id: number;
    total_price: number;
}

export interface Offer {
    id: number;
    base_offer_id: number;
    order_id: number;
    price_for_piece: number;
    base_total_price: number;
    return_total_price?: number;
    total_price: number;
    base_quantity: number;
    return_quantity: number;
    total_quantity: number;
    is_with_gift?: boolean;
    has_return: boolean;
    return_discount?: number;
    return_date?: Date;
}

export interface OnlineOffer {
    id: number;
    base_offer_id: number;
    order_id: number;
    total_price: number;
    total_quantity: number;
}

export interface AddingOnlineOffer {
    base_offer_id: number;
    order_id: number;
    total_price: number;
    total_quantity: number;
}


export interface Mall {
    id: number;
    type: number;
    name: string;
    lan?: string;
    lat?: string;

    phone_number?: string;
    telephone_number?: string;

    governorate_id: number;
    city_id?: number;
    area_id?: number;
    street_id?: number;

    salesman_description?: string;
    admin_description?: string;
}


export interface AddingMall {
    name: string;
    lan?: string;
    lat?: string;

    phone_number?: string;
    telephone_number?: string;

    governorate_id: number;
    city_id: number;
    area_id: number;
    street_id: number;

    salesman_description?: string;
    admin_description?: string;
}

export interface BaseOffer {
    id: number;
    number_of_gifts: number;
    number_of_pieces: number;
    type_id: number;
}

export interface OnlineCustomer {
    id: number;
    first_name: string;
    last_name: string;
    birth_date?: Date;
    phone_nmuber: string;
    assistant_id: number;
    salesman_id: number;
    governorate_Id?: number;
    city_Id?: number;
    area_id?: number;
}

export interface AddingOnlineCustomer {
    first_name: string;
    last_name: string;
    birth_date?: Date;
    phone_nmuber: string;
    assistant_id: number;
    salesman_id: number;
    governorate_Id?: number;
    city_Id?: number;
    area_id?: number;
}

export interface AddingBaseOffer {
    number_of_gifts: number;
    number_of_pieces: number;
    type_id: number;
}

export interface AddingOffer {
    id: number;
    base_offer_id: number;
    order_id: number;
    price_for_piece: number;
    base_total_price: number;
    return_total_price?: number;
    total_price: number;
    base_quantity: number;
    return_quantity: number;
    total_quantity: number;
    is_with_gift?: boolean;
    has_return: boolean;
    return_discount?: number;
    return_date?: Date;
}

export interface AddingOnlineProduct {
    quantity: number;
    type_id?: number;
    online_order_id: number;
    total_price: number;
}

export interface AddingProduct {
    quantity: number;
    type_id: number;
    order_id: number;
    price_for_piece: number;
    base_total_price: number;
    return_total_price?: number;
    total_price: number;
    base_quantity: number;
    return_quantity: number;
    total_quantity: number;
    has_return: boolean;
    return_discount?: number;
    return_date?: Date;
}

export interface AddingOnlineOrder {
    assistant_id: number;
    online_customer_id: number;
    salesman_id: number;
    validated_at: Date;
    base_total_price: number;
    return_total_price?: number;
    total_price: number;
    base_quantity: number;
    return_quantity: number;
    total_quantity: number;
}

export interface AddingOrder {
    assistant_id?: number;
    pharmacist_id?: number;
    salesman_id?: number;
    validated_at?: Date;
    base_total_price: number;
    return_total_price?: number;
    total_price: number;
    base_quantity: number;
    return_quantity: number;
    total_quantity: number;
    is_return: boolean;
    is_there_return: boolean;
    return_date?: Date;
}

