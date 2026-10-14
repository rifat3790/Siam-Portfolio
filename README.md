# Siam-Portfolio

> **Siratul Islam Siam** - Luxury, Full-Stack Portfolio & CMS Platform built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, and MongoDB Atlas.

---

## ✨ Features

- **100% Dynamic Content**: Every section (Hero, About, Skills, Services, Projects, Experience, Testimonials, Blogs, Contact Inquiries, and Site Settings) is driven directly by MongoDB Atlas.
- **Secure Admin CMS Portal (`/admin`)**:
  - Protected with administrator password authentication configured via environment variables.
  - Comprehensive management dashboard matching modern dark glassmorphism design.
- **Direct Database File Upload**:
  - Direct upload for **CV/Resume PDFs**, images, and MP4 video files.
  - Files are stored directly in MongoDB via Base64 binary schema and served via `/api/media/[filename]`.
  - Complete Media Library to upload, copy URLs, and manage assets.
- **Ultra-Wide 1680px Layout**: Custom modern container scaled up to `1680px` for high-resolution displays.
- **Smooth Scrolling & AOS Animations**: Scroll-triggered entry animations (`fade-up`, `fade-left`, `zoom-in`) with `once: true` ensuring content stays permanently visible.
- **Crystal-Clear Project Status**: High-contrast, glowing status badges for featured works.
- **Custom Contact System**:
  - Live visitor inquiries saved instantly to MongoDB.
  - Dynamic "Other" custom project type input.
  - Sorted chronologically with newest inquiries appearing first with "NEW" indicator in admin.
- **Ultra-Premium Footer**:
  - Interactive "Start a Project" Bento Banner.
  - Live operational status indicator.
  - Newsletter subscription integration.
  - Smooth Back-to-Top trigger.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+ or 20+
- MongoDB Atlas cluster

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/rifat3790/Siam-Portfolio.git
cd Siam-Portfolio

# Install dependencies
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:
```env
MONGODB_URI=your_mongodb_atlas_connection_string
ADMIN_PASSWORD=your_secure_admin_password
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) for the public portfolio.
Open [http://localhost:3000/admin](http://localhost:3000/admin) to log in to the admin portal with your configured password.

---

## 🌐 Deployment on Vercel

1. Push your code to GitHub:
   ```bash
   git push -u origin main
   ```
2. Import the repository in [Vercel](https://vercel.com).
3. In **Environment Variables**, add:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `ADMIN_PASSWORD`: Your secret admin password
   - `NEXT_PUBLIC_SITE_URL`: Your deployed Vercel domain URL
4. Click **Deploy**. Everything works out of the box!

---

## 📄 License
© 2026 Siratul Islam Siam. All rights reserved.
