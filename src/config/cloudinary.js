import { v2 as cloudinary } from 'cloudinary'

const connectCloudinary = async () => {

    await cloudinary.config({
        cloud_url: process.env.CLOUDINARY_URL
    })
}

export default connectCloudinary;