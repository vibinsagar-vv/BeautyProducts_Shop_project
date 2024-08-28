import AXIOS from'axios'
import { toast } from 'react-toastify'

const AddToCart = async(id,nav) =>{
    const resData = await AXIOS.post("http://localhost:7800/user/addtocart",{ProductId:id},{headers:{token:localStorage.getItem('token')}})
    if(resData.data.success){
        toast.success(resData.data.message)
    }
    if(resData.data.error){
        toast.error(resData.data.message)
    }
}

export default AddToCart