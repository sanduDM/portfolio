import React, { useMemo, useState } from 'react';
import profilePic from './profile.png';
import {
  ArrowRight,
  Award,
  Briefcase,
  CheckCircle2,
  Code2,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Menu,
  Server,
  Terminal,
  X,
} from 'lucide-react';
import { portfolio, sectionIds } from './data/portfolioData';
import SectionHeading from './components/SectionHeading';
import SkillCard from './components/SkillCard';
import ProjectCard from './components/ProjectCard';
import CertificationItem from './components/CertificationItem';

const placeholderPattern = /\[EDIT THIS/i;

function normalizeLink(value) {
  if (!value || placeholderPattern.test(String(value))) {
    return '#';
  }
  return value;
}

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitState, setSubmitState] = useState('');
  const [certifications, setCertifications] = useState(portfolio.certifications);

  const navItems = useMemo(
    () =>
      portfolio.navItems.map((item) => ({
        label: item,
        href: `#${item.toLowerCase() === 'home' ? 'home' : item.toLowerCase()}`,
      })),
    []
  );

  const handleNavClick = () => setMobileOpen(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      nextErrors.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) {
      nextErrors.message = 'Please enter a message.';
    } else if (formData.message.trim().length < 10) {
      nextErrors.message = 'Message should be at least 10 characters.';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitState('');
      return;
    }

    try {
      const response = await fetch('https://formspree.io/f/xkjwvryo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitState('Message sent successfully.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitState('Failed to send message. Please try again later.');
    }
  };



  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="container nav-wrap">
          <button
            type="button"
            className="menu-button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <nav className={`main-nav ${mobileOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} onClick={handleNavClick}>
                {item.label}
              </a>
            ))}
          </nav>

          <a href="#contact" className="primary-button header-button">
            Let&apos;s Connect <ArrowRight size={16} />
          </a>
        </div>
      </header>

      <main>
        <section id={sectionIds.home} className="hero-section section-spacing">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">
                <span className="eyebrow-dot" /> Available for learning & collaboration
              </span>
              <h1>
                {portfolio.hero.heading}
              </h1>
              <h2>{portfolio.hero.title}</h2>
              <p>{portfolio.hero.intro}</p>

              <div className="hero-actions">
                <a href="#projects" className="primary-button">
                  View My Projects <ArrowRight size={18} />
                </a>
                <a href="/CV.pdf" className="secondary-button" download>
                  <Download size={18} /> Download CV
                </a>
                <a href="#contact" className="secondary-button">
                  Contact Me
                </a>
              </div>

              <div className="social-row" aria-label="Social links">
                {portfolio.hero.socialLinks.map((link) => {
                  const isEmail = link.icon === 'email';
                  const Icon = isEmail ? Mail : link.icon === 'linkedin' ? Linkedin : Github;
                  return (
                    <a key={link.label} href={normalizeLink(link.url)} target={placeholderPattern.test(link.url) ? undefined : '_blank'} rel={placeholderPattern.test(link.url) ? undefined : 'noreferrer'}>
                      <Icon size={16} />
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="hero-visual" aria-label="Profile photo">
              <div className="profile-card">
                <img src={profilePic} alt={portfolio.profileAlt} className="profile-image" />
              </div>
            </div>
          </div>
        </section>

        <section id={sectionIds.about} className="section-spacing section-alt">
          <div className="container">
            <SectionHeading
              eyebrow="$ cd about"
              title="I build with curiosity, logic, and a strong interest in systems."
              subtitle="A second-year undergraduate working toward practical skills in software, automation, infrastructure, and reliable digital solutions."
            />

            <div className="about-grid">
              <div className="about-summary">
                <p>{portfolio.about.paragraph}</p>
                <div className="goal-box">
                  <span className="mini-tag">Career Goal</span>
                  <h3>{portfolio.about.careerTitle}</h3>
                  <p>{portfolio.about.careerDescription}</p>
                </div>
              </div>

              <div className="interest-box">
                <h3>Interests</h3>
                <div className="interest-list">
                  {portfolio.about.interests.map((interest) => (
                    <span key={interest}>{interest}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="highlight-grid">
              {portfolio.about.highlights.map((item) => (
                <article key={item.title} className="highlight-card">
                  <div className="icon-wrap">
                    {item.title === 'Software Development' ? <Code2 size={20} /> : item.title === 'DevOps & Automation' ? <Terminal size={20} /> : <Server size={20} />}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id={sectionIds.skills} className="section-spacing">
          <div className="container">
            <SectionHeading
              eyebrow="$ cd skills"
              title="Practical skills for software, systems, and learning."
              subtitle="Focused on fundamentals, tool familiarity, and ongoing growth in technologies relevant to software and DevOps work."
            />

            <div className="skills-grid">
              {portfolio.skills.map((skill) => (
                <SkillCard
                  key={skill.title}
                  title={skill.title}
                  items={skill.items}
                  cloudStatus={skill.cloudStatus}
                  cloudNote={skill.cloudNote}
                  isCloud={skill.isCloud}
                />
              ))}
            </div>
          </div>
        </section>

        <section id={sectionIds.projects} className="section-spacing section-alt">
          <div className="container">
            <SectionHeading
              eyebrow="$ cd projects"
              title="Selected academic and learning projects."
              subtitle="A portfolio of work that demonstrates problem-solving, development fundamentals, and growing technical capability."
            />

            <div className="projects-grid">
              {portfolio.projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>
        </section>

        <section id={sectionIds.education} className="section-spacing">
          <div className="container">
            <SectionHeading
              eyebrow="$ cd education"
              title="Academic background and continuous growth."
            />

            <div className="timeline">
              {portfolio.education.map((item) => (
                <div className="timeline-item" key={`${item.title}-${item.period}`}>
                  <div className="timeline-icon">
                    <GraduationCap size={18} />
                  </div>
                  <div className="timeline-content">
                    <span className="timeline-period">{item.period}</span>
                    <h3>{item.title}</h3>
                    <p className="timeline-subtitle">{item.subtitle}</p>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id={sectionIds.experience} className="section-spacing section-alt">
          <div className="container">
            <SectionHeading
              eyebrow="$ cd experience"
              title="Hands-on learning through university and self-development."
            />

            <div className="experience-grid">
              {portfolio.experience.map((item) => (
                <article key={`${item.role}-${item.type}`} className="experience-card">
                  <div className="experience-icon">
                    <Briefcase size={18} />
                  </div>
                  <span className="experience-type">{item.type}</span>
                  <h3>{item.role}</h3>
                  <p>{item.description}</p>
                  <small>{item.details}</small>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id={sectionIds.achievements} className="section-spacing">
          <div className="container">
            <SectionHeading
              eyebrow="$ cd achievements"
              title="Milestones that reflect teamwork, creativity, and learning."
            />

            <div className="achievement-grid">
              {portfolio.achievements.map((item) => (
                <article key={item.title} className="achievement-card">
                  <div className="achievement-icon">
                    <Award size={20} />
                  </div>
                  <span className="achievement-badge">{item.badge}</span>
                  <h3>{item.title}</h3>
                  <p className="achievement-result">{item.achievement}</p>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>

            <div className="certifications-wrap">
              <h3>Certifications</h3>

              <div className="certification-grid">
                {certifications.map((cert, index) => (
                  <CertificationItem key={`${cert.title}-${index}`} item={cert} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id={sectionIds.resume} className="section-spacing resume-section">
          <div className="container resume-box">
            <div>
              <span className="eyebrow"><span className="eyebrow-prompt">$</span> <span className="eyebrow-command">cd resume</span></span>
              <h2>{portfolio.resume.heading}</h2>
              <p>{portfolio.resume.description}</p>
            </div>

            <div className="resume-actions">
              <a href="/CV.pdf" className="primary-button" download>
                <Download size={18} /> Download CV
              </a>
              <a href={normalizeLink(portfolio.resume.link)} className="secondary-button" target="_blank" rel="noreferrer">
                View CV
              </a>
            </div>
          </div>
        </section>

        <section id={sectionIds.contact} className="section-spacing section-alt contact-section">
          <div className="container contact-grid">
            <div className="contact-copy">
              <SectionHeading
                eyebrow="$ cd contact"
                title="Let&apos;s connect and build something useful."
                subtitle={portfolio.contact.intro}
              />

              <div className="contact-list">
                {portfolio.contact.details.map((detail) => {
                  const Icon = detail.label === 'Email' ? Mail : detail.label === 'LinkedIn' ? Linkedin : Github;
                  return (
                    <a key={detail.label} href={normalizeLink(detail.href)} target={placeholderPattern.test(detail.href) ? undefined : '_blank'} rel={placeholderPattern.test(detail.href) ? undefined : 'noreferrer'} className="contact-link">
                      <Icon size={18} />
                      <div>
                        <span>{detail.label}</span>
                        <strong>{detail.value}</strong>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="field-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                />
                {errors.name ? <span className="error-text">{errors.name}</span> : null}
              </div>

              <div className="field-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                />
                {errors.email ? <span className="error-text">{errors.email}</span> : null}
              </div>

              <div className="field-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Write your message here..."
                />
                {errors.message ? <span className="error-text">{errors.message}</span> : null}
              </div>

              <button type="submit" className="primary-button form-button">
                Send Message
              </button>

              {submitState ? <p className="submit-state">{submitState}</p> : null}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-wrap">
          <div>
            <p className="footer-title">{portfolio.footer.text}</p>
            <p className="footer-subtitle">{portfolio.footer.subtitle}</p>
          </div>

          <nav className="footer-nav" aria-label="Footer navigation">
            {['Home', 'About', 'Skills', 'Projects', 'Education', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}>
                {item}
              </a>
            ))}
          </nav>

          <div className="footer-socials">
            <a href={normalizeLink(portfolio.github)} target={placeholderPattern.test(portfolio.github) ? undefined : '_blank'} rel={placeholderPattern.test(portfolio.github) ? undefined : 'noreferrer'} aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href={normalizeLink(portfolio.linkedin)} target={placeholderPattern.test(portfolio.linkedin) ? undefined : '_blank'} rel={placeholderPattern.test(portfolio.linkedin) ? undefined : 'noreferrer'} aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href={normalizeLink(portfolio.email ? `mailto:${portfolio.email}` : '#')} aria-label="Email">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
