import AXIOS from 'axios'
async function UploadBannerImage(image){
    // console.log('insideImageUpload',image);
    const formdata = new FormData()
    formdata.append('banner',image)

    const resData = await AXIOS.post("https://zenglow-server.onrender.com/products/upload-banner-image",formdata,{headers:{'Content-Type':'multipart/form-data'}})
}
export default UploadBannerImage