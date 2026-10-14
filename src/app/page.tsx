import { ensureDataSeeded } from "@/lib/seedData";
import { DEFAULT_PORTFOLIO_DATA } from "@/lib/defaultData";
import {
  Hero,
  About,
  Skill,
  Service,
  Project,
  BlogPost,
  Experience,
  Testimonial,
  SiteSettings,
} from "@/models";
import { BackgroundGlow } from "@/components/BackgroundGlow";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { BlogSection } from "@/components/BlogSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { AosInitializer } from "@/components/AosInitializer";

export const dynamic = "force-dynamic";

async function getPortfolioData() {
  try {
    await ensureDataSeeded();

    const [hero, about, skills, services, projects, blogs, experience, testimonials, settings] =
      await Promise.all([
        Hero.findOne().lean(),
        About.findOne().lean(),
        Skill.find().sort({ order: 1 }).lean(),
        Service.find().sort({ order: 1 }).lean(),
        Project.find({ status: "Published" }).sort({ order: 1 }).lean(),
        BlogPost.find({ status: "Published" }).sort({ publishedAt: -1 }).lean(),
        Experience.find().sort({ order: 1 }).lean(),
        Testimonial.find().sort({ order: 1 }).lean(),
        SiteSettings.findOneAndUpdate(
          {},
          { $inc: { viewsCount: 1 } },
          { new: true, upsert: true }
        ).lean(),
      ]);

    return {
      hero: hero ? JSON.parse(JSON.stringify(hero)) : DEFAULT_PORTFOLIO_DATA.hero,
      about: about ? JSON.parse(JSON.stringify(about)) : DEFAULT_PORTFOLIO_DATA.about,
      skills: skills?.length ? JSON.parse(JSON.stringify(skills)) : DEFAULT_PORTFOLIO_DATA.skills,
      services: services?.length ? JSON.parse(JSON.stringify(services)) : DEFAULT_PORTFOLIO_DATA.services,
      projects: projects?.length ? JSON.parse(JSON.stringify(projects)) : DEFAULT_PORTFOLIO_DATA.projects,
      blogs: blogs?.length ? JSON.parse(JSON.stringify(blogs)) : DEFAULT_PORTFOLIO_DATA.blogs,
      experience: experience?.length ? JSON.parse(JSON.stringify(experience)) : DEFAULT_PORTFOLIO_DATA.experience,
      testimonials: testimonials?.length ? JSON.parse(JSON.stringify(testimonials)) : DEFAULT_PORTFOLIO_DATA.testimonials,
      settings: settings ? JSON.parse(JSON.stringify(settings)) : DEFAULT_PORTFOLIO_DATA.settings,
    };
  } catch (error) {
    console.error("Using fallback portfolio data during build:", error);
    return DEFAULT_PORTFOLIO_DATA;
  }
}

export default async function HomePage() {
  const data = await getPortfolioData();

  return (
    <main className="relative min-h-screen bg-[#07090e] text-slate-100 overflow-x-hidden selection:bg-blue-600 selection:text-white">
      {/* AOS Scroll Animation Initializer */}
      <AosInitializer />

      {/* Dynamic Background Ambient Light Orbs */}
      <BackgroundGlow />

      {/* Floating Glassmorphism Navbar */}
      <Navbar siteName={data.settings?.siteName || "Siam."} />

      {/* Hero Section */}
      <HeroSection hero={data.hero} />

      {/* About Me Section */}
      <AboutSection about={data.about} />

      {/* Skills Section */}
      <SkillsSection skills={data.skills} />

      {/* Services Section */}
      <ServicesSection services={data.services} />

      {/* Projects Section */}
      <ProjectsSection projects={data.projects} />

      {/* Experience Journey */}
      <ExperienceSection experience={data.experience} />

      {/* Testimonials */}
      <TestimonialsSection testimonials={data.testimonials} />

      {/* Blogs / Articles */}
      <BlogSection blogs={data.blogs} />

      {/* Contact Section */}
      <ContactSection settings={data.settings} />

      {/* Footer */}
      <Footer settings={data.settings} hero={data.hero} />
    </main>

  );
}
