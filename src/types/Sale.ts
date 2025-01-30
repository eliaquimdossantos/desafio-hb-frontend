import { User } from './User';

export type Sale = {
  id: string;
  status: string;
  total_price: string;
  customer_id?: string;
  users?: User;
  created_at?: string;
}