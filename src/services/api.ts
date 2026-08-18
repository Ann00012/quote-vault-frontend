import { Quote } from '../types/quotes';
import api from './baseURL';
import { categories } from '../types/quotes';
interface UserProps { 
    email: string,
    password:string
}

export interface QuotesResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  quotes: Quote[];
}

interface CreateQuoteProps { 
    text: string;
    author: string;
    category:(typeof categories)[number];
}
export const getRandomQuote = async () => {
    const res = await api.get<Quote>("/quotes/random");
    return res.data;
};

export const registerUser = async ({ email, password }: UserProps) => {
    const res = await api.post("/auth/register", { email, password });
    return res.data;
};

export const loginUser = async ({ email,password}:UserProps) => { 
    const res = await api.post("/auth/login", {email,password});
    return res.data
};

export const getQuotes = async (
  page: number,
  search?: string
): Promise<QuotesResponse> => {
  const perPage = 10;

  const endpoint = search
    ? `/quotes?page=${page}&perPage=${perPage}&search=${search}`
    : `/quotes?page=${page}&perPage=${perPage}`;

  const res = await api.get<QuotesResponse>(endpoint);

  return res.data;
};

export const getSingleQuote = async (id: string) => { 
    const res = await api.get<Quote>(`/quotes/${id}`);
    return res.data
}

export const createQuote = async ({ text, author, category }: CreateQuoteProps) => {
    const res = await api.post<Quote>("/quote", { text, author, category });
    return res.data;
};