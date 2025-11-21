# 🖼️ AWS Image Optimization Pipeline  
### Amazon S3 + AWS Lambda + Sharp (Node.js 20)

A production-ready, serverless Image Optimization System that automatically **compresses, converts, and optimizes images** using AWS services.

This pipeline reduces image size by **70–90%** while keeping high visual quality.

---

## 🚀 Tech Stack (AWS Services Used)

- **Amazon S3** – stores raw & optimized images  
- **AWS Lambda (Node.js 20)** – image processing  
- **Sharp (Lambda Layer)** – compression engine  
- **S3 Event Notifications** – triggers Lambda  
- **CloudWatch Logs** – monitoring  
- **IAM Roles** – secure access for S3 + Logs  

---

## ✨ Features

- 🔄 Automatic image optimization  
- 🗜️ Reduces size while preserving quality  
- 🔧 Converts all images to **WebP**  
- ⚡ Fully serverless (no EC2 needed)  
- 📂 Raw → Processed flow using folders:
  - `raw/` (input)
  - `optimized/` (output)

---

## 📁 S3 Folder Structure

```
/image-project-demo
    /raw
        image1.jpg
        image2.png
        
    /optimized
        image1.webp
        image2.webp
```

---

## 📐 Architecture

```
User Upload → S3 (raw/)
           → S3 Event Trigger
           → Lambda (Sharp Compress)
           → S3 (optimized/)
           → Public URL (used by client/UI)
```

---

## 🧠 How It Works

1. User uploads an image to **S3 → raw/**
2. S3 triggers Lambda automatically
3. Lambda downloads the image
4. Sharp compresses & converts to **WebP**
5. Lambda uploads result to **optimized/**
6. Final optimized image is publicly accessible

---
