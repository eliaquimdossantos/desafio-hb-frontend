import { Supplier } from './Supplier';

export type Purchase = {
  id: string;
  sale_id?: string;
  supplier_id?: string;
  nfe_number?: string;
  total_price?: string;
  status?: string;
  suppliers: Supplier;
  created_at?: string;
}