import { FC } from 'react'
import { TableHead, TableRow, TableCell, Checkbox, TableSortLabel,  Box } from '@mui/material'
import { TableHeadItemType, Order} from './table.type'
import { visuallyHidden } from '@mui/utils';
import { CustomerType } from '@/types/customer';
interface Props {
  head: TableHeadItemType
  order: Order,
  orderBy: keyof CustomerType,
  onSelectAllClick:(event: React.ChangeEvent<HTMLInputElement>)=>void,
  rowCount:number,
  numSelected:number,
  onRequestSort: (property: keyof CustomerType) => void;
}
interface HeadCell {
  disablePadding: boolean;
  id: keyof CustomerType;
  label: string;
  numeric: boolean;
}


const headCells: readonly HeadCell[] = [
  {
    id: 'name_contact_person',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'address',
    numeric: true,
    disablePadding: false,
    label: 'Address',
  },
  {
    id: 'phone_contact_person',
    numeric: true,
    disablePadding: false,
    label: 'Telephone',
  },
  {
    id: 'type',
    numeric: true,
    disablePadding: false,
    label: 'CustomerType',
  },
  {
    id:'edit',
    numeric:true,
    disablePadding:false,
    label:"Edit"
  }
];

const DataTableHead: FC<Props> = (props) => {
  
  const {head, order, orderBy, onSelectAllClick, numSelected, rowCount, onRequestSort} = props;
  
  const createSortHandler =
    (property: keyof CustomerType) => () => {
      onRequestSort(property);
    };
  return (
    <TableHead>
      <TableRow>
        {
          head.checkbox && (
            <TableCell 
              padding="checkbox"
            >
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={onSelectAllClick}
                color="primary"/>
            </TableCell>
          )
        }
        {
          headCells.map((headCell)=>{
            const active = orderBy === headCell.id;
            return(
              <TableCell
                key={headCell.id}
                aria-sort={
                  active
                    ? ({ asc: 'ascending', desc: 'descending' } as const)[order]
                    : undefined
                }
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                  
                  {headCell.label}
                    {active ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                </TableSortLabel>
                
              </TableCell>
            )
          })
        }
      </TableRow>
    </TableHead>
  )
}

export default DataTableHead