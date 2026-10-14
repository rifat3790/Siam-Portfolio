import mongoose, { Schema, Document, Model } from "mongoose";

// 1. Hero Model
export interface IHero extends Document {
  greeting: string;
  name: string;
  highlightedName: string;
  title: string;
  bio: string;
  yearsExperience: string;
  projectsCompleted: string;
  happyClients: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  dribbbleUrl: string;
  introVideoUrl: string;
  heroImage: string;
  codeSnippet: string;
}

const HeroSchema = new Schema<IHero>(
  {
    greeting: { type: String, default: "HELLO, I'M" },
    name: { type: String, default: "Siratul Islam" },
    highlightedName: { type: String, default: "Siam" },
    title: { type: String, default: "Web Developer" },
    bio: {
      type: String,
      default:
        "I build modern, high-performance websites and web applications that help businesses grow. Clean code, creative design and a focus on real results.",
    },
    yearsExperience: { type: String, default: "3+" },
    projectsCompleted: { type: String, default: "50+" },
    happyClients: { type: String, default: "30+" },
    githubUrl: { type: String, default: "https://github.com" },
    linkedinUrl: { type: String, default: "https://linkedin.com" },
    twitterUrl: { type: String, default: "https://twitter.com" },
    dribbbleUrl: { type: String, default: "https://dribbble.com" },
    introVideoUrl: { type: String, default: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
    heroImage: { type: String, default: "/images/siam_portrait.jpg" },
    codeSnippet: {
      type: String,
      default: `const developer = {
  name: "Siratul Islam Siam",
  role: "Web Developer",
  passion: "Building for the web"
};`,
    },
  },
  { timestamps: true }
);

// 2. About Model
export interface IAbout extends Document {
  badge: string;
  heading: string;
  highlightWord: string;
  bio: string;
  features: Array<{ icon: string; title: string }>;
  cvUrl: string;
  image: string;
  highlightTag: string;
}

const AboutSchema = new Schema<IAbout>(
  {
    badge: { type: String, default: "ABOUT ME" },
    heading: { type: String, default: "Turning Ideas Into Digital Reality" },
    highlightWord: { type: String, default: "Digital Reality" },
    bio: {
      type: String,
      default:
        "I'm Siratul Islam Siam, a passionate web developer with a strong focus on creating modern, responsive and user-friendly websites and web applications. I love turning ideas into real products that make an impact.",
    },
    features: {
      type: [
        {
          icon: { type: String, default: "code" },
          title: { type: String, default: "Clean Code & Best Practices" },
        },
      ],
      default: [
        { icon: "code", title: "Clean Code & Best Practices" },
        { icon: "shield", title: "User Focused Design & UX" },
        { icon: "clock", title: "On-Time Delivery" },
      ],
    },
    cvUrl: { type: String, default: "/siam_resume.pdf" },
    image: { type: String, default: "/images/siam_working.jpg" },
    highlightTag: { type: String, default: "A Problem Solver Who Loves to Build" },
  },
  { timestamps: true }
);

// 3. Skill Model
export interface ISkill extends Document {
  name: string;
  category: string;
  icon: string;
  color: string;
  order: number;
}

const SkillSchema = new Schema<ISkill>(
  {
    name: { type: String, required: true },
    category: { type: String, default: "Frontend" },
    icon: { type: String, default: "code" },
    color: { type: String, default: "#3b82f6" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// 4. Service Model
export interface IService extends Document {
  title: string;
  description: string;
  icon: string;
  linkText: string;
  order: number;
}

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: "layout" },
    linkText: { type: String, default: "Learn More" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// 5. Project Model
export interface IProject extends Document {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  status: "Published" | "Draft";
  featured: boolean;
  order: number;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    image: { type: String, default: "/images/project_ecommerce.jpg" },
    tags: { type: [String], default: [] },
    liveUrl: { type: String, default: "#" },
    githubUrl: { type: String, default: "#" },
    status: { type: String, enum: ["Published", "Draft"], default: "Published" },
    featured: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// 6. Blog Post Model
export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  status: "Published" | "Draft";
  readTime: string;
  publishedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, default: "" },
    content: { type: String, default: "" },
    coverImage: { type: String, default: "/images/project_ecommerce.jpg" },
    tags: { type: [String], default: [] },
    status: { type: String, enum: ["Published", "Draft"], default: "Published" },
    readTime: { type: String, default: "5 min read" },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// 7. Experience Model
export interface IExperience extends Document {
  period: string;
  role: string;
  company: string;
  description: string;
  order: number;
}

const ExperienceSchema = new Schema<IExperience>(
  {
    period: { type: String, required: true },
    role: { type: String, required: true },
    company: { type: String, default: "" },
    description: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// 8. Testimonial Model
export interface ITestimonial extends Document {
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
  order: number;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true },
    role: { type: String, default: "Client" },
    avatar: { type: String, default: "/images/siam_portrait.jpg" },
    content: { type: String, required: true },
    rating: { type: Number, default: 5 },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// 9. Contact Message Model
export interface IMessage extends Document {
  name: string;
  email: string;
  projectType: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    projectType: { type: String, default: "Web Development" },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// 10. Site Settings Model
export interface ISiteSettings extends Document {
  siteName: string;
  ownerName: string;
  ownerRole: string;
  email: string;
  phone: string;
  location: string;
  metaTitle: string;
  metaDescription: string;
  viewsCount: number;
  copyrightText: string;
  subscribers: Array<{ email: string; date: Date }>;
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    siteName: { type: String, default: "Siam." },
    ownerName: { type: String, default: "Siratul Islam Siam" },
    ownerRole: { type: String, default: "Web Developer & Problem Solver" },
    email: { type: String, default: "siamhossain@gmail.com" },
    phone: { type: String, default: "+880 1712 345678" },
    location: { type: String, default: "Dhaka, Bangladesh" },
    metaTitle: {
      type: String,
      default: "Siratul Islam Siam | Web Developer & Problem Solver",
    },
    metaDescription: {
      type: String,
      default:
        "I build modern, high-performance websites and web applications that help businesses grow.",
    },
    viewsCount: { type: Number, default: 1240 },
    copyrightText: {
      type: String,
      default: "© 2026 Siratul Islam Siam. All rights reserved.",
    },
    subscribers: {
      type: [{ email: String, date: { type: Date, default: Date.now } }],
      default: [],
    },
  },
  { timestamps: true }
);

// 11. MediaFile Model (Database storage for uploaded images, CV PDFs, videos, assets)
export interface IMediaFile extends Document {
  filename: string;
  originalName: string;
  contentType: string;
  size: number;
  data: string; // Base64 encoded file data
  fileType: "image" | "pdf" | "video" | "document" | "other";
  createdAt: Date;
}

const MediaFileSchema = new Schema<IMediaFile>(
  {
    filename: { type: String, required: true, unique: true },
    originalName: { type: String, required: true },
    contentType: { type: String, required: true },
    size: { type: Number, required: true },
    data: { type: String, required: true },
    fileType: {
      type: String,
      enum: ["image", "pdf", "video", "document", "other"],
      default: "image",
    },
  },
  { timestamps: true }
);

// Helper function to prevent model re-compilation in Next.js hot reload
function getOrCreateModel<T extends Document>(modelName: string, schema: Schema<T>): Model<T> {
  if (mongoose.models[modelName]) {
    return mongoose.models[modelName] as Model<T>;
  }
  return mongoose.model<T>(modelName, schema);
}

export const Hero = getOrCreateModel<IHero>("Hero", HeroSchema);
export const About = getOrCreateModel<IAbout>("About", AboutSchema);
export const Skill = getOrCreateModel<ISkill>("Skill", SkillSchema);
export const Service = getOrCreateModel<IService>("Service", ServiceSchema);
export const Project = getOrCreateModel<IProject>("Project", ProjectSchema);
export const BlogPost = getOrCreateModel<IBlogPost>("BlogPost", BlogPostSchema);
export const Experience = getOrCreateModel<IExperience>("Experience", ExperienceSchema);
export const Testimonial = getOrCreateModel<ITestimonial>("Testimonial", TestimonialSchema);
export const Message = getOrCreateModel<IMessage>("Message", MessageSchema);
export const SiteSettings = getOrCreateModel<ISiteSettings>("SiteSettings", SiteSettingsSchema);
export const MediaFile = getOrCreateModel<IMediaFile>("MediaFile", MediaFileSchema);

