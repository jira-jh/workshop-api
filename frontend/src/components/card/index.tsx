import { Card as _Card, CardActions, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router';
function Card(props: any) {
  const navigate = useNavigate()

  const navigateToEdit = () => {
    navigate('/add', { state: { data: props.data } })
  }

  const { data } = props
  return (
    <_Card sx={{ width: '100%' }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data?.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {data?.address}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button variant='contained' size="small" onClick={() => navigateToEdit()}>Edit</Button>
        <Button variant='contained' color='error' size="small">Delete</Button>
      </CardActions>
    </_Card>
  )
}

export default Card