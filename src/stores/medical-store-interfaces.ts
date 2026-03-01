
// 🧩 Interfaces

import { Type } from "./types-store-interfaces";

export interface DoctorSample {
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
    rejection_cause: string,
    doctor_id: number,
    salesman_id: number,
    type_id: number,
    status: number,
    note: string,
    is_other_spoken_note: boolean,
    photo: string,
    closest_pharmacy: string,
    number_of_patients: number,
    samples: DoctorSample[]
}


export interface PharmacistVisit {
    id: number,
    rejection_cause: string,
    pharmacist_id: number,
    salesman_id: number,
    type_id: number,
    status: number,
    note: string,
    is_other_spoken_note: boolean,
    photo: string,
    number_of_patients: number,
    samples: PharmacistSample[]
}

export interface Doctor {
    id: number,
    lan: string,
    lat: string,
    governorate_id: number,
    city_id: number,
    area_id: number,
    street_id: number,
    specialization_id: number,
    //   building_id:number,
    first_name: string,
    last_name: string,
    classification: number,
    loyalty: number,
    last_visit_note: string,
    last_visit_date: Date,
    birth_date: string,
    average_patients_per_day: number,
    admin_description: string,
    salesman_description: string,
    favourite_time_opening: string,
    favourite_time_closing: string,
    first_time_opening: string,
    first_time_closing: string
    last_time_opening: string,
    last_time_closing: string,
    photo: string,
    graduation_country: string,
    graduation_university: string,
    is_added_by_admin: boolean,
    phone_number: string,
    telephone_number: string,
    sex: number,
    wife_husband_first_name: string;
    wife_husband_last_name: string;
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


export interface Pharmacist {
    id: number,
    lan: string,
    lat: string,
    governorate_id: number,
    city_id: number,
    area_id: number,
    street_id: number,
    //   building_id:number,
    first_name: string,
    last_name: string,
    classification: number,
    loyalty: number,
    last_visit_note: string,
    last_visit_date: Date,
    phone_number: string,
    telephone_number: string
    birth_date: string,
    average_patients_per_day: number,
    admin_description: string,
    salesman_description: string,
    favourite_time_opening: string,
    favourite_time_closing: string,
    first_work_time_opening: string,
    first_work_time_closing: string,
    second_work_time_opening: string,
    second_work_time_closing: string,
    photo: string,
    graduation_country: string,
    graduation_university: string,
    is_added_by_admin: boolean,
    sex: number,
    wife_husband_first_name: string;
    wife_husband_last_name: string;
    pharmacistVisits: PharmacistVisit[]
}

export interface SpecializationType {
    id: number,
    specialization_id: number;
    type_id: number;
    doctors: Type[]
}

export interface Specialization {
    id: number,
    name: string,
    doctors: Doctor[]
    specializationTypes: SpecializationType[]
}

export interface DoctorPharmacist {
    id: number,
    doctor_id: number,
    pharmacist_id: number,
}

export interface AssociationDoctor {
    id: number,
    doctor_id: number,
    association_id: number,
    status: number
}

export interface AssociationPharmacist {
    id: number,
    pharmacist_id: number,
    association_id: number,
    status: number
}

export interface Association {
    id: number,
    name: string,
    description: string,
    email: string,
    phone_number: string,
    country: string,
    telephone_number: string,
    associationDoctors: AssociationDoctor[],
    associationPharmacists: AssociationPharmacist[],
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
    rejection_cause: string,
    doctor_id: number,
    salesman_id: number,
    type_id: number,
    status: number,
    note: string,
    is_other_spoken_note: boolean,
    photo: string,
    closest_pharmacy: string,
    number_of_patients: number,
    samples: DoctorSample[]
}

export interface AddingPharmacistVisit {
    rejection_cause: string,
    pharmacist_id: number,
    salesman_id: number,
    type_id: number,
    status: number,
    note: string,
    is_other_spoken_note: boolean,
    photo: string,
    number_of_patients: number,
}

export interface AddingDoctor {
    governorate_id: number,
    city_id: number,
    area_id: number,
    street_id: number,
    specialization_id: number,
    //   building_id:number,
    first_name: string,
    last_name: string,
    classification: number,
    loyalty: number,
    //last_visit_note: string,
    // last_visit_date: Date,
    birth_date: string,
    //average_patients_per_day: number,
    admin_description: string,
    salesman_description: string,
    favourite_time_opening: string,
    favourite_time_closing: string,
    first_work_time_opening: string,
    first_work_time_closing: string
    second_work_time_opening: string,
    second_work_time_closing: string,
    //photo: string,
    graduation_country: string,
    phone_number: string,
    telephone_number: string,
    graduation_university: string,
    //  is_added_by_admin: boolean,
    sex: number,
    wife_husband_first_name: string;
    wife_husband_last_name: string;
}


export interface AddingPharmacist {
    governorate_id: number,
    city_id: number,
    area_id: number,
    street_id: number,
    //   building_id:number,
    first_name: string,
    last_name: string,
    classification: number,
    loyalty: number,
    last_visit_note: string,
    last_visit_date: Date,
    birth_date: string,
    average_patients_per_day: number,
    admin_description: string,
    salesman_description: string,
    favourite_time_opening: string,
    favourite_time_closing: string,
    first_work_time_opening: string,
    first_work_time_closing: string,
    second_work_time_opening: string,
    second_work_time_closing: string,
    photo: string,
    graduation_country: string,
    graduation_university: string,
    is_added_by_admin: boolean,
    sex: number,
    wife_husband_first_name: string;
    wife_husband_last_name: string;
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
    status: number
}

export interface AddingAssociationPharmacist {
    pharmacist_id: number,
    association_id: number,
    status: number
}

export interface AddingAssociation {
    name: string,
    description: string,
    email: string,
    phone_number: string,
    country: string,
    telephone_number: string,
    associationDoctors: AssociationDoctor[],
    associationPharmacists: AssociationPharmacist[],
}

