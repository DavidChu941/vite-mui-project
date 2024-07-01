export type CustomerType = {
  id:number;
  country: string;
  type: "business" | "private";
  company_name: string;
  language: string;
  name_contact_person: string;
  email_contact_person: string;
  phone_contact_person: string;
  address: string;
  city: string;
  postal_code: string;
  payment_due_days: number;
  company_id: number | string;
  ean: number;
  edit:string;
}