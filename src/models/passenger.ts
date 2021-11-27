export const GenderTypes = {
    Male: "Male",
    Female: "Female",
    Agender: "Agender",
    Bigender: "Bigender",
    Genderfluid: "Genderfluid",
    Genderqueer: "Genderqueer",
    Polygender: "Polygender",
    "Non-binary": "Non-binary"
};

export type Gender = keyof typeof GenderTypes;

export type Passenger = {
    first_name: string;
    last_name: string;
    email: string;
    gender: Gender;
    phone: string;
    balance: number;
    ride_status: number;
    banned: boolean;
    cellphone_verified: boolean;
    number_masked: string | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
    id: number;
};