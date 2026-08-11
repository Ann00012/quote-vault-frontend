import { Quote } from '../types/quotes';
import api from './baseURL';

export const getRandomQuote = async () => { 
    const res = await api.get<Quote>("/quotes/random");
    return res.data;
}