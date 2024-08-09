import AXIOS from 'axios'
async function UploadImage(ProductName,image){
    // console.log('insideImageUpload',image);
    const formdata = new FormData()
    formdata.append('product',image)
    formdata.append('ProductName',ProductName)

    const resData = await AXIOS.post("http://localhost:7800/products/upload-product-image",formdata,{headers:{'Content-Type':'multipart/form-data','imagename':ProductName}})
}
export default UploadImage