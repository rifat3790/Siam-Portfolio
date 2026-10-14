import {
  Hero,
  About,
  Skill,
  Service,
  Project,
  BlogPost,
  Experience,
  Testimonial,
  Message,
  SiteSettings,
} from "@/models";
import { connectToDatabase } from "./mongodb";

export async function ensureDataSeeded() {
  await connectToDatabase();

  // 1. Hero
  const heroCount = await Hero.countDocuments();
  if (heroCount === 0) {
    await Hero.create({
      greeting: "HELLO, I'M",
      name: "Siratul Islam",
      highlightedName: "Siam",
      title: "Web Developer",
      bio: "I build modern, high-performance websites and web applications that help businesses grow. Clean code, creative design and a focus on real results.",
      yearsExperience: "3+",
      projectsCompleted: "50+",
      happyClients: "30+",
      githubUrl: "https://github.com",
      linkedinUrl: "https://linkedin.com",
      twitterUrl: "https://twitter.com",
      dribbbleUrl: "https://dribbble.com",
      introVideoUrl: "https://www.youtube.com",
      heroImage: "/images/siam_portrait.jpg",
      codeSnippet: `const developer = {
  name: "Siratul Islam Siam",
  role: "Web Developer",
  passion: "Building for the web"
};`,
    });
  }

  // 2. About
  const aboutCount = await About.countDocuments();
  if (aboutCount === 0) {
    await About.create({
      badge: "ABOUT ME",
      heading: "Turning Ideas Into Digital Reality",
      highlightWord: "Digital Reality",
      bio: "I'm Siratul Islam Siam, a passionate web developer with a strong focus on creating modern, responsive and user-friendly websites and web applications. I love turning ideas into real products that make an impact.",
      features: [
        { icon: "code", title: "Clean Code & Best Practices" },
        { icon: "shield", title: "User Focused Design & UX" },
        { icon: "clock", title: "On-Time Delivery" },
      ],
      cvUrl: "#",
      image: "/images/siam_working.jpg",
      highlightTag: "A Problem Solver Who Loves to Build",
    });
  }

  // 3. Skills (12 skills from the screenshot)
  const skillCount = await Skill.countDocuments();
  if (skillCount === 0) {
    const defaultSkills = [
      { name: "HTML5", category: "Frontend", icon: "html5", color: "#E34F26", order: 1 },
      { name: "CSS3", category: "Frontend", icon: "css3", color: "#1572B6", order: 2 },
      { name: "JavaScript", category: "Frontend", icon: "javascript", color: "#F7DF1E", order: 3 },
      { name: "TypeScript", category: "Frontend", icon: "typescript", color: "#3178C6", order: 4 },
      { name: "React.js", category: "Frontend", icon: "react", color: "#61DAFB", order: 5 },
      { name: "Next.js", category: "Frontend", icon: "nextjs", color: "#ffffff", order: 6 },
      { name: "Node.js", category: "Backend", icon: "nodejs", color: "#339933", order: 7 },
      { name: "Express.js", category: "Backend", icon: "express", color: "#a3a3a3", order: 8 },
      { name: "MongoDB", category: "Database", icon: "mongodb", color: "#47A248", order: 9 },
      { name: "MySQL", category: "Database", icon: "mysql", color: "#4479A1", order: 10 },
      { name: "Firebase", category: "Database", icon: "firebase", color: "#FFCA28", order: 11 },
      { name: "Tailwind CSS", category: "Frontend", icon: "tailwindcss", color: "#06B6D4", order: 12 },
    ];
    await Skill.insertMany(defaultSkills);
  }

  // 4. Services
  const serviceCount = await Service.countDocuments();
  if (serviceCount === 0) {
    const defaultServices = [
      {
        title: "Website Development",
        description: "Modern, responsive and SEO friendly websites tailored to your business needs.",
        icon: "layout",
        linkText: "Learn More",
        order: 1,
      },
      {
        title: "Web Application",
        description: "Scalable and high-performance web applications with modern tech stack.",
        icon: "code",
        linkText: "Learn More",
        order: 2,
      },
      {
        title: "API Integration",
        description: "Integrate third-party APIs and build custom solutions for your business.",
        icon: "cpu",
        linkText: "Learn More",
        order: 3,
      },
    ];
    await Service.insertMany(defaultServices);
  }

  // 5. Projects
  const projectCount = await Project.countDocuments();
  if (projectCount === 0) {
    const defaultProjects = [
      {
        title: "E-Commerce Website",
        description: "A luxury multi-vendor e-commerce fashion store with Stripe payments, real-time cart, and dynamic inventory management.",
        image: "/images/project_ecommerce.jpg",
        tags: ["Next.js", "Tailwind CSS", "Stripe"],
        liveUrl: "https://example.com/ecommerce",
        githubUrl: "https://github.com",
        status: "Published",
        featured: true,
        order: 1,
      },
      {
        title: "Task Management App",
        description: "Modern collaborative Kanban project management platform with sprint planning, real-time team updates, and analytics.",
        image: "/images/project_taskapp.jpg",
        tags: ["React.js", "Node.js", "MongoDB"],
        liveUrl: "https://example.com/task-manager",
        githubUrl: "https://github.com",
        status: "Published",
        featured: true,
        order: 2,
      },
      {
        title: "Portfolio Website",
        description: "Ultra-fast dark mode developer portfolio with custom CMS, glassmorphism UI, smooth micro-interactions, and MongoDB backend.",
        image: "/images/siam_working.jpg",
        tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
        liveUrl: "https://example.com/portfolio",
        githubUrl: "https://github.com",
        status: "Published",
        featured: true,
        order: 3,
      },
      {
        title: "AI SaaS Dashboard",
        description: "Intelligent analytics dashboard integrating generative AI insights, custom charts, and automated workflow triggers.",
        image: "/images/project_taskapp.jpg",
        tags: ["Next.js", "OpenAI", "Tailwind CSS"],
        liveUrl: "#",
        githubUrl: "#",
        status: "Draft",
        featured: false,
        order: 4,
      },
      {
        title: "Real Estate Website",
        description: "High-end luxury real estate property marketplace with interactive map search and virtual 3D tour integration.",
        image: "/images/project_ecommerce.jpg",
        tags: ["Next.js", "MongoDB", "Express.js"],
        liveUrl: "#",
        githubUrl: "#",
        status: "Published",
        featured: false,
        order: 5,
      },
    ];
    await Project.insertMany(defaultProjects);
  }

  // 6. Blog Posts
  const blogCount = await BlogPost.countDocuments();
  if (blogCount === 0) {
    const defaultBlogs = [
      {
        title: "10 Tips for Modern Web Design",
        slug: "10-tips-for-modern-web-design",
        excerpt: "Learn how to create modern and user-friendly websites that convert visitors into loyal clients.",
        content: `Modern web design requires a delicate balance between aesthetics, speed, and usability. Here are the top 10 actionable strategies to transform your web applications in 2026:
        
1. **Embrace Curated Color Palettes**: Move beyond generic colors. Use tailored dark mode palettes with deliberate contrast.
2. **Prioritize Performance**: Optimize Core Web Vitals, compress media, and leverage server-side caching.
3. **Subtle Micro-Interactions**: Use smooth hover states and gentle scroll triggers to create a tactile feel.`,
        coverImage: "/images/project_ecommerce.jpg",
        tags: ["Design", "UI/UX", "Frontend"],
        status: "Published",
        readTime: "5 min read",
        publishedAt: new Date("2026-10-25"),
      },
      {
        title: "My Journey as a Web Developer",
        slug: "my-journey-as-a-web-developer",
        excerpt: "A reflection on how I transitioned from learning the basics to building scalable production applications.",
        content: `Every developer starts somewhere. In this article, I share the key milestones, mistakes, and breakthroughs that shaped my journey as a professional software engineer.`,
        coverImage: "/images/siam_working.jpg",
        tags: ["Career", "Web Dev"],
        status: "Published",
        readTime: "7 min read",
        publishedAt: new Date("2026-10-18"),
      },
      {
        title: "Best Tools for Productivity",
        slug: "best-tools-for-productivity",
        excerpt: "Essential tools that help me stay productive as a developer and manage complex client projects.",
        content: `Maximizing output without burning out requires the right toolkit. Here are my favorite tools for coding, design, project management, and task automation.`,
        coverImage: "/images/project_taskapp.jpg",
        tags: ["Productivity", "Tools"],
        status: "Published",
        readTime: "4 min read",
        publishedAt: new Date("2026-10-12"),
      },
      {
        title: "Understanding Next.js 15",
        slug: "understanding-nextjs-15",
        excerpt: "A complete guide for beginners to get started with Next.js, Server Components, and the App Router.",
        content: `Next.js continues to redefine full-stack web development with React Server Components, Server Actions, and Turbopack. Here is what you need to know to harness its full power.`,
        coverImage: "/images/siam_portrait.jpg",
        tags: ["Next.js", "React", "Tech"],
        status: "Published",
        readTime: "6 min read",
        publishedAt: new Date("2026-10-08"),
      },
      {
        title: "How I Build Scalable Apps",
        slug: "how-i-build-scalable-apps",
        excerpt: "Architectural patterns and best practices for creating bulletproof full-stack web apps that scale effortlessly.",
        content: `Scalability is not just about servers; it is about maintainable code, optimized database queries, and clean separation of concerns.`,
        coverImage: "/images/project_ecommerce.jpg",
        tags: ["Architecture", "Backend"],
        status: "Published",
        readTime: "8 min read",
        publishedAt: new Date("2026-10-01"),
      },
    ];
    await BlogPost.insertMany(defaultBlogs);
  }

  // 7. Experience
  const expCount = await Experience.countDocuments();
  if (expCount === 0) {
    const defaultExp = [
      {
        period: "2023 - Present",
        role: "Freelance Web Developer",
        company: "Self-Employed / Global Clients",
        description:
          "Working with global clients on various web projects including eCommerce, SaaS and portfolio.",
        order: 1,
      },
      {
        period: "2022 - 2023",
        role: "Frontend Developer",
        company: "Tech Agency",
        description: "Worked on modern web applications using React and Next.js.",
        order: 2,
      },
      {
        period: "2021 - 2022",
        role: "Junior Web Developer",
        company: "Digital Studio",
        description: "Started my journey and learned the fundamentals of web development.",
        order: 3,
      },
    ];
    await Experience.insertMany(defaultExp);
  }

  // 8. Testimonials
  const testCount = await Testimonial.countDocuments();
  if (testCount === 0) {
    const defaultTestimonials = [
      {
        name: "John Doe",
        role: "Business Owner",
        company: "Apex Tech",
        avatar: "/images/siam_portrait.jpg",
        content:
          "Amazing work! Siam delivered a high-quality website exactly as I wanted. Communication was smooth and he was very professional.",
        rating: 5,
        order: 1,
      },
      {
        name: "Sarah Smith",
        role: "Entrepreneur",
        company: "Nova Commerce",
        avatar: "/images/siam_working.jpg",
        content:
          "Highly recommended! He understood my requirements perfectly and delivered beyond my expectations.",
        rating: 5,
        order: 2,
      },
    ];
    await Testimonial.insertMany(defaultTestimonials);
  }

  // 9. Messages
  const msgCount = await Message.countDocuments();
  if (msgCount === 0) {
    const defaultMessages = [
      {
        name: "Sarah Ahmed",
        email: "sarah@example.com",
        projectType: "Web Application",
        message: "Your portfolio is amazing! I have a project we would love to collaborate on.",
        isRead: false,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
      {
        name: "John Doe",
        email: "john@example.com",
        projectType: "E-Commerce",
        message: "Hi Siam, I am interested in working with you on an e-commerce platform.",
        isRead: false,
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      },
      {
        name: "Mohammad Rafi",
        email: "rafi@example.com",
        projectType: "Full Stack",
        message: "Do you provide full stack development services for SaaS startups?",
        isRead: true,
        createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
      },
      {
        name: "Alex Turner",
        email: "alex@example.com",
        projectType: "Website Redesign",
        message: "I would like to discuss a potential project for our company website redesign.",
        isRead: true,
        createdAt: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000),
      },
      {
        name: "Emma Parker",
        email: "emma@example.com",
        projectType: "API Integration",
        message: "Great work! Can we schedule a call to review requirements for next week?",
        isRead: true,
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
      },
    ];
    await Message.insertMany(defaultMessages);
  }

  // 10. Site Settings
  const settingsCount = await SiteSettings.countDocuments();
  if (settingsCount === 0) {
    const history = [];
    const now = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = d.toISOString().split("T")[0];
      const baseViews = 35 + Math.floor(Math.sin(i * 0.4) * 14) + (29 - i);
      const baseVisitors = Math.floor(baseViews * 0.72);
      history.push({
        date: dateStr,
        views: baseViews,
        visitors: baseVisitors,
      });
    }

    await SiteSettings.create({
      siteName: "Siam.",
      ownerName: "Siratul Islam Siam",
      ownerRole: "Web Developer & Problem Solver",
      email: "siamhossain@gmail.com",
      phone: "+880 1712 345678",
      location: "Dhaka, Bangladesh",
      metaTitle: "Siratul Islam Siam | Web Developer & Problem Solver",
      metaDescription:
        "I build modern, high-performance websites and web applications that help businesses grow. Clean code, creative design and a focus on real results.",
      viewsCount: 1276,
      copyrightText: "© 2026 Siratul Islam Siam. All rights reserved.",
      analyticsHistory: history,
    });
  } else {
    // Ensure existing settings document has analytics history populated
    const existingSettings = await SiteSettings.findOne();
    if (existingSettings && (!existingSettings.analyticsHistory || existingSettings.analyticsHistory.length === 0)) {
      const history = [];
      const now = new Date();
      for (let i = 29; i >= 0; i--) {
        const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        const dateStr = d.toISOString().split("T")[0];
        const baseViews = 35 + Math.floor(Math.sin(i * 0.4) * 14) + (29 - i);
        const baseVisitors = Math.floor(baseViews * 0.72);
        history.push({
          date: dateStr,
          views: baseViews,
          visitors: baseVisitors,
        });
      }
      existingSettings.analyticsHistory = history;
      await existingSettings.save();
    }
  }

  return { success: true, message: "Database verified & seeded" };
}
