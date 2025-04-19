"use server"
import { revalidatePath } from "next/cache"
import {S3Client } from "@aws-sdk/client-s3"
import { nanoid} from "nanoid"
import {createPresignedPost} from "@aws-sdk/s3-presigned-post"

const s3Client = new S3Client({
    region: process.env.NEXT_AWS_S3_REGION ,
    credentials: {
      accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID ?? '',
      secretAccessKey: process.env.NEXT_AWS_S3_ACCESS_KEY ?? ''
    }
  })
  
  export const uploadFiles = async (prevState : {message:string,status?:string, url? : string| null} , formData: FormData)=>{
    try{
      const file = formData.get("file")
      const textData = formData.get("text") as string
       console.log(file,textData);
       return {status:"failure" , message : "please add an image"}
       
      if((file as File).size === 0) return {status:"failure" , message : "please add an image"}
        console.log("sendingFile")
        const {url,fields} = await createPresignedPost(
          s3Client,
          {
          Bucket : process.env.NEXT_AWS_S3_BUCKER_NAME ?? '' ,
          Key : nanoid()
        })
        const formDataS3 = new FormData()
        Object.entries(fields).forEach(([Key,value])=>{
          formDataS3.append(Key,value)
        })
        formDataS3.append('file',file as string)
        const response = await fetch(url,{
          method:'POST',
          body:formDataS3
        }) 
        const text = await response.text()
         console.log(text)
        if(response.ok){
          console.log(fields.key)
          revalidatePath("/")
          return {status:"success", message:`${url}/${fields.key}`, url: `${url}/${fields.key}`, text: textData}
        }else{
          console.log("file error not uploaded")
          return {status:"failure", message:"file has not been uploaded"}
        }
    }catch(error){
      console.log(error)
      return {status:"failure", message:"file has not been uploaded"}
    }
  }
  
  export async function uploadToS3(formData: FormData) {
    const file = formData.get("file") as Blob | null;
    if (!file) throw new Error("No file provided");
  
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
  
    // const fileName = `uploads/${Date.now()}-${(file as File).name}`;
    // const params = {
    //   Bucket: process.env.NEXT_AWS_S3_BUCKER_NAME!,
    //   Key: fileName,
    //   Body: buffer,
    //   ContentType: file.type,
    // };
  
  
    const {url,fields} = await createPresignedPost(
      s3Client,
      {
      Bucket : process.env.NEXT_AWS_S3_BUCKER_NAME ?? '' ,
      Key : nanoid()
    })
  
    const formDataS3 = new FormData()
        Object.entries(fields).forEach(([Key,value])=>{
          formDataS3.append(Key,value)
        })
    const blob = new Blob([buffer]);
    formDataS3.append('file', blob);
    const response = await fetch(url,{
          method:'POST',
          body:formDataS3
        }) 
    revalidatePath("/"); 
    return `https://s3.eu-north-1.amazonaws.com/${process.env.NEXT_AWS_S3_BUCKER_NAME}/${fields.key}`;
  }