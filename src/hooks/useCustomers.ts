import Customer from '@/types/customers'
import { createCustomer, deleteCustomer, fetchCustomers, updateCustomer } from '@/services/customerService'
import {
  useQuery,
  UseQueryResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

export const useCustomers = () => {
  const {
    data: customers,
    isLoading,
    isError,
    error,
  }: UseQueryResult<Customer[], Error> = useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomers,
  })

  return {
    customers: customers || [],
    isLoading,
    isError,
    error,
  }
}

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();

  const { mutate: createCustomerMutation, isPending: isCreating } = useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['createCustomer'] })
    },
  })

  return {
    createCustomerMutation,
    isCreating,
  }
}

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();

  const { mutate: updateCustomerMutation, isPending: isUpdating } = useMutation({
    mutationFn: updateCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['updateCustomer'] })
    },
  })

  return {
    updateCustomerMutation,
    isUpdating,
  }
}


export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteCustomerMutation, isPending: isDeleting } = useMutation({
    mutationFn: deleteCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deleteCustomer'] })
    },
  })

  return {
    deleteCustomerMutation,
    isDeleting,
  }
}
