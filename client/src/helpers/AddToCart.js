import AXIOS from'axios'
import { toast } from 'react-toastify'

const AddToCart = async(id,nav) =>{
    const resData = await AXIOS.post("https://zenglow-server.onrender.com/user/addtocart",{ProductId:id},{headers:{token:localStorage.getItem('token')}})
    if(resData.data.success){
        toast.success(resData.data.message)
    }
    if(resData.data.error){
        toast.error(resData.data.message)
    }
}

export default AddToCart