const { S3Client,
    GetObjectCommand,
    putObjectUrl,
    ListObjectsV2Command } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: "",   // access key in aws account 
        secretAccessKey: ""  // secret accesss key in aws account 
    }
});

async function getObjectUrl(key) {
    const command = new GetObjectCommand({
        Bucket: "Bucket_Name",     // Bucket name which is we are use in aws account 
        Key: key
    });

    const url = await getSignedUrl(s3Client, command);   // create a presigned url by using the s3Client and  getObjectcommand 
    return url;
}

async function putObjectUrl(fielName, contentType) {
    const command = new putObjectUrl({
        Bucket: "BucketName-private",
        Key: `/uploads/user-uploads/${fielName}`,
        contentType: contentType
    })
    const url = await getSignedUrl(s3Client, command);
    return url;
}

async function init() {
    console.log("URL for graphql.jpeg", await getObjectUrl("graphql.jpeg"))
}
async function initPutObjectUrl() {
    console.log("URL for uploading", await putObjectUrl(`image-${Date.now()}.jpeg`, "imge/jpeg"))
}

init();
initPutObjectUrl();



