// how the frontend work with this backend 

const uploadFile=async(file)=>{
    // Step 1: Get the presigned URL from your Node.js backend
    const res=await axios.get("http://localhost:3000/s3/upload-url",{
        params:{
            fileName:file.name,   // Send file name to backend
            contentType:file.type   // Send content type (like image/jpeg)
        }
    });
    
    // Step 2: Upload the file directly to S3 using the presigned URL
    await axios.put(res.data.url,file,{
        headres:{"Content-Type":file.type}   // Set correct content-type
    });
    alert("Upload to S3");
}


const downloadFile=async(fileKey)=>{
    try{
        // Step 1: Get the presigned download URL from backend
        const res=await axios.get(`http://localhost:3000/s3/download-url/${fileKey}`)
        // Step 2: Create a temporary <a> tag to trigger download
        const link= document.createElement("a");
        link.href=res.data.url;
        link.download= fileKey;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    catch(error){
        console.log("Download failed",error);
        alert("Failed to download file")
    }
}