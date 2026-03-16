export interface Order {
    id: number;
    note:string;
    validated_at: string;
    created_at:string;
    base_total_price: number;
    lan: string;
    lat: string;
    street_id: number;
    area_id: number;
    salesman_id: number;
    pharmasict_id: number;
    assistant_id: number;
    total_return_price: number;
    total_price: number;
    base_total_quantity: number;
    total_return_quantity: number;
    total_quantity: number;
    base_total_percentage: number;
    total_return_percentage: number;
    is_there_return: number;
    total_percentage: number;
    total_delivery_percentage: number;
    return_date: string;
    order_status: number
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
    total_delivery_percentage: number;
    type_id: number;
    order_id: number;
    price_for_piece: number;
    total_percentage: number;
    base_percentage: number;
    return_percentage: number;
    delivery_percentage: number;
    base_total_price: number;
    return_total_price?: number;
    total_price: number;
    base_quantity: number;
    return_quantity: number;
    total_quantity: number;
    has_return: boolean;
    return_discount?: number;
    return_date?: Date;
    delivery_percentage_for_piece?: number;
    percentage_for_piece?: number;
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
    base_percentage: number;
    total_percentage: number;
    return_percentage: number;
    delivery_percentage_for_piece: number;
    total_delivery_percentage: number;
    percentage_for_piece: number;
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
    total_delivery_percentage
}

export interface EditingOffer {
    base_offer_id: number;
    order_id: number;
    type_id: number;
    price_for_piece: number;
    base_quantity: number;
    return_quantity: number;
    return_discount?: number;
    delivery_percentage_for_piece?: number;
}


export interface AddingOnlineProduct {
    quantity: number;
    type_id?: number;
    online_order_id: number;
    total_price: number;
}

export interface AddingProduct {
    price_for_piece: number;
    base_total_price: number;
    return_total_price?: number;
    base_quantity: number;
    return_quantity: number;
    total_quantity: number;
    has_return: boolean;
    return_discount?: number;
    return_date?: Date;
    total_percentage: number;
    base_percentage: number;
    return_percentage: number;
    delivery_percentage: number;
    delivery_percentage_for_piece: number;
    percentage_for_piece: number;
}

export interface EditingProduct {
    price_for_piece: number;
    base_quantity: number;
    return_quantity: number;
    total_quantity: number;
    return_discount: number;
    total_delivery_percentage: number;
    delivery_percentage_for_piece?: number;
    percentage_for_piece?: number;
    //return_date?: Date;
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
    lan: string;
    note:string;
    lat: string;
    street_id: number;
    area_id: number;
    validated_at: string;
    base_total_price: number;
    salesman_id: number;
    pharmasict_id: number;
    assistant_id: number;
    total_return_price: number;
    total_price: number;
    base_total_quantity: number;
    total_return_quantity: number;
    total_quantity: number;
    base_total_percentage: number;
    total_return_percentage: number;
    total_percentage: number;
    total_delivery_percentage: number;
    return_date: string;
    is_there_return: number;
    order_status: number
}


export interface FilterProductProps {
    page: number;
    limit: number;
    filter_type_id: number;
    filter_min_quantity: number;
    filter_max_quantity: number;
    filter_min_total_price: number;
    filter_max_total_price: number;
}


export interface FilterOfferProps {
    page: number;
    limit: number;
    filter_base_offer_id: number;
    filter_type_id: number;
    filter_min_quantity: number;
    filter_max_quantity: number;
    filter_min_total_price: number;
    filter_max_total_price: number;
}

export interface FilterOrderProps {
    page: number;
    limit: number;
    filter_assistant_id: number,
    filter_salesman_id: number,
    filter_pharmacist_id: number,
    filter_min_quantity: number;
    filter_max_quantity: number;
    filter_min_total_price: number;
    filter_max_total_price: number;
    filter_order_status: number;
}



