export enum ROLE {
    ADMIN = 'ADMIN',
    ASSISTANT = 'ASSISTANT',
    SALESMAN = 'SALESMAN',
}

export interface Salesman {
    id: number;

    first_name: string;
    last_name: string;

    lan?: string;
    lat?: string;

    email: string;
    password: string;

    phone_number: string;
    telephone_number: string;

    birth_date: string;

    governorate_Id: number;
    level: number;
    team_profit: number;
    total_profit: number;
    sales_profit: number;
    leader_id: number;

    city_Id: number;
    area_id: number;
    street_id: number;
    building_id: number;

    role: ROLE.SALESMAN;
}

export interface Assistant {
    id: number;

    first_name: string;
    last_name: string;

    email: string;
    password: string;

    phone_number: string;
    telephone_number: string;

    birth_date: string;

    governorate_Id?: number;
    city_Id: number;
    area_id: number;
    street_id: number;
    building_id: number;

    role: ROLE.ASSISTANT;
}



//For Adding
export interface AddingSalesman {
    first_name: string;
    last_name: string;

    lan?: string;
    lat?: string;

    email: string;
    password: string;

    phone_number: string;
    telephone_number: string;

    birth_date: string;

    governorate_Id: number;
    level: number;
    team_profit: number;
    total_profit: number;
    sales_profit: number;
    leader_id: number;

    city_Id: number;
    area_id: number;
    street_id: number;
    building_id: number;

    role: ROLE.SALESMAN;
}

export interface AddingAssistant {
    first_name: string;
    last_name: string;

    email: string;
    password: string;

    phone_number: string;
    telephone_number: string;

    birth_date: string;

    governorate_Id?: number;
    city_Id: number;
    area_id: number;
    street_id: number;
    building_id: number;

    role: ROLE.ASSISTANT;
}