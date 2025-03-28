import { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { Container, Typography, TextField, Grid, Button, Stack, Divider } from '@mui/material'
import { callPost } from '../services/axios.service'
import { useNavigate, useLocation } from 'react-router'
function AddProduct() {
  const navigate: any = useNavigate()
  const location = useLocation()
  const data = location.state?.data;
  const [initialValues, setInitialValues] = useState<any>({})

  useEffect(() => {
    if (data) {
      setInitialValues(data)
    } else {
      setInitialValues({ name: '', image: '', description: '', price: 0 })
    }
  }, [data])

  console.log(initialValues);

  return (
    <Container>
      <Typography variant='h5'>Add Product</Typography>
      <br />
      <Divider />
      <br />
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log(values);

          callPost('products/add', values).then((res) => {
            if (res) {
              navigate('/')
            } else {

            }
          })
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id='name'
                  name='name'
                  label='Name'
                  value={values.name}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id='image'
                  name='image'
                  label='image'
                  value={values.image}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id='description'
                  name='description'
                  label='description'
                  value={values.description}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id='price'
                  name='price'
                  label='price'
                  value={values.price}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>
            <br />
            <Divider />
            <br />
            <Stack spacing={2} direction='row' justifyContent='flex-end'>
              <Button type='submit' variant='contained'>Submit</Button>
            </Stack>
          </form>
        )}
      </Formik>
    </Container>
  )
}

export default AddProduct