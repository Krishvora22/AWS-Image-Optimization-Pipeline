AWS Image Optimization Pipeline (S3 + Lambda + Sharp)

A production-ready, serverless Image Optimization System that automatically compresses, converts, and optimizes images using:

Amazon S3

AWS Lambda (Node.js 20)

Sharp (Lambda Layer)

S3 Event Notifications

CloudWatch Logs

IAM Roles

This pipeline reduces image size by 70–90% while keeping high visual quality.

🚀 Features
✔ Automatic image processing

Upload any image to the raw/ folder → Lambda automatically:

Compresses the image

Converts to modern WebP

Removes metadata

Resizes large images

Produces browser-friendly output

✔ Public optimized images

Images inside optimized/ are publicly accessible.

✔ Raw images stay private

Images inside raw/ remain non-public for security.

✔ Fully Serverless

No EC2, no servers, zero maintenance.

🏗️ Architecture
                 ┌──────────────┐
                 │   User/Client│
                 └──────┬───────┘
                        │ Upload
                        ▼
                ┌───────────────────┐
                │   S3 Bucket       │
                │ raw/optimized/    │
                └──────┬────────────┘
                       │  S3 Event: ObjectCreated
                       ▼
                ┌───────────────────┐
                │   AWS Lambda      │
                │  (Node.js + Sharp)│
                └──────┬────────────┘
                       │ Optimized image
                       ▼
                ┌───────────────────┐
                │ S3 public folder  │
                │ optimized/        │
                └──────┬────────────┘
                       │ Public URL
                       ▼
                ┌───────────────────┐
                │ Browser / Client  │
                └───────────────────┘

🧰 Tech Stack
Component	Technology
Compute	AWS Lambda (Node.js 20)
Storage	Amazon S3
Trigger	S3 Event Notification
Processing	Sharp (via Lambda Layer)
Logs	CloudWatch
IAM	Custom Lambda Role
