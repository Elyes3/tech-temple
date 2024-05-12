export interface User{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    password?: string;
    message?: string;
    orders?: any;
    role?: string; 
    enabled?: boolean;
    img?: string | null;
}