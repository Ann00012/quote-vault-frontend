import { Quote,User } from '../types/quotes';
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

export interface CreateQuoteProps { 
    text: string;
    author: string;
    category:(typeof categories)[number];
}

export type UpdateQuotePayload = Partial<CreateQuoteProps>;

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

export const deleteQuote = async(id: string)=> { 
    const res = await api.delete(`/quotes/${id}`);
    return res.data;
}

export const editQuote = async (id: string, payload: UpdateQuotePayload) => {
  const res = await api.patch<Quote>(`/quotes/${id}`, payload);
  return res.data;
};

export const updateAvatar = async (file: File): Promise<{ url: string }> => {
  const formData = new FormData();
  formData.append("avatar", file);

  const response = await api.patch<{ url: string }>("/users/me/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const requestResetEmail = async (email: string) => { 
  const res = await api.post(`/auth/request-reset-email`, { email });
  return res.data;

};

export const resetPassword = async (data: {
  token: string;
  password: string;
})=> {
  const res = await api.post(`/auth/reset-password`, data);
  return res.data;
  };
