import { FC,useState } from 'react'
import { TableContainer, Table, TableBody, TableRow, TableCell, Checkbox,alpha, TablePagination, Stack, Avatar, Typography,  Chip, Button, DialogContentText, tableCellClasses, styled } from '@mui/material'
import DataTableHead from './head'
import { Icon } from '@iconify/react'
import { TableHeadItemType,  Order, FilterType } from './table.type'
import React from 'react'
import { useNavigate} from 'react-router-dom'
import { Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
import { CustomerType } from '@/types/customer'
import Customer from '@/types/customers'
import {useDeleteCustomer } from '@/hooks/useCustomers'

interface Props {
  head: TableHeadItemType,
  filterWord:FilterType,
  order:Order,
  orderBy:keyof CustomerType,
  onRequestSort: (property: keyof CustomerType) => void,
  customers:Customer[],
  rowsPerPage:number,
  setRowsPerPage:(rowsPerPage:number)=>void
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const TableContent: FC<Props> = (props) => {
  const navigate = useNavigate();
  const { head, order, orderBy, onRequestSort, customers,filterWord, rowsPerPage, setRowsPerPage} = props
  const [page, setPage] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [filterCustomersList, setFilterCustomersList] = useState<Customer[]>([]);
  const {deleteCustomerMutation} = useDeleteCustomer();
  const [customerId, setCustomerId ] = useState<number | undefined>();
  const handleClickOpen = (id:number) => {
    setCustomerId(id);
    setOpen(true);
  };

  const handleClose = async (cid: number | undefined) => {
    if(cid) {
      deleteCustomerMutation(cid);
      setOpen(false);
      navigate('refresh');
    }
  };
    
  // pagination.total = 25;
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
    // console.log(pagination.page);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);

  };
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = customers.map((n) => n.id);
      // console.log(newSelected);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
  ) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort<T>(array: Customer[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function checkAll(items:Customer){
    return String(items.country).toLowerCase().includes(String(filterWord.filter).toLowerCase())||
    String(items.type).toLowerCase().includes(String(filterWord.filter).toLowerCase())||
    String(items.company_name).toLowerCase().includes(String(filterWord.filter).toLowerCase())||
    String(items.language).toLowerCase().includes(String(filterWord.filter).toLowerCase())||
    String(items.name_contact_person).toLowerCase().includes(String(filterWord.filter).toLowerCase())||
    String(items.phone_contact_person).toLowerCase().includes(String(filterWord.filter).toLowerCase())||
    String(items.email_contact_person).toLowerCase().includes(String(filterWord.filter).toLowerCase())||
    String(items.address).toLowerCase().includes(String(filterWord.filter).toLowerCase());
  }
  
  
  // console.log(filteredCustomers);
  const visibleRows = React.useMemo(
    () =>{
      const filteredCustomers = customers.filter(customer => 
        checkAll(customer)
      );
      setFilterCustomersList(filteredCustomers);
      return stableSort(filteredCustomers, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      );},
      
    [order, orderBy, page,rowsPerPage, filterWord],
  );
  // console.log(visibleRows);

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    
    setSelected(newSelected);
  };
  return (
    <TableContainer>
      <Table>
        <DataTableHead 
          head={head}
          onSelectAllClick={handleSelectAllClick} 
          order={order}
          orderBy={orderBy}
          numSelected={selected.length}  
          rowCount={filterCustomersList.length} 
          onRequestSort={onRequestSort}
          />
        <TableBody>
          
          {
              
              visibleRows.map((row, index) => {
                const isItemSelected = isSelected(Number(row.id));
                return (
                  (<StyledTableRow 
                    // onMouseOver={alert()}
                    hover
                    sx={{cursor:"pointer"}}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    key={`row-${index}`}
                  >
                    {
                      head.checkbox && (
                        
                        <StyledTableCell padding="checkbox">
                          <Checkbox
                            checked= {isItemSelected}
                            color="primary"
                            onClick={(event) => handleClick(event, Number(row.id))}
                            />
                        </StyledTableCell>
                      )
                    }
                    <StyledTableCell
                      onClick={() => navigate(`/customers/${row.id}`)}
                    >
                      <Stack
                        alignItems="center"
                        spacing={1.5}
                        direction="row">
                        <Avatar
                          sx={{
                            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                            color: (theme)=>theme.palette.primary.main,
                            width: 40,
                            height: 40,
                            fontSize: 14
                          }}>
                          IK
                        </Avatar>
                        <Stack>
                          <Typography
                            fontSize={15}
                            fontWeight={700}
                            variant="h6">
                            {row.name_contact_person}
                          </Typography>
                          <Typography
                            lineHeight={1}
                            variant="caption"
                            fontSize={12}>
                            {row.email_contact_person}
                          </Typography>
                        </Stack>
                      </Stack>
                    </StyledTableCell>
                    <StyledTableCell
                      onClick={() => navigate(`/customers/${row.id}`)}
                    >
                      <Typography>
                        {row.email_contact_person}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell
                      onClick={() => navigate(`/customers/${row.id}`)}
                    >
                      <Typography>
                        {row.phone_contact_person}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell
                      onClick={() => navigate(`/customers/${row.id}`)}
                    >
                      {
                      (row.type !== "business")?
                      <Chip
                        icon={<Icon  icon="akar-icons:person" />}
                        sx={{height: "24px", fontWeight: 400, fontSize: 12, pt: .1, px:1.2}}
                        color="primary"
                        label={<Typography fontSize={10}>Person</Typography>}/>
                        :
                      <Chip
                        icon={<Icon icon="ion:business-outline" />}
                        sx={{height: "24px", fontWeight: 400, fontSize: 12, pt: .1, pl:.8}}
                        color="success"
                        label={<Typography fontSize={10}>Company</Typography>}/>}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Stack
                        spacing={1}
                        justifyContent="flex-end"
                        direction="row">
                        <Button
                          sx={{minWidth: 32, width: 32, height: 32, p: 0, fontSize: 16}}
                          onClick={()=>{navigate(`/customers/${row.id}/edit/`)}}
                          disableElevation
                          variant="contained"
                          size="small">
                          <Icon icon="tabler:edit" />
                        </Button>
                        {/* <TransitionDeleteButton/> */}
                        <Button
                          color="error"
                          sx={{minWidth: 32, width: 32, height: 32, p: 0, fontSize: 16}}
                          disableElevation
                          variant="contained"
                          size="small"
                          onClick={()=>handleClickOpen(Number(row.id))}
                          >
                          <Icon icon="hugeicons:delete-put-back" />
                        </Button>
                      </Stack>
                    </StyledTableCell>
                  </StyledTableRow>)
                );
              })
            
          }
        </TableBody>
        <TablePagination count={customers.length} page={page}  rowsPerPage={rowsPerPage} onRowsPerPageChange={handleChangeRowsPerPage} onPageChange={handleChangePage}/>
      </Table>
      <Dialog
        open={open}
        onClose={()=>setOpen(false)}
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          Are you sure that you wish to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined" 
            autoFocus 
            onClick={()=>setOpen(false)}
          >
            Cancel
          </Button>
          <Button 
            disableElevation
            variant="contained" 
            color="error" 
            onClick={()=>handleClose(customerId)}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
}

export default TableContent