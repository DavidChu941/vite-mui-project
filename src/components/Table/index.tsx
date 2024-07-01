import { Box } from '@mui/material'
import Paper from '@mui/material/Paper'
import DataTableToolBar from './toolbar'
import TableContent from './table'
import { FilterType, Order,  TableHeadItemType } from './table.type'
import { FC, useState } from 'react'
import { CustomerType } from '@/types/customer'
import Customer from '@/types/customers'
// import { fetchCustomers } from '@/services/customerService'
// import { useCustomers } from '@/hooks/useCustomers'
// import {fetchCustomers} from '@/services/customerService';
interface Props {
  filterWord: FilterType,
  setFilter: (filter: FilterType) => void,
  head: TableHeadItemType,
  order:Order,
  orderBy:keyof CustomerType,
  setOrder:(order:Order)=>void,
  setOrderBy:(orderBy:keyof CustomerType)=>void,
  customers:Customer[]
  
}


const DataTable: FC<Props> = (props) => {
  const {head,setFilter, filterWord, order, orderBy, setOrder,setOrderBy, customers} = props;
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (
    property: keyof CustomerType,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  



  return (
    <Box>
      <Paper
        sx={{
          borderRadius: 0,
          boxShadow: '0 0 8px 0 hsla(215,9%,64%,.15)'
        }}>
        <DataTableToolBar filterWord={filterWord} setFilter={setFilter} order={order} orderBy={orderBy}  onRequestSort={handleRequestSort} setRowsPerPage={setRowsPerPage} rowsPerPage={rowsPerPage}/>
        <TableContent head={head}filterWord={filterWord} order={order} orderBy={orderBy}  onRequestSort={handleRequestSort} customers={customers} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}/>
      </Paper>
    </Box>
  )
}

export default DataTable;
