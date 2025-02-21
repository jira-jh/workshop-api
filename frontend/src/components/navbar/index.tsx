import { Container, Box } from "@mui/material"
function Navbar() {
  return (
      <Box sx={{ 
        height: '50px',
         display: 'flex', 
         justifyContent: 'space-between',
         alignItems: 'center', 
         backgroundColor: 'black', color: 
         'white' , padding: '0 20px 0 20px'}}
         >
<Container>
        <Box>
          Logo
        </Box>
        <Box>
          Cart
        </Box>
        </Container>
      </Box>
  )
}

export default Navbar