import { FC, useState} from 'react'
import { Box, Button, Collapse, FormControl, FormControlLabel, FormHelperText, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Switch, TextField, Typography, styled } from '@mui/material'
import { Icon } from '@iconify/react'
import Grid from '@mui/material/Grid'
import { FilterType, Order } from './table.type';
import { CustomerType } from '@/types/customer';

interface Props {
  filterWord: FilterType,
  setFilter: (filter: FilterType) => void;
  order:Order,
  orderBy:keyof CustomerType,
  onRequestSort:(property: keyof CustomerType) => void;
  rowsPerPage:number,
  setRowsPerPage:(PerPage: number) => void;
  
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

const DataTableToolBar: FC<Props> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {filterWord,setFilter, order, orderBy, onRequestSort, rowsPerPage, setRowsPerPage} = props;
  const [checked, setChecked] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [perPageValue, setPerPageValue] = useState<number>(10);
  const createSortHandler =
    (property: keyof CustomerType)  => {
      onRequestSort(property);
    };

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  const handleSearchValue = (sortValue:string) =>{
    setSearchValue(sortValue);
    headCells.map((headCell)=>{
      if(String(headCell.label).toLowerCase().includes(String(searchValue).toLowerCase())){
        createSortHandler(headCell.id);
        return;
      }
    })
  }
  const handleSwitchSort = (event:React.SyntheticEvent<Element,Event>, checked:boolean)=>{
    // if()
    handleSearchValue(searchValue);
  }
  const handleRowsPerPage = (PerPage:number)=>{
    setRowsPerPage(PerPage);
    setPerPageValue(PerPage);
  }
  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
      width: 32,
      height: 32,
      '&::before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));
  
  return (
    <Box
      sx={{
        p: 1,
        bgcolor: (theme) => theme.palette.primary.main
      }}>
      <Stack
        sx={{
          width: "100%", 
          background: "#ffffff"
        }}
        justifyContent="space-between"
        alignItems="center"
        direction="row">
        <TextField
          fullWidth
          placeholder="Search"
          onChange={(e)=>setFilter({filter:e.target.value})}
          InputProps={{
            style: {
              borderRadius: 0,
            },
            startAdornment: (
              <InputAdornment position="start">
                <Icon icon="hugeicons:search-01" />
              </InputAdornment>
            )
          }}
          size="small"/>
        <Stack direction="row">
          <Button
            sx={{height: 44,
              p: 0, 
              borderRadius: 0, 
              fontSize: 20, 
              minWidth: 44, 
              border: "1px solid #aaa"}
            }
            disableElevation
          >
            <Icon icon="material-symbols:grid-view-outline" />
          </Button>
          <Button
            sx={{
              height: 44, 
              px: 2, 
              borderRadius: 0, 
              bgcolor:"rgb(237, 247, 237)"}
            }
            disableElevation
            endIcon={<Icon icon="mynaui:filter" />}
            onClick={handleChange}
          >
            Filters
          </Button>
        </Stack>
      </Stack>
      <Box sx={{border:"1 solid black"}}>
        <Grid container sx={{bgcolor:"rgb(237, 247, 237)"}}>
          <Grid item xs={12} >
              <Collapse orientation="vertical" in={checked}>
                <Grid item container lg={12}>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={4}></Grid>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={4}></Grid>
                </Grid>
              </Collapse>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default DataTableToolBar