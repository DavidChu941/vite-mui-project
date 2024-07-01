import {
  Box,
  Grid, IconButton,
  Paper,
  Stack, 
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Chip,
  Divider,
  ButtonProps
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { useCustomers, useDeleteCustomer } from '@/hooks/useCustomers';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
const CustomerInfo = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [invoiceColor, setInvoiceColor] = useState<ButtonProps['color']>("inherit");
  const [taskColor, setTaskColor] = useState<ButtonProps['color']>("inherit");
  const [offerColor, setOfferColor] = useState<ButtonProps['color']>("inherit");
  const {deleteCustomerMutation} = useDeleteCustomer();

  const handleInvoiceColor = () =>{
    setInvoiceColor((prevColor) => (prevColor === 'inherit' ? 'primary' : 'inherit'));
    setTaskColor("inherit");
    setOfferColor("inherit");
  }
  const handleTaskColor = () =>{
    setTaskColor((prevColor) => (prevColor === 'inherit' ? 'primary' : 'inherit'));
    setInvoiceColor("inherit");
    setOfferColor("inherit");
  }
  const handleOfferColor = () =>{
    setOfferColor((prevColor) => (prevColor === 'inherit' ? 'primary' : 'inherit'));
    setTaskColor("inherit");
    setInvoiceColor("inherit");
  }

  const {customers} = useCustomers();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    deleteCustomerMutation(params.id);
    setOpen(false);
  };

  const filterCustomerInfo = customers.find((customer: { id: number; }) => customer.id === Number(params.id));
  return (
    <Box sx={{ py: 2 }}>
      <Stack spacing={2}>
        <Stack
          justifyContent="space-between"
          alignItems="center"
          direction="row"
          spacing={2}>
          <Stack direction="row" alignItems="center">
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
              Information
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Button
              onClick={()=>{navigate("/invoices/new")}}
              variant="contained"
              disableElevation>
              Create Invoice 
            </Button>
            <Button
              onClick={()=>{navigate("/tasks/new")}}
              variant="contained" 
              disableElevation>
              Create Task
            </Button>
            <Button 
              onClick={()=>{navigate(`/customers/${params.id}/edit/`)}}
              variant="contained" 
              disableElevation>
              Edit Customer
            </Button>
            <Button
              onClick={handleClickOpen} 
              variant="contained" 
              color="error" 
              disableElevation>
              Delete
            </Button>
            
          </Stack>
        </Stack>
        <Paper
          
          sx={{
            pb: 5,
            borderRadius: 0,
            boxShadow: '0 0 8px 0 hsla(215,9%,64%,.15)'
          }}
          elevation={0}>
          <Grid
            spacing={2}
            p={2}
            pl={5}
            pr={5}
          >
            <Grid container item xs={12}>
              <Grid 
                container
                sx={{
                  display:"flex",
                  justifyContent:"space-between"
                }}
                >
                <Box>
                  <Typography variant="h6" sx={{fontWeight:"800", color:"#aaa"}}>{filterCustomerInfo?.name_contact_person}</Typography>
                </Box>
                <Box>
                  <Chip label={filterCustomerInfo?.type} sx={{fontSize:15}} color="primary" />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Divider sx={{color:"black"}} />
          <Grid container xs={12} p={4}>
            <Grid container item xs={4}>
              <Stack direction="column">
                <Stack direction="row" spacing={2} alignItems="center" mb={1}>
                  <MailOutlineOutlinedIcon sx={{fontSize:22}} />
                  <Typography variant="caption">{filterCustomerInfo?.email_contact_person}</Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center" mb={1}>
                  <PhoneIphoneOutlinedIcon sx={{fontSize:22}} />
                  <Typography variant="caption">{filterCustomerInfo?.phone_contact_person}</Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center" mb={1}>
                  <TranslateOutlinedIcon sx={{fontSize:22}} />
                  <Typography variant="caption">{filterCustomerInfo?.language}</Typography>
                </Stack>
                <Stack direction="column" spacing={1} alignItems="flex-start" mb={1}>
                  <Typography variant="body1" sx={{fontWeight:"800", color:"#aaa"}}>Company Name</Typography>
                  <Typography variant="caption">{filterCustomerInfo?.company_name}</Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid container item xs={4}>
              <Stack direction="column">
                <Stack direction="column" spacing={1} alignItems="flex-start" mb={1}>
                <Typography variant="body1" sx={{fontWeight:"800", color:"#aaa"}}>Address</Typography>
                  <Typography variant="caption">{filterCustomerInfo?.address}</Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center" mb={1}>
                  <Typography variant="caption">{filterCustomerInfo?.city}</Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center" mb={1}>
                  <Typography variant="caption">{filterCustomerInfo?.postal_code}</Typography>
                </Stack>
                <Stack direction="column" spacing={1} alignItems="flex-start" mb={1}>
                  {/* <Typography variant="body2" sx={{fontWeight:"800", color:"#bbb"}}>Company Name</Typography> */}
                  <Typography variant="caption">{filterCustomerInfo?.country}</Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid container item xs={4}>
              <Stack direction="column">
                <Stack direction="column" spacing={0} alignItems="flex-start" mb={1}>
                  <Typography variant="body1" sx={{fontWeight:"800", color:"#aaa"}}>CVR</Typography>
                  <Typography variant="caption">{filterCustomerInfo?.company_id}</Typography>
                </Stack>
                <Stack direction="column" spacing={0} alignItems="flex-start" mb={1}>
                  <Typography variant="body1" sx={{fontWeight:"800", color:"#aaa"}}>EAN</Typography>
                  <Typography variant="caption">{filterCustomerInfo?.ean}</Typography>
                </Stack>
                <Stack direction="column" spacing={0} alignItems="flex-start" mb={1}>
                  <Typography variant="body1" sx={{fontWeight:"800", color:"#aaa"}}>Payment due days</Typography>
                  <Typography variant="caption">{filterCustomerInfo?.payment_due_days}</Typography>
                </Stack>
                
              </Stack>
            </Grid>
          </Grid>
          
        </Paper>
        <Stack>
          <Stack 
            direction="row" 
            justifyContent="flex-start" 
            spacing={2}>
            <Button
                // onClick={()=>{navigate("/invoices/new")}}
                variant="contained"
                color={invoiceColor}
                onClick={handleInvoiceColor}
                >
                  Invoices 
              </Button>
              <Button
                // onClick={()=>{navigate("/tasks/new")}}
                variant="contained"
                color={taskColor} 
                onClick={handleTaskColor}
                >
                Tasks
              </Button>
              <Button 
                // onClick={()=>{navigate(`/customers/${params.id}/edit/`)}}
                variant="contained"
                color={offerColor}
                onClick={handleOfferColor}
                >
                Offers
              </Button>
          </Stack>
        </Stack>
      </Stack>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          Are you sure that you wish to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={handleClose}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default CustomerInfo

