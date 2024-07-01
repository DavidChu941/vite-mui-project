import {
  Box, CircularProgress, IconButton, Stack, Typography
} from '@mui/material'
import { Icon } from '@iconify/react'
import { useNavigate, useParams } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  useCustomers,
  useUpdateCustomer
} from '@/hooks/useCustomers'
import Customer from '@/types/customers.ts'
import CustomerForm from '@components/Form/CustomerForm.tsx'

const CustomerEdit = () => {
  const navigate = useNavigate();
  const params = useParams();
  const {isLoading, customers} = useCustomers();
  const {updateCustomerMutation, isUpdating} = useUpdateCustomer()

  const form = useForm<Customer>()
  const filterCustomerList = customers.find(customer => customer.id === Number(params.id));
  
  const onSubmit: SubmitHandler<Customer> = async (data: Customer) => {
    updateCustomerMutation({ id: data.id, data })
    try {
      console.log(data);
      form.reset()
    } catch (e) {
      console.warn(e);
    }
  }

  
  return (
    <Box sx={{ py: 2 }}>
      {
        isLoading ? (
          <Box sx={{py: 4}}>
            <Stack alignItems="center">
              <CircularProgress/>
            </Stack>
          </Box>
          
        ):(
          <Stack spacing={2}>
            <Stack
              justifyContent="flex-start"
              alignItems="center"
              direction="row"
              spacing={2}>
              <IconButton
                onClick={() => {
                  navigate('/customers')
                }}
                color="primary">
                <Icon icon="bx:arrow-back" />
              </IconButton>
              <Typography
                pl={2}
                lineHeight={1}
                fontSize={32}
                fontWeight={800}
                component="h1"
                variant="h5"
                textTransform="uppercase"
                color="primary">
                Edit Customer
              </Typography>

            </Stack>
            <CustomerForm form={form} onSubmit={onSubmit} isLoading={isUpdating} btnString="Update Customer" filterCustomerList={filterCustomerList}/>
          </Stack>
        )
      }
    </Box>
  )
}

export default CustomerEdit