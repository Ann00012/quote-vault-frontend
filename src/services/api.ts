import { Quote } from '../types/quotes';
import api from './baseURL';

interface RegisterProps { 
    email: string,
    password:string
}
export const getRandomQuote = async () => {
    const res = await api.get<Quote>("/quotes/random");
    return res.data;
};

export const registerUser = async ({ email, password }: RegisterProps) => { 
    const res = await api.post("/auth/register", {email,password});
    return res.data;
}