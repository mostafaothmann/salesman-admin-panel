export enum ROLE {
    ADMIN = 'ADMIN',
    ASSISTANT = 'ASSISTANT',
    SALESMAN = 'SALESMAN',
}

export interface Salesman {
    id: number;

    first_name: string;
    last_name: string;

    admin_description: string;

    lan?: string;
    lat?: string;

    email: string;
    password: string;

    phone_number: string;
    telephone_number: string;

    birth_date: string;

    sex: number;

    governorate_Id: number;
    level: number;
    team_profit: number;
    total_profit: number;
    sales_profit: number;
    leader_id: number;

    governorate_id: number;
    city_id: number;
    area_id: number;
    street_id: number;

    account_status_id: number;
    role: ROLE.SALESMAN;
}

export interface Assistant {
    id: number;

    first_name: string;
    last_name: string;

    lan?: number;
    lat?: number;

    admin_description: string;

    sex: number;

    email: string;
    password: string;

    phone_number: string;
    telephone_number: string;

    birth_date: string;

    governorate_id: number;
    city_id: number;
    area_id: number;
    street_id: number;

    account_status_id: number;
    role: ROLE.ASSISTANT;
}



//For Adding
export interface AddingSalesman {
    first_name: string;
    last_name: string;

    lan?: string;
    lat?: string;

    admin_description?: string;

    sex: number;

    email: string;
    password: string;

    phone_number: string;
    telephone_number: string;

    birth_date: string;

    level?: number;
    team_profit?: number;
    total_profit?: number;
    sales_profit?: number;
    leader_id?: number;

    governorate_id: number;
    city_id: number;
    area_id: number;
    street_id: number;

    account_status_id: number;
    account_type_id: number;
    role: ROLE.SALESMAN;
}

export interface AddingAssistant {
    first_name: string;
    last_name: string;

    admin_description: string;

    sex: number;

    email: string;
    password: string;

    phone_number: string;
    telephone_number: string;

    birth_date: string;

    governorate_id: number;
    city_id: number;
    area_id: number;
    street_id: number;

    account_status_id: number;
    role: ROLE.ASSISTANT;
}


export interface FilterSalesmanProps {
    page: number;
    limit: number;
    filter_first_name: string;
    filter_last_name: string;
    filter_governorate_id: number;
    filter_city_id: number;
    filter_area_id: number;
    filter_street_id: number;
    filter_account_status_id: number;
    filter_account_type_id: number;
    filter_min_time: number;
    filter_max_time: number;
}