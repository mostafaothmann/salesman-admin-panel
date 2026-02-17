import { DoctorSample, DoctorVisit } from "./medical-store-interfaces";

// 🧩 Interfaces
export interface GroupType {
    id: number,
    name: string,
    description: string,
}

export interface Ingredient {
    id: number,
    name: string,
    description: string,
    quantity: number,
}

export interface TypeIngredient {
    id: number,
    ingredient_id: number,
    type_id: number,
    quantity_percentage: number,
}

export interface RecoveryCase {
    id: number,
    description: string,
    type_id: number,
    end_treatment: Date,
    start_treatment: Date,
}

export interface RecoveryCaseImage {
    id: number,
    recovercase_id: number,
    description: string;
}

export interface Type {
    id: number,
    group_type_id: number;
    name: string,
    quantity: number,
    brand: string,
    description: string,
    price_for_piece: number;
    price_for_sale: number;
    percentage: number;
    manufacturing_date: Date;
    type: number,
    online_percentage: number;
    samples: DoctorSample[],
    doctorVisits: DoctorVisit[],
    recoveryCases: RecoveryCase[]
}

//for Adding/Edititng
export interface AddingGroupType {
    name: string,
    description: string,
}

export interface AddingIngredient {
    name: string,
    description: string,
    quantity: number,
}

export interface AddingTypeIngredient {
    ingredient_id: number,
    type_id: number,
    quantity_percentage: number,
}

export interface AddingRecoveryCase {
    description: string,
    type_id: number,
    end_treatment: Date,
    start_treatment: Date,
}

export interface AddingRecoveryCaseImage {
    recovercase_id: number,
    description: string;
}

export interface AddingType {
    group_type_id: number;
    name: string,
    quantity: number,
    brand: string,
    description: string,
    price_for_piece: number;
    price_for_sale: number;
    percentage: number;
    manufacturing_date: Date;
    type: number,
    online_percentage: number;
}
