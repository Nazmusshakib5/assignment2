// importing http server
const http=require('http');
const fs=require('fs');

//using multer for uploading
const multer=require('multer');
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./UploadedFiles');
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    },
});
let upload=multer({storage:storage}).single('aFile');



// Creating http server
http.createServer((req,res)=>{
    if(req.url=='/'){
        res.write("This is Home Page");
        res.end();
    }
    else if(req.url=='/about'){
        res.write("This is About Page");
        res.end();
    }
    else if(req.url=='/contact'){
        res.write("This is Contact Page");
        res.end();
    }
    // this response will create a file demo.txt with value hello world
    else if(req.url=='/file-write'){
        fs.writeFile("demo.txt","hello world",(err)=>{
            if(err){
                res.writeHead(200,{"Content-Type":"text/html"});
                res.write("File Write Unseccessful");
                res.end();
            }
            else{
                res.writeHead(200,{"Content-Type":"text/html"});
                res.write("File Write Seccessful");
                res.end();
            }
        })
    }

// file upload using multer
    else if(req.method ==='POST' && req.url=='/upload'){
        upload(req,res,(err)=>{
            if(err){
                return res.end("File Upload Unseccessful");
            }
            res.end("File Upload Successful.");
        })
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Invalid URL');
    }

}).listen(5500,()=>{
    console.log("The server is running....");
});