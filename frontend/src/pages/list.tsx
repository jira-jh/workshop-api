import { useState, useEffect } from 'react'
import { callGet } from '../services/axios.service'
import { Container, Button, Grid, Stack } from '@mui/material'
import { useNavigate } from 'react-router'
import Card from '../components/card'

function ProductList() {
  const navigate = useNavigate()
  const [data, setData] = useState<any>([])

  const fetchData = async () => {
    const res = await callGet('products/list')
    setData(res)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Container>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant='contained' onClick={() => navigate('/add')}>Add Product</Button>
        </Stack>
        <Grid container spacing={3} >
          {data.map((item: any, index: number) => {
            return (
              <Grid item xs={4} key={index} justifyContent={'center'} display={'flex'}>
                <Card data={item} />
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </>
  )
}

export default ProductList