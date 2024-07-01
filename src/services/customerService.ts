import { AxiosResponse } from 'axios'
import Customer from '@/types/customers'
import axiosInstance from './axios'

export const fetchCustomers = async (): Promise<Customer[]> => {
  const response: AxiosResponse<Customer[]> = await axiosInstance.get(
    `/api/customers`
  )
  return response.data
}


export const createCustomer = async (data: Customer): Promise<Customer> => {
  const response: AxiosResponse<Customer> = await axiosInstance.post(
    "/api/customers",
    data,
    // {headers: "Bearer "}
  )

  return response.data
}

export const updateCustomer = async ({id, data}: {id: string | number; data: Customer}): Promise<Customer> => {
  const response: AxiosResponse<Customer> = await axiosInstance.put(
    `/api/customers/${id}`,
    data
  )

  return response.data
}

export const deleteCustomer = async (id: number): Promise<void> => {
  const response = await axiosInstance.delete(`/api/customers/${id}`);
  return response.data
}