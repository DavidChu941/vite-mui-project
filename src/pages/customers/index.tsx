import { useNavigate } from 'react-router-dom'
import { Box, Button, Stack, Typography, Alert, CircularProgress} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DataTable from '@components/Table'
import { TableHeadItemType,FilterType, Order } from '@components/Table/table.type'
import { useState, FC } from 'react'
import { CustomerType } from '@/types/customer'
import { useCustomers } from '@/hooks/useCustomers'


const Customers: FC = () => {
  const navigate = useNavigate();
  

  const [filterWord, setFilter] = useState<FilterType>({filter:""});
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof CustomerType>('name_contact_person');


  const tableHead: TableHeadItemType = { checkbox: true }
  const { isLoading, customers  } = useCustomers();
  
 
  
  // const tableBody: TableContentType = [
  //   // {
  //   //   name: (
  //   //     <Stack
  //   //       alignItems="center"
  //   //       spacing={1.5}
  //   //       direction="row">
  //   //       <Avatar
  //   //         sx={{
  //   //           bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
  //   //           color: (theme)=>theme.palette.primary.main,
  //   //           width: 40,
  //   //           height: 40,
  //   //           fontSize: 14
  //   //         }}>
  //   //         IK
  //   //       </Avatar>
  //   //       <Stack>
  //   //         <Typography
  //   //           fontSize={15}
  //   //           fontWeight={700}
  //   //           variant="h6">
  //   //           Illia Kurantsev
  //   //         </Typography>
  //   //         <Typography
  //   //           lineHeight={1}
  //   //           variant="caption"
  //   //           fontSize={12}>
  //   //           illia@kurantsev.com
  //   //         </Typography>
  //   //       </Stack>
  //   //     </Stack>
  //   //   ),
  //   //   address: '121st St E, Washington 98445',
  //   //   telephone: '+1 (253) 533-2244',
  //   //   type: (
  //   //     <Chip
  //   //       icon={<Icon icon="akar-icons:person" />}
  //   //       sx={{height: "24px", fontWeight: 400, fontSize: 12, pt: .1, px:1.2}}
  //   //       color="primary"
  //   //       label={<Typography fontSize={10}>Person</Typography>}/>
  //   //   ),
  //   //   action: (
  //   //     <Stack
  //   //       spacing={1}
  //   //       justifyContent="flex-end"
  //   //       direction="row">
  //   //       <Button
  //   //         sx={{minWidth: 32, width: 32, height: 32, p: 0, fontSize: 16}}
  //   //         disableElevation
  //   //         variant="contained"
  //   //         size="small">
  //   //         <Icon icon="tabler:edit" />
  //   //       </Button>
  //   //       <Button
  //   //         color="error"
  //   //         sx={{minWidth: 32, width: 32, height: 32, p: 0, fontSize: 16}}
  //   //         disableElevation
  //   //         variant="contained"
  //   //         size="small">
  //   //         <Icon icon="hugeicons:delete-put-back" />
  //   //       </Button>
  //   //     </Stack>
  //   //   )
  //   // },
  //   // {
  //   //   name: (
  //   //     <Stack
  //   //       alignItems="center"
  //   //       spacing={1.5}
  //   //       direction="row">
  //   //       <Avatar
  //   //         sx={{
  //   //           bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
  //   //           color: (theme)=>theme.palette.primary.main,
  //   //           width: 40,
  //   //           height: 40,
  //   //           fontSize: 14
  //   //         }}>
  //   //         IK
  //   //       </Avatar>
  //   //       <Stack>
  //   //         <Typography
  //   //           fontSize={15}
  //   //           fontWeight={700}
  //   //           variant="h6">
  //   //           Illia Kurantsev
  //   //         </Typography>
  //   //         <Typography
  //   //           lineHeight={1}
  //   //           variant="caption"
  //   //           fontSize={12}>
  //   //           illia@kurantsev.com
  //   //         </Typography>
  //   //       </Stack>
  //   //     </Stack>
  //   //   ),
  //   //   address: '121st St E, Washington 98445',
  //   //   telephone: '+1 (253) 533-2244',
  //   //   type: (
  //   //     <Chip
  //   //       icon={<Icon icon="ion:business-outline" />}
  //   //       sx={{height: "24px", fontWeight: 400, fontSize: 12, pt: .1, pl:.8}}
  //   //       color="success"
  //   //       label={<Typography fontSize={10}>Company</Typography>}/>
  //   //   ),
  //   //   action: (
  //   //     <Stack
  //   //       spacing={1}
  //   //       justifyContent="flex-end"
  //   //       direction="row">
  //   //       {/* TODO: integrate ID */}
  //   //       <Button
  //   //         onClick={()=>{
  //   //           navigate(`/customers/1/edit`)
  //   //         }}
  //   //         sx={{minWidth: 32, width: 32, height: 32, p: 0, fontSize: 16}}
  //   //         disableElevation
  //   //         variant="contained"
  //   //         size="small">
  //   //         <Icon icon="tabler:edit" />
  //   //       </Button>
  //   //       <Button
  //   //         color="error"
  //   //         sx={{minWidth: 32, width: 32, height: 32, p: 0, fontSize: 16}}
  //   //         disableElevation
  //   //         variant="contained"
  //   //         size="small">
  //   //         <Icon icon="hugeicons:delete-put-back" />
  //   //       </Button>
  //   //     </Stack>
  //   //   )
  //   // },
  // ]
  //
  
  // for(let i = 0; i < 25; i++){
  //   tableBody[i] = costomer;
    
  // }
  
  
  // 
  

  // const tableBody: TableContentType = customers.map(customer => ({
  //   name: (
  //     <Stack
  //       alignItems="center"
  //       spacing={1.5}
  //       direction="row">
  //       <Avatar
  //         sx={{
  //           bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
  //           color: (theme)=>theme.palette.primary.main,
  //           width: 40,
  //           height: 40,
  //           fontSize: 14
  //         }}>
  //         IK
  //       </Avatar>
  //       <Stack>
  //         <Typography
  //           fontSize={15}
  //           fontWeight={700}
  //           variant="h6">
  //           {customer.name_contact_person}
  //         </Typography>
  //         <Typography
  //           lineHeight={1}
  //           variant="caption"
  //           fontSize={12}>
  //           {customer.email_contact_person}
  //         </Typography>
  //       </Stack>
  //     </Stack>
  //   ),
  //   address: customer.address,
  //   telephone: customer.phone_contact_person,
  //   type: (
  //     <Chip
  //       icon={<Icon icon="ion:business-outline" />}
  //       sx={{height: "24px", fontWeight: 400, fontSize: 12, pt: .1, pl:.8}}
  //       color="success"
  //       label={<Typography fontSize={10}>{customer.type}</Typography>}/>
  //   ),
  //   action: (
  //     <Stack
  //       spacing={1}
  //       justifyContent="flex-end"
  //       direction="row">
  //       <Button
  //         sx={{minWidth: 32, width: 32, height: 32, p: 0, fontSize: 16}}
  //         disableElevation
  //         variant="contained"
  //         size="small">
  //         <Icon icon="tabler:edit" />
  //       </Button>
  //       <Button
  //         color="error"
  //         sx={{minWidth: 32, width: 32, height: 32, p: 0, fontSize: 16}}
  //         disableElevation
  //         variant="contained"
  //         size="small">
  //         <Icon icon="hugeicons:delete-put-back" />
  //       </Button>
  //     </Stack>
  //   )
  // }))
  return (
    <Box sx={{py: 2}}>
      
      <Stack spacing={2}>
        <Stack
          justifyContent="space-between"
          alignItems="center"
          direction="row"
          spacing={2}>
          <Typography
            pl={2}
            lineHeight={1}
            fontSize={32}
            fontWeight={800}
            component="h1"
            variant="h5"
            textTransform="uppercase"
            color="primary">
            Customers
          </Typography>
          <Button
            onClick={()=>{navigate("/customers/new")}}
            startIcon={<AddIcon/>}
            disableElevation
            variant="contained">
            Create Customer
          </Button>
        </Stack>
        <Stack>
          <Alert
            icon={false}
            sx={{
              position: 'relative',
              padding: '.75rem 1.25rem',
              border: '1px solid transparent',
              '& .MuiAlert-message': {
                padding: 0
              }
            }}
          >
            Here is the overview of your various customers 🤝 You also have the
            option to create new ones and edit existing ones
          </Alert>
        </Stack>

        {
          isLoading ? (
            <Box sx={{py: 4}}>
              <Stack alignItems="center">
                <CircularProgress/>
              </Stack>
            </Box>
            ) : (
            <DataTable 
              filterWord={filterWord}
              order={order}
              orderBy={orderBy}
              setOrder={setOrder}
              setOrderBy={setOrderBy}
              setFilter={setFilter}
              head={tableHead} 
              customers={customers}
             />
          )
        }
      </Stack>
    </Box>
  )
}

export default Customers;



