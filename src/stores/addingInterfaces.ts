
// 🧩 Interfaces
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
