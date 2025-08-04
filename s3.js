const aws4 = require('aws4');
require("dotenv").config();

const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const bucketName = process.env.AWS_BUCKET;

function generateSignedUrl({ method = "PUT", key, expires = 900, contentType = "" }) {
    const host = `${bucketName}.s3.${region}.amazonaws.com`;
    const path = `/${key}`;

    const signed = aws4.sign({
        host,
        method,
        path,
        service: "s3",
        region,
        headers: {
            host,
            ...(contentType && { 'content-type': contentType })
        },
        signQuery: true,
        expires
    },
        { accessKeyId, secretAccessKey }
    )

    return `https://${host}${signed.path}`
}


module.exports={generateSignedUrl}