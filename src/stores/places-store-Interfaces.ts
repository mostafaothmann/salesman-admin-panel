
// 🧩 Interfaces
export interface Governorate {
    id: number,
    name: string,
    cities: City[]
}

export interface City {
    id: number,
    name: string,
    governorate_id: number;
    description: string,
    areas: Area[]
}

export interface Area {
    id: number,
    name: string,
    city_id: number;
    description: string,
    streets: Street[]
}

export interface Street {
    id: number,
    name: string,
    area_id: number;
    description: string,
}



//for Adding/Edititng
export interface AddingGovernorate {
    name: string,
}

export interface AddingCity {
    name: string,
    governorate_id: number;
    description: string,
}

export interface AddingArea {
    name: string,
    city_id: number;
    description: string,
}

export interface AddingStreet {
    name: string,
    area_id: number;
    description: string,
}

export interface AddingBuilding {
    name: string,
    street_id: number;
}
