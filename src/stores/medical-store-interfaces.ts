
// 🧩 Interfaces

import { Type } from "./types-store-interfaces";

export interface DoctorSample {
    id: number,
    doctor_visit_id: number,
    quantity: number,
}

export interface Sample {
    id: number,
    visit: number,
    quantity: number,
}

export interface AddingSample {
    id: number,
    doctor_visit_id: number,
    quantity: number,
}

export interface PharmacistSample {
    id: number,
    pharmacist_visit_id: number,
    quantity: number,
}

export interface DoctorVisit {
    id: number,
    assistant_id: number,
    admin_note: string,
    doctor_id: number,
    salesman_id: number,
    visit_status_id: number,
    type_id: number,
    lan?: string,
    lat?: string,
    doctorLan?: string,
    doctorLat?: string,
    status: number,
    note: string,
    created_at: string;
    validated_at: string;
    is_other_spoken_note: boolean,
    // photo: string,
    closest_pharmacy: string,
    number_of_patients: number,

}


export interface PharmacistVisit {
    id: number,
    assistant_id: number,
    admin_note: string,
    pharmacist_id: number,
    salesman_id: number,
    visit_status_id: number,
    type_id: number,
    lan?: string,
    lat?: string,
    pharmacistLan?: string,
    pharmacistLat?: string,
    status: number,
    note: string,
    created_at: string;
    validated_at: string;
    is_other_spoken_note: boolean,
    // photo: string,
    closest_pharmacy: string,
    number_of_patients: number,
}

export interface Doctor {
    id: number,
    lan: string | null,
    lat: string | null,
    governorate_id: number,
    city_id: number,
    area_id: number,
    street_id: number,
    specialization_id: number,
    first_name: string,
    last_name: string,
    classification_id: number,
    loyalty_id: number,
    last_visit_note: string | null,
    last_visit_date: Date,
    birth_date: string,
    average_patients_per_day: number,
    admin_description: string,
    salesman_description: string,
    favourite_time_opening: string,
    favourite_time_closing: string,
    first_work_time_opening: string,
    first_work_time_closing: string
    second_work_time_opening: string,
    second_work_time_closing: string,
    // photo: string,
    graduation_country: string,
    graduation_university: string,
    is_added_by_admin: boolean,
    phone_number: string,
    telephone_number: string,
    gender: number,
    /*     wife_husband_first_name: string;
        wife_husband_last_name: string; */
    //added recently
    full_place: string;
    close_place: string;
    email: string;
    second_name: string;
    waiting_time_id: number;
    stance_on_dietary_supp: string;
    /*     childs_under_12: number;
        childs_above_18: number;
        childs_between_12_18: number; */

    adopted_types: string;
    expected_recipes: number;
    preffered_dietary_types: string;
    preffered_treatment_types: string;
    preffered_companies: string;
    competitive_types: string;
    personality_strengthens: string;
    interestes: string;
    personality_type_id: number;
    social_pattern_id: number;
    salesman_relationship_id: number;
    secrtary_first_name: string;
}

export interface FilterDoctorProps {
    page: number;
    limit: number;
    filter_first_name: string;
    filter_last_name: string;
    filter_min_classification: number;
    filter_max_classification: number;
    filter_min_age: number;
    filter_max_age: number;
    filter_specialization_id: number;
    filter_min_loyalty: number;
    filter_max_loyalty: number;
    filter_governorate_id: number;
    filter_city_id: number;
    filter_area_id: number;
    filter_street_id: number;
}

export interface FilterSamplesProps {
    page: number;
    limit: number;
    filter_min_quantity: number;
    filter_max_quantity: number;
    filter_type_id: number;
}


export interface FilterPharmacistProps {
    page: number;
    limit: number;
    filter_first_name: string;
    filter_last_name: string;
    filter_min_classification: number;
    filter_max_classification: number;
    filter_min_age: number;
    filter_max_age: number;
    filter_specialization_id: number;
    filter_min_loyalty: number;
    filter_max_loyalty: number;
    filter_governorate_id: number;
    filter_city_id: number;
    filter_area_id: number;
    filter_street_id: number;
}

export interface FilterDoctorVisitProps {
    page: number;
    limit: number;
    filter_min_date: string;
    filter_max_date: string;
    filter_type_id: number;
    filter_assistant_id: number;
    filter_doctor_id: number;
    filter_salesman_id: number;
    filter_visit_status_id: number;
    filter_min_classification: number;
    filter_max_classification: number;
    filter_specialization_id: number;
    filter_governorate_id: number;
    filter_city_id: number;
    filter_area_id: number;
    filter_street_id: number;
}


export interface FilterPharmacistVisitProps {
    page: number;
    limit: number;
    filter_min_date: string;
    filter_max_date: string;
    filter_type_id: number;
    filter_assistant_id: number;
    filter_pharmacist_id: number;
    filter_salesman_id: number;
    filter_visit_status_id: number;
    filter_min_classification: number;
    filter_max_classification: number;
    filter_specialization_id: number;
    filter_governorate_id: number;
    filter_city_id: number;
    filter_area_id: number;
    filter_street_id: number;
}


export interface Pharmacist {
    id: number,
    //Personal Info
    // // photo: string,
    first_name: string,
    second_name: string;
    last_name: string,
    classification_id: number,
    loyalty_id: number,
    birth_date: string,
    admin_description: string,
    salesman_description: string,
    graduation_country: string,
    graduation_university: string,
    phone_number: string,
    telephone_number: string,
    gender: number,
    email: string;
    //Place Info
    lan: string | null,
    lat: string | null,
    governorate_id: number,
    city_id: number,
    area_id: number,
    street_id: number,
    full_place: string;
    close_place: string;
    //Administrative Info
    last_visit_note: string | null,
    last_visit_date: string | null,
    last_order_date: string | null;
    average_patients_per_day: number,
    is_added_by_admin: boolean,
    //Work Time Info
    favourite_time_opening: string,
    favourite_time_closing: string,
    first_work_time_opening: string,
    first_work_time_closing: string
    second_work_time_opening: string,
    second_work_time_closing: string,
    waiting_time_id: number;
    //Medical Info
    stance_on_dietary_supp: string;
    adopted_types: string;
    preffered_dietary_types: string;
    preffered_treatment_types: string;
    preffered_companies: string;
    //Personaltiy Info
    personality_strengthens: string;
    interestes: string;
    personality_type_id: number;
    social_pattern_id: number;
    salesman_relationship_id: number;
    //for Pharmacy only
    pharmacy_description: string;
    pharmacy_name_id: number;
    assistant_full_name: string;
    //Relation to our company
    execute_prescription_id: number;
    doctor_relationship_id: number;
    average_sell_for_our_products: number;
    our_products_existance_percentage_id: number;
}

export interface SpecializationType {
    id: number,
    specialization_id: number;
    type_id: number;
    doctors: Type[]
}

export interface Specialization {
    id: number
    name: string
    created_at: string
    doctors: Doctor[]
    specializationTypes: SpecializationType[]
}

export interface DoctorPharmacist {
    id: number,
    doctor_id: number,
    pharmacist_id: number,
}

export interface Hospital {
    id: number
    type: number
    name: string
    created_at: string
    lan?: string
    lat?: string

    phone_number?: string
    telephone_number?: string
    email?: string

    governorate_id: number
    city_id?: number
    area_id?: number
    street_id?: number

    salesman_description?: string
    admin_description?: string
}


export interface HospitalPharmacist {
    id: number;
    status: string;
    pharmacist_id: number;
    hospital_id: number;
}

export interface AddingHospitalPharmacist {
    status: string;
    pharmacist_id: number;
    hospital_id: number;
}

export interface HospitalDoctor {
    id: number;
    doctor_id: number;
    hospital_id: number;
}

export interface AddingHospitalDoctor {
    doctor_id: number;
    hospital_id: number;
}

export interface AddingHospital {
    type: number;
    name: string;

    lan?: string;
    lat?: string;

    phone_number?: string;
    telephone_number?: string;
    email?: string;

    governorate_id: number;
    city_id?: number;
    area_id?: number;
    street_id?: number;

    salesman_description?: string;
    admin_description?: string;
}

export interface AssociationDoctor {
    id: number,
    doctor_id: number,
    association_id: number,
}

export interface AssociationPharmacist {
    id: number,
    pharmacist_id: number,
    association_id: number,
    status: number
}

export interface Association {
    id: number
    name: string
    created_at: string
    admin_description: string
    salesman_description: string
    lat?: string
    lan?: string
    email: string
    phone_number: string
    country: string
    telephone_number: string
    governorate_id: number
    city_id: number
    area_id: number
    street_id: number
}

//for Adding/Edititng
export interface AddingDoctorSample {
    doctor_visit_id: number,
    quantity: number,
}

export interface AddingPharmacistSample {
    pharmacist_visit_id: number,
    quantity: number,
}

export interface AddingDoctorVisit {
    admin_note: string,
    doctor_id: number,
    salesman_id: number,
    type_id: number,
    visit_status_id: number,
    note: string,
    is_other_spoken_note: boolean,
    // photo: string,
    closest_pharmacy: string,
    number_of_patients: number,
}

export interface AddingPharmacistVisit {
    admin_note: string,
    visit_status_id: number,
    pharmacist_id: number,
    salesman_id: number,
    type_id: number,
    status: number,
    note: string,
    is_other_spoken_note: boolean,
    // photo: string,
    number_of_patients: number,
}

export interface AddingDoctor {
    governorate_id: number,
    city_id: number,
    area_id: number,
    street_id: number,
    specialization_id: number,
    first_name: string,
    last_name: string,
    classification_id: number,
    loyalty_id: number,
    birth_date: string,
    admin_description: string,
    salesman_description: string,
    favourite_time_opening: string,
    favourite_time_closing: string,
    first_work_time_opening: string,
    first_work_time_closing: string
    second_work_time_opening: string,
    second_work_time_closing: string,
    graduation_country: string,
    phone_number: string,
    telephone_number: string,
    graduation_university: string,
    gender: number,
    /*  wife_husband_first_name: string;
     wife_husband_last_name: string; */
    //added recently
    full_place: string;
    close_place: string;
    email: string;
    second_name: string;
    waiting_time_id: number;
    stance_on_dietary_supp: string;
    /*    childs_under_12: number;
       childs_above_18: number;
       childs_between_12_18: number;
    */
    adopted_types: string;
    expected_recipes: number;
    preffered_dietary_types: string;
    preffered_treatment_types: string;
    preffered_companies: string;
    competitive_types: string;
    personality_strengthens: string;
    interestes: string;
    personality_type_id: number;
    social_pattern_id: number;
    salesman_relationship_id: number;
    secrtary_first_name: string;
}


export interface AddingPharmacist {
    //Personal Info
    // // photo: string,
    first_name: string,
    second_name: string;
    last_name: string,
    classification_id: number,
    loyalty_id: number,
    birth_date: string,
    admin_description: string,
    salesman_description: string,
    graduation_country: string,
    graduation_university: string,
    phone_number: string,
    telephone_number: string,
    gender: number,
    email: string;
    //Place Info
    governorate_id: number,
    city_id: number,
    area_id: number,
    street_id: number,
    full_place: string;
    close_place: string;
    //Work Time Info
    favourite_time_opening: string,
    favourite_time_closing: string,
    first_work_time_opening: string,
    first_work_time_closing: string
    second_work_time_opening: string,
    second_work_time_closing: string,
    waiting_time_id: number;
    //Medical Info
    stance_on_dietary_supp: string;
    adopted_types: string;
    preffered_dietary_types: string;
    preffered_treatment_types: string;
    preffered_companies: string;
    //Personaltiy Info
    personality_strengthens: string;
    interestes: string;
    personality_type_id: number;
    social_pattern_id: number;
    salesman_relationship_id: number;
    //for Pharmacy only
    pharmacy_description_id: number;
    pharmacy_name: string;
    assistant_full_name: string;
    //Relation to our company
    execute_prescription_id: number;
    doctor_relationship_id: number;
    our_products_existance_percentage_id: number;
}

export interface AddingSpecializationType {
    specialization_id: number;
    status: string;
    type_id: number;
}

export interface AddingSpecialization {
    name: string,
}

export interface AddingDoctorPharmacist {
    doctor_id: number,
    pharmacist_id: number,
}

export interface AddingAssociationDoctor {
    doctor_id: number,
    association_id: number,
}

export interface AddingAssociationPharmacist {
    pharmacist_id: number,
    association_id: number,
    status: number
}

export interface AddingAssociation {
    name: string,
    admin_description: string,
    salesman_description: string,
    lat?: string;
    lan?: string;
    email: string,
    phone_number: string,
    country: string,
    telephone_number: string,
    governorate_id: number,
    city_id: number,
    area_id: number,
    street_id: number,

}

