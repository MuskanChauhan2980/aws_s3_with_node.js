const {
    s3Client,
    GetObjectCommand,
    PutObjectCommand,
    ListObjectsV2Command,
    DeleteObjectCommand,
    S3Client
} = require("@aws-sdk/client-s3");

const {getSignedUrl} = require("@aws-sdk/s3-request-presigner");
require("dotenv").config();


const s3Client=new S3Client({
    region:process.env.AWS_REGION,
    credentials:{
        accessKeyId:process.env.AWS_ACSESS_KEY_ID,
        secretAccessKey:process.env.AWS_SECERT_ACCESS_KEY   //userid_file-type.pdf,23412413413_marriage-certificate
        
    }
})

async function generateUploadUrl(fileName,contentType){
    const command=new PutObjectCommand({
        Bucket:process.env.AWS_BUCKET_NAME,
        key:`uploads/${fileName}`,
        ContentType:contentType
    });
    const url= await getSignedUrl(s3Client,command,{expiresIn:3600});
    return url;
}

async function generateDownloadUrl(key){
    const command= new GetObjectCommand({
        Bucket:process.env.AWS_BUCKET_NAME,
        Key:key
    })
    const url= await getSignedUrl(s3Client,command,{expiresIn:3600})
    return url;
}

async function listFiles(){
    const command= new ListObjectsV2Command({
        Bucket:process.env.AWS_BUCKET_NAME,
    })
    const result=await s3Client.send(command);
    return result.Contents ||[];
}


async function deleteFile(key){
    const command= new DeleteObjectCommand({
        Bucket:process.env.AWS_BUCKET_NAME,
        Key:key
    });
    await s3Client.send(command);
}


module.exports={
    generateDownloadUrl,
    generateUploadUrl,
    listFiles,
    deleteFile
}