export interface GiftVisit {
    id: number,
    visit_id: number,
    base_gift_id: number,
    quantity: number,
}

export interface BaseGift {
    id: number,
    name: string;
    description: string;
    quantity: number,
}

export interface SalesmanMessage {
    id: number,
    title: string;
    content: string;
    salesman_id: number,
}

export interface VideoLink {
    id: number,
    link: string;
    name: string;
    description: string;
}

export interface AddingGiftVisit {
    visit_id: number,
    base_gift_id: number,
    quantity: number,
}

export interface AddingBaseGift {
    name: string;
    description: string;
    quantity: number,
}

export interface AddingSalesmanMessage {
    title: string;
    content: string;
    salesman_id: number,
}

export interface AddingVideoLink {
    link: string;
    name: string;
    description: string;
}

export interface FilterGiftVisitProps {
    page: number;
    limit: number;
    filter_base_gift_id: number;
    filter_visit_id: number;
    filter_min_quantity: number;
    filter_max_quantity: number;
}

export interface FitlerSalesmanMessageProps {
    page: number;
    limit: number;
    filter_salesman_id: number;
    filter_title: string;
}
