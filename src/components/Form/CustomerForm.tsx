import { FC,useMemo, useState } from 'react'
import {
  Checkbox, CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Box, Button, Divider, FormControl,
  Grid, InputAdornment, MenuItem,
  Paper,
  Select,
  Typography, Stack
} from '@mui/material'
import { countries, TCountryCode } from 'countries-list'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'
import Customer from '@/types/customers.ts'

interface CustomerFormProps {
  form: UseFormReturn<Customer>,
  onSubmit: SubmitHandler<Customer>,
  isLoading: boolean,
  btnString: string,
  filterCustomerList:Customer | undefined
}

const CustomerForm: FC<CustomerFormProps> = (props) => {
  const { form, onSubmit, isLoading, btnString, filterCustomerList } = props;

  const [inputValue, SetInputValue] = useState<Customer>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = form
  
  const [countryName, setCountryName] = useState("");
  useMemo(()=>{
    setCountryName("CU");
  },[])
  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Paper
          sx={{
            p: 3,
            pb: 5,
            borderRadius: 0,
            boxShadow: '0 0 8px 0 hsla(215,9%,64%,.15)'
          }}
          elevation={0}>
          <Grid
            spacing={2}
            container>
            <Grid item xs={6}>
              <Typography
                p={.3}
                fontSize={12}
                fontWeight={600}
                color="#6c7781">
                Country
              </Typography>
              <Select
                defaultValue=""
                placeholder="Select country"
                size="small"
                value={countryName}
                fullWidth
                {...register('country', {
                  required: 'Country is a required field'
                })}>
                <MenuItem value="">
                  Select Country
                </MenuItem>
                {Object.entries(countries).map(
                  ([countryCode, countryData]) => (
                    <MenuItem key={countryCode} value={countryCode}>
                      {countryData.name}
                    </MenuItem>
                  )
                )}
              </Select>
              <Typography>
                {errors.country && (errors.country?.message || '')}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                p={.3}
                fontSize={12}
                fontWeight={600}
                color="#6c7781">
                Customer type
              </Typography>
              <Box sx={{ px: 1 }}>
                <RadioGroup
                  row
                  defaultValue={filterCustomerList?.type}>
                  <FormControlLabel
                    {...register('type')}
                    sx={{ width: '45%', border: '1px solid #d5d7db', height: 44, borderRadius: 1 }}
                    value="business"
                    label="Business"
                    control={<Radio />} />
                  <FormControlLabel
                    {...register('type')}
                    sx={{ width: '45%', border: '1px solid #d5d7db', height: 44, borderRadius: 1, ml: .1 }}
                    value="private"
                    label="Private"
                    control={<Radio />} />
                </RadioGroup>
              </Box>
            </Grid>
          </Grid>
        </Paper>
        <Paper
          sx={{
            p: 3,
            pb: 5,
            borderRadius: 0,
            boxShadow: '0 0 8px 0 hsla(215,9%,64%,.15)'
          }}
          elevation={0}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={2}>
            <Grid item md={6} xs={12}>
              <Typography
                p={.3}
                fontSize={12}
                fontWeight={600}
                color="#6c7781">
                Company name *
              </Typography>
              <TextField
                style={{ margin: '1px' }}
                fullWidth
                value={filterCustomerList?.company_name}
                size="small"
                {...register('company_name', {
                  required: 'Company name is a required field'
                })}
                helperText={
                  <Typography
                    component="span"
                    fontWeight={500}
                    fontSize={11}
                    color="error"
                  >
                    {errors.company_name && (errors.company_name?.message || '')}
                  </Typography>
                }
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <Typography
                  p={.3}
                  fontSize={12}
                  fontWeight={600}
                  color="#6c7781">
                  Language *
                </Typography>
                <Select
                  size="small"
                  defaultValue={filterCustomerList?.language}
                  value='English'
                  {...register('language', {
                    required: 'Language is a required field'
                  })}>
                  <MenuItem value="Danish">Danish</MenuItem>
                  <MenuItem value="English">English</MenuItem>
                </Select>
                <Typography
                  component="span"
                  fontWeight={500}
                  fontSize={11}
                  color="error">
                  {errors.language && (errors.language?.message || '')}
                </Typography>
              </FormControl>
            </Grid>
            <Grid item md={12} xs={12}>
              <Divider
                textAlign="left"
                sx={{ pt: 3 }}>
                <Typography
                  textTransform="uppercase"
                  fontSize={14}
                  fontWeight={600}>
                  Contact person
                </Typography>
              </Divider>
            </Grid>
            <Grid item md={12} xs={12}>
              <Typography
                p={.3}
                fontSize={12}
                fontWeight={600}
                color="#6c7781">
                Name
              </Typography>
              <TextField
                value={filterCustomerList?.name_contact_person}
                size="small"
                fullWidth
                {...register('name_contact_person')}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography
                p={.3}
                fontSize={12}
                fontWeight={600}
                color="#6c7781">
                Email *
              </Typography>
              <TextField
                value={filterCustomerList?.email_contact_person}
                type="email"
                size="small"
                {...register('email_contact_person', {
                  required: 'Email is a required field'
                })}
                helperText={
                  <Typography
                    component="span"
                    fontWeight={500}
                    fontSize={11}
                    color="error">
                    {errors.email_contact_person && (errors.email_contact_person?.message || '')}
                  </Typography>
                }
                fullWidth />
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography
                p={.3}
                fontSize={12}
                fontWeight={600}
                color="#6c7781">
                Telephone *
              </Typography>
              <TextField
                value={filterCustomerList?.phone_contact_person}
                size="small"
                {...register("phone_contact_person", { required: "Telephone is required" })}
                helperText={
                  <Typography
                    component="span"
                    fontWeight={500}
                    fontSize={11}
                    color="error">
                    {errors.phone_contact_person && (errors.phone_contact_person?.message || '')}
                  </Typography>
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography>
                        +{countries?.[(watch('country') || "US") as TCountryCode].phone?.[0] || ""}
                      </Typography>
                    </InputAdornment>
                  )
                }}
                fullWidth
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <FormControlLabel
                control={<Checkbox size="small" defaultChecked />}
                label={
                  <Typography fontSize={14}>
                    Send automatic reminders
                  </Typography>
                }
                sx={{
                  marginBottom: '3px',
                  paddingRight: '23px',
                  fontWeight: 600,
                  color: '#98a6ad'
                }}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <Typography
                fontSize={12}
                color="#98a6ad">
                A friendly reminder is automatically sent to your customer 4
                and 11 days after the payment date has been exceeded. This is
                mandatory if you choose quick payout.
              </Typography>
            </Grid>
            <Grid item md={12} xs={12}>
              <Divider
                textAlign="left"
                sx={{ pt: 3 }}>
                <Typography
                  textTransform="uppercase"
                  fontSize={14}
                  fontWeight={600}>
                  Address information
                </Typography>
              </Divider>
            </Grid>
            <Grid item md={12} xs={12}>
              <Typography
                p={.3}
                fontSize={12}
                fontWeight={600}
                color="#6c7781">
                Address *
              </Typography>
              <TextField
                value={filterCustomerList?.address}
                size="small"
                {...register('address', {
                  required: 'Address is a required field'
                })}
                helperText={
                  errors.address ?
                    <Typography
                      component="span"
                      fontWeight={500}
                      fontSize={11}
                      color="error">
                      {(errors.address?.message || '')}
                    </Typography> :
                    <Typography
                      component="span"
                      mt={0.4}
                      px={1}
                      lineHeight={1.2}
                      color="#98a6ad"
                      fontSize={11}>
                      The company's street name and number
                    </Typography>
                }
                fullWidth
              />

            </Grid>
            <Grid item md={6} xs={12}>
              <Typography
                p={.3}
                fontSize={12}
                fontWeight={600}
                color="#6c7781">
                City *
              </Typography>
              <TextField
                value={filterCustomerList?.city}
                size="small"
                {...register('city', {
                  required: 'City is a required field'
                })}
                helperText={
                  <Typography
                    component="span"
                    fontWeight={500}
                    fontSize={11}
                    color="error">
                    {errors.city && (errors.city?.message || '')}
                  </Typography>
                }
                fullWidth />
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography
                p={.3}
                fontSize={12}
                fontWeight={600}
                color="#6c7781">
                Postal code *
              </Typography>
              <TextField
                value={filterCustomerList?.postal_code}
                size="small"
                {...register('postal_code', {
                  required: 'Postal Code is a required field'
                })}
                helperText={
                  <Typography
                    component="span"
                    fontWeight={500}
                    fontSize={11}
                    color="error">
                    {errors.postal_code && (errors.postal_code?.message || '')}
                  </Typography>
                }
                fullWidth
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <Divider
                textAlign="left"
                sx={{ pt: 3 }}>
                <Typography
                  textTransform="uppercase"
                  fontSize={14}
                  fontWeight={600}>
                  Payment due days
                </Typography>
              </Divider>
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography
                p={.3}
                fontSize={12}
                fontWeight={600}
                color="#6c7781">
                Payment due days
              </Typography>
              <TextField
                value={filterCustomerList?.payment_due_days}
                size="small"
                type="number"
                fullWidth
                {...register('payment_due_days')}
              />
              <Typography
                mt={0.4}
                px={1}
                lineHeight={1.2}
                color="#98a6ad"
                fontSize={11}>
                Standard number of payment days. Can also be changed per
                invoice
              </Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography
                p={.3}
                fontSize={12}
                fontWeight={600}
                color="#6c7781">
                Organization or registration number
              </Typography>
              <TextField
                value={filterCustomerList?.company_id}
                size="small"
                fullWidth
                {...register('company_id')}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography
                p={.3}
                fontSize={12}
                fontWeight={600}
                color="#6c7781">
                EAN
              </Typography>
              <TextField
                value={filterCustomerList?.ean}
                type="number"
                size="small"
                fullWidth
                {...register('ean')}
              />
              <Typography
                mt={0.4}
                px={1}
                lineHeight={1.2}
                color="#98a6ad"
                fontSize={11}>
                The customer's EAN number used to invoice. Only use if your
                customer has provided an EAN. Otherwise leave empty
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4 }} />
          <Button
            startIcon={isLoading ? <CircularProgress size={18} color="info" /> : undefined}
            disabled={isLoading}
            sx={{ height: 42, width: 250 }}
            type="submit"
            variant="contained"
            disableElevation>
            {btnString}
          </Button>
        </Paper>
    </Stack>
    </form>
  )
}

export default CustomerForm
