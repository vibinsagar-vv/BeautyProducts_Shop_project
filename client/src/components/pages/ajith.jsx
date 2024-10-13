import { Box, Button, Container, Divider, Modal, Typography } from '@mui/material'
import { jwtDecode } from 'jwt-decode'
import React, { useState, useEffect, useRef } from 'react';
import AXIOS from 'axios'
import './paymentPage.css'




const PaymentPage = () => {
  const [userdata, setUserdata] = useState({
    full_name: '',
    phonenumber: '',
    email: '',
    address: {
      pincode: '',
      address: '',
      dis: '',
      state: '',
      landmark: '',
      altPhone: '',
    },
  });
    const [open, setOpen] = useState(false);
    const token =localStorage.getItem('token')
    const data =jwtDecode(token)
    const [isAddress,setIsAdress]=useState(false)
    const [addressUpdated, setAddressUpdated] = useState(false);

    const handleClose = () => setOpen(false);
      
    const handleChange = (e) => {
      const { name, value } = e.target;
      
      // Check if the input field is part of the address object
      if (['pincode', 'address', 'dis', 'state', 'landmark', 'altPhone'].includes(name)) {
        setUserdata((prevData) => ({
          ...prevData,
          address: {
            ...prevData.address, // Keep other address fields intact
            [name]: value, // Update the specific address field
          },
        }));
      } else {
        // Update other non-address fields like full_name, email, etc.
        setUserdata((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    };
    

    const setadress = ()=>{
      
      console.log(!userdata.address.pincode, !userdata.address.address , !userdata.address.dis ,!userdata.state);
      
      
      if(!userdata.address.pincode || !userdata.address.address || !userdata.address.dis || !userdata.address.state){
        alert('fill all required fileds')
        return
      }else  if(data.address == undefined || data.address == ''){
        setOpen(true)
      }else{
         setIsAdress(false)
      }
     
      
    }

    const setHomeAdrss =(e)=>{
      e.preventDefault()
        
        const {full_name,email,phonenumber,...rest}=userdata
        const udata ={
          userid:data.email,
          
            ...rest
          
        }
         console.log('datta',udata);
         
        const url ='http://localhost:8000/user/udpdate'
       AXIOS.put(url,udata).then(result=>{
       if(result.data.status == 1){
        localStorage.setItem('token',result.data.token)
        alert('home adress added')
        setIsAdress(!isAddress)
        handleClose()
        setAddressUpdated(true);
        
       }
        
       }).catch((err )=>{
        console.log(err);
        
       })
    }

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };

    useEffect(()=>{
      const token = localStorage.getItem('token');
      const data = jwtDecode(token);
  
      // Safely update userdata, ensuring address fields are handled properly
      setUserdata((prevData) => ({
        ...prevData,
        full_name: data.full_name || '',
        phonenumber: data.phonenumber || '',
        email: data.email || '',
        address: {
          pincode: data.address?.pincode || '',
          address: data.address?.address || '',
          dis: data.address?.dis || '',
          state: data.address?.state || '',
          landmark: data.address?.landmark || '',
          altPhone: data.address?.altPhone || '',
        },
      }));
     console.log(!data.address);
      
     if(!data.address){
      setIsAdress(true)
     }
      
      
    },[addressUpdated])
    
  return (
    <>

<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Home Address
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2}}>
            {userdata.full_name}
          </Typography>
          
          <Box display={'flex'} flexWrap={'wrap'}>
          <Typography id="modal-modal-description" >
            {userdata.address.address},
          </Typography>
          <Typography id="modal-modal-description" >
            {userdata.address.dis},
          </Typography>
          <Typography id="modal-modal-description" >
            {userdata.address.state}
          </Typography>
          </Box>
         
          {userdata.landmark&&
           <Typography id="modal-modal-description" >
          landmark : {userdata.address.landmark}
         </Typography>
          } 
           <Typography id="modal-modal-description" >
            phone: {userdata.address.phonenumber}
          </Typography>

          {userdata.altPhone &&
           <Typography id="modal-modal-description" >
          Alternative Phone : {userdata.address.altPhone}
         </Typography>
          } 




          <Button variant="contained" onClick={setHomeAdrss} sx={{mt:2}}> set as Home Address</Button>
        </Box>
       
      </Modal>

   <Container sx={{ display: { xs: 'block', md: 'flex' }, bgcolor: '#131313', gap: 2, p: 5 }}>
    <Box width={'100%'}>
    <Typography variant='h2' fontSize={{xs:20,md:30}} fontWeight={400} color={'whitesmoke'}>Delivery Adress</Typography>
    <Divider style={{ background: 'white', marginTop: '15px' }} />

    {isAddress &&
    <Box className="updatecontainer">
    <Box className="updateformcontainer">
      
      <form noValidate  className="updateform">

      <Box className="formgroup" width={{xs:'100%',md:'40%',lg:'30%'}}>
          <label>Name</label>
          <input
            type="text"
            value={userdata.full_name || ''}
            name="full_name"
            required
           onChange={handleChange}
          />
         
        </Box>
        <Box className="formgroup" width={{xs:'100%',md:'40%',lg:'30%'}}>
          <label>Phone NUmber</label>
          <input
            type="text"
             value={userdata.phonenumber || ''}
            name="phonenumber"
            required
            onChange={handleChange}
          />
         
        </Box>
        <Box className="formgroup" width={{xs:'100%',md:'60%',lg:'40%'}}>
          <label>Eamil id</label>
          <input
            type="text"
            value={userdata.email || ''}
            name="email"
            required
            onChange={handleChange}
          />
         
        </Box>
        <Box className="formgroup" width={{xs:'100%',md:'21%',lg:'20%'}}>
          <label>Pin Code</label>
          <input
            type="text"
        
            value={userdata.address.pincode || ''}
            name="pincode"
            required
            onChange={handleChange}
          />
         
        </Box>

        <Box className="formgroup" width={{xs:'100%',md:'81%',lg:'60%'}}>
        
           
          <label>Address</label>
          <textarea
            rows="3"
            required
            value={userdata.address.address || ''}
            name="address"
            onChange={handleChange}
          />
         
        </Box>
<Box  width={{xs:'100%',md:'10%',lg:'30%'}}>  </Box>
<Box className="formgroup" width={{xs:'100%',md:'40%',lg:'30%'}}>
          <label>City/ Town /District</label>
          <input
            type="text"
            value={userdata.address.dis || ''}
            name="dis"
            required
            onChange={handleChange}
          />
         
        </Box>
        <Box className="formgroup" width={{xs:'100%',md:'40%',lg:'30%'}}>
          <label>State</label>
          <input
            type="text"
            value={userdata.address.state|| ''}
            name="state"
            required
            onChange={handleChange}
          />
         
        </Box>
        <Box  width={{xs:'100%',md:'10%',lg:'30%'}}>  </Box>
<Box className="formgroup" width={{xs:'100%',md:'40%',lg:'30%'}}>
          <label>Land Mark(optional)</label>
          <input
            type="text"
            value={userdata.address.landmark || ''}
            name="landmark"
            onChange={handleChange}
            required
          />
         
        </Box>
        <Box className="formgroup" width={{xs:'100%',md:'40%',lg:'30%'}}>
          <label>ALternate Phone (optional)</label>
          <input
            type="text"
            value={userdata.address.altPhone || ''}
            name="altPhone"
            onChange={handleChange}
            required
          />
         
        </Box>
        
        
        <Box  width={{xs:'100%',md:'80%',lg:'60%'}} display={'flex'} justifyContent={'center'}>
                  <Button  
                  onClick={setadress}
                     sx={{ backgroundColor: '#007bff', border: 'none', padding: '10px 20px', color: 'white', borderRadius: '4px', cursor: 'pointer',width:'40%' }}>
                       Deliver Here
                    
                       </Button>

        </Box>


       


       
        </form>
        </Box>
        </Box>
    }
{console.log(userdata)
}
    { ! isAddress &&
    <Box >
    
    <Typography color={'gray'} id="modal-modal-description" sx={{ mt: 2}}>
      {userdata.full_name}
    </Typography>
    <Typography color={'gray'} id="modal-modal-description">
      {userdata.email}
    </Typography>
    
    <Box display={'flex'} flexWrap={'wrap'}>
    <Typography color={'gray'} id="modal-modal-description" >
      {userdata.address.address},
    </Typography>
    <Typography color={'gray'} id="modal-modal-description" >
      {userdata.address.dis},
    </Typography>
    <Typography color={'gray'} id="modal-modal-description" >
      {userdata.address.state}
    </Typography>
    </Box>
   
    {userdata.landmark&&
     <Typography color={'gray'} id="modal-modal-description" >
    landmark : {userdata.address.landmark}
   </Typography>
    } 
     <Typography color={'gray'} id="modal-modal-description" >
      phone: {userdata.phonenumber}
    </Typography>

    {userdata.altPhone &&
     <Typography color={'gray'} id="modal-modal-description" >
    Alternative Phone : {userdata.address.altPhone}
   </Typography>
    } 




    <Button variant="contained" onClick={() => setIsAdress(true)}   sx={{mt:2}}> edit </Button>
  </Box>
    }



    </Box>
    <Box>

    </Box>
   </Container>
    </> 
  )
}

export default PaymentPage