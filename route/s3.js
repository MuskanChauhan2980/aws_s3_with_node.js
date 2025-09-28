const express = require('express');
const { getSignatureKey, hash } = require("../awsSigV4Utils");
const router = express.Router();
const crypto = require("crypto");


require("dotenv").config();

router.get("/upload-url", async (req, res) => {
    const { fileName, contentType } = req.query;
    const bucket = process.env.BUCKET_NAME;
    const region = process.env.AWS_REGION;
    const accessKey = process.env.AWS_ACCESS_KEY;
    const secretKey = process.env.AWS_SECERT_KEY;

    const method = "PUT";
    const service = 's3';
    const host = `${bucket}.s3.${region}.amazonaws.com`;
    const key = `uploads/${fileName}`;
    const algorithm = "AWS4-HMAC-SHA256";

    const now = new Date();
    const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, "");
    const dateStamp = `${dateStamp}/${region}/${service}/aws4_request`;

    const canonicalUri = `/${key}`;
    const canonicalQuerystring = "";

    const signedHeaders = "host;x-amz-content-sha256;x-amz-date";
    const payloadHash = hash("");

    const canonicalHeaders = `host:${host}\n` +
        `x-amz-content-sha256:${payloadHash}\n` +
        `x-amz-date:${amzDate}\n`;


    const canonicalRequest = [
        method,
        canonicalUri,
        canonicalQuerystring,
        canonicalHeaders,
        signedHeaders,
        payloadHash
    ].join("\n");

    const stringToSign = [
        algorithm,
        amzDate,
        credentialScope,
        hash(canonicalRequest)
    ].join('\n');

    const signingKey = getSignatureKey(secretKey, dateStamp, region, service);
    const signature = crypto.createHmac("sha256", signingKey)
        .update(stringToSign)
        .digest("hex")

    const authorizationHeader = `${algorithm} Credential=${accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

    const url = `https://${host}${canonicalUri}`;

    res.json({
        url,
        headers: {
            "x-amz-content-sha256": payloadHash,
            "x-amz-date": amzDate,
            Authorization: authorizationHeader,
            "Content-Type": contentType
        }
    })
})

module.exports = router;