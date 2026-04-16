'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import './careers.css'

// ─── Data ────────────────────────────────────────────────────────────────────

const EXPERIENCE_ITEMS = [
  { img: '/images/Careers/plane.webp', title: 'Global Reach', description: 'Work on products used in 25+ countries. Your code unlocks doors worldwide.' },
  { img: '/images/Careers/celebration.webp', title: 'Scale Fast', description: 'Join a high-growth company scaling from startup to global market leader.' },
  { img: '/images/Careers/deal.webp', title: 'Collaborative Culture', description: 'Flat hierarchy, open communication, and genuine teamwork across time zones.' },
  { img: '/images/Careers/heart.webp', title: 'Meaningful Impact', description: 'Your work directly shapes how millions of people access their homes and offices.' },
]

const CORE_VALUES = [
  { img: '/images/Careers/heart.webp', title: 'Customer First', description: "Every decision starts with the question: does this make life better for our customers?" },
  { img: '/images/Careers/chain.webp', title: 'Ownership', description: "We take full responsibility for our work — celebrating wins and learning from failures together." },
  { img: '/images/Careers/daisy.webp', title: 'Integrity', description: "We build trust through transparency, honesty, and doing the right thing even when no one is watching." },
  { img: '/images/Careers/pencil.webp', title: 'Innovation', description: "We challenge the status quo and embrace bold ideas that push the boundaries of what's possible." },
  { img: '/images/Careers/deal.webp', title: 'Teamwork', description: "Diverse perspectives make us stronger. We collaborate openly across borders and disciplines." },
  { img: '/images/Careers/laugh.webp', title: 'Excellence', description: "We hold ourselves to the highest standards — in our products, our processes, and our people." },
]

const BENEFITS = [
  { img: '/images/Careers/benefits-tooth.webp', title: 'Dental Coverage', description: 'Comprehensive dental plan for you and your dependents.' },
  { img: '/images/Careers/benefits-palm-tree.webp', title: 'Paid Time Off', description: 'Generous leave policy including annual leave, public holidays, and personal days.' },
  { img: '/images/Careers/benefits-self-love.webp', title: 'Well-being', description: 'Monthly wellness allowance for gym, mental health apps, or any activity you love.' },
  { img: '/images/Careers/benefits-first-aid-kit.webp', title: 'Medical Insurance', description: 'Full medical coverage with access to quality healthcare providers.' },
  { img: '/images/Careers/benefits-tshirt.webp', title: 'Casual Work Setting', description: "No dress code — come as you are. We care about results, not appearances." },
  { img: '/images/Careers/benefits-work-from-home.webp', title: 'Flexible Work', description: 'Hybrid work options available. Balance your home and office time your way.' },
]

const EMPLOYEE_STORIES = [
  {
    initials: 'AL', name: 'Alex Lim', role: 'Senior Software Engineer', tenure: '3 years',
    quote: "The problems we solve here are genuinely hard and meaningful. I wake up every day knowing my work helps real people access their homes and businesses securely.",
  },
  {
    initials: 'SW', name: 'Sarah Wong', role: 'Product Manager', tenure: '2 years',
    quote: "What I love most is the ownership. From day one, I was trusted to make real decisions. The team is brilliant, collaborative, and always pushing each other to grow.",
  },
  {
    initials: 'RC', name: 'Raj Chandra', role: 'Hardware Engineer', tenure: '4 years',
    quote: "Building physical products that connect to the digital world is a rare challenge. MobiSure gives us the resources, the trust, and the freedom to do our best work.",
  },
]

const INCLUSION_STATS = [
  { value: '40%', label: 'Women in leadership roles' },
  { value: '20+', label: 'Nationalities on our team' },
  { value: '100%', label: 'Equal pay commitment' },
]

type Department = 'All' | 'Engineering' | 'Product' | 'Sales' | 'Operations'
const DEPARTMENTS: Department[] = ['All', 'Engineering', 'Product', 'Sales', 'Operations']

interface Job { slug: string; title: string; department: Exclude<Department, 'All'>; location: string; type: string }
const JOBS: Job[] = [
  { slug: 'senior-frontend-engineer', title: 'Senior Frontend Engineer', department: 'Engineering', location: 'Singapore', type: 'Full-time' },
  { slug: 'backend-engineer-iot', title: 'Backend Engineer (IoT)', department: 'Engineering', location: 'Singapore', type: 'Full-time' },
  { slug: 'firmware-engineer', title: 'Firmware Engineer', department: 'Engineering', location: 'Singapore', type: 'Full-time' },
  { slug: 'product-manager-access', title: 'Product Manager – Access Solutions', department: 'Product', location: 'Remote', type: 'Full-time' },
  { slug: 'ux-designer', title: 'UX Designer', department: 'Product', location: 'Singapore', type: 'Full-time' },
  { slug: 'enterprise-sales-apac', title: 'Enterprise Sales Manager – APAC', department: 'Sales', location: 'Singapore', type: 'Full-time' },
  { slug: 'customer-success-manager', title: 'Customer Success Manager', department: 'Sales', location: 'Remote', type: 'Full-time' },
  { slug: 'supply-chain-analyst', title: 'Supply Chain Analyst', department: 'Operations', location: 'Singapore', type: 'Full-time' },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function ExperienceCard({ item, delay }: { item: typeof EXPERIENCE_ITEMS[0]; delay: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`careers-experience-card anim-fadeup delay-${delay}`}
      style={{
        borderColor: hovered ? 'rgba(232,97,74,0.25)' : 'rgba(0,0,0,0.06)',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.1)' : 'none',
      }}
    >
      <div className="careers-experience-img">
        <Image src={item.img} alt={item.title} fill style={{ objectFit: 'cover' }} sizes="48px" />
      </div>
      <h3 className="careers-experience-title">{item.title}</h3>
      <p className="careers-experience-desc">{item.description}</p>
    </div>
  )
}

function ValueCard({ value, delay }: { value: typeof CORE_VALUES[0]; delay: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`careers-values-card anim-fadeup delay-${delay}`}
      style={{
        transform: hovered ? 'translateY(-3px)' : 'none',
        boxShadow: hovered ? '0 6px 20px rgba(0,0,0,0.1)' : 'none',
      }}
    >
      <div className="careers-values-img">
        <Image src={value.img} alt={value.title} fill style={{ objectFit: 'cover' }} sizes="48px" />
      </div>
      <h3 className="careers-values-title">{value.title}</h3>
      <p className="careers-values-desc">{value.description}</p>
    </div>
  )
}

function EmployeeCard({ story, delay }: { story: typeof EMPLOYEE_STORIES[0]; delay: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`careers-testimonial-card anim-fadeup delay-${delay}`}
      style={{
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.1)' : 'none',
      }}
    >
      <div className="careers-testimonial-avatar">
        <span>{story.initials}</span>
      </div>
      <div>
        <p className="careers-testimonial-name">{story.name}</p>
        <p className="careers-testimonial-role">{story.role}</p>
      </div>
      <blockquote>
        <p className="careers-testimonial-quote">
          &ldquo;{story.quote}&rdquo;
        </p>
      </blockquote>
      <span className="careers-testimonial-tenure">
        {story.tenure} at MobiSure
      </span>
    </article>
  )
}

function JobRow({ job, isLast, applyLabel }: { job: Job; isLast: boolean; applyLabel: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={`/careers/${job.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="careers-job-card"
      style={{
        borderBottom: isLast ? 'none' : '1px solid var(--border)',
        background: hovered ? '#fafaf9' : '#fff',
      }}
    >
      <div>
        <p className="careers-job-title" style={{ color: hovered ? 'var(--primary)' : 'var(--dark)' }}>
          {job.title}
        </p>
        <p className="careers-job-location">
          {job.department} · {job.location}
        </p>
      </div>
      <div className="careers-job-tags">
        <span className="careers-job-tag">{job.type}</span>
        <span
          className="careers-job-arrow"
          style={{
            color: hovered ? 'var(--primary)' : 'var(--gray)',
            transform: hovered ? 'translateX(4px)' : 'none',
          }}
        >
          {applyLabel} →
        </span>
      </div>
    </a>
  )
}

// ─── Main Content Component ───────────────────────────────────────────────────

export default function CareersContent() {
  const t = useTranslations('careers')
  const [activeDept, setActiveDept] = useState<Department>('All')

  const filteredJobs = activeDept === 'All' ? JOBS : JOBS.filter(j => j.department === activeDept)

  const scrollToOpenings = () => {
    document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* ── FEAT-038: Hero ────────────────────────────────────────────────── */}
      <section className="careers-hero" id="careers-hero">
        <div className="container careers-hero-content">
          <span className="label-tag anim-fadeup">{t('badge')}</span>
          <h1 className="careers-hero-title anim-fadeup delay-1">
            {t('heroTitle')}<br />
            <span className="gradient-text">{t('heroHighlight')}</span>
          </h1>
          <p className="careers-hero-desc anim-fadeup delay-2">
            {t('heroSubtitle')}
          </p>
          <div className="careers-hero-buttons anim-fadeup delay-3">
            <button onClick={scrollToOpenings} className="btn-primary" aria-label="Explore career openings">
              {t('openingsTitle')}
            </button>
            <a href="/about" className="btn-ghost-white" aria-label="Learn about MobiSure">
              {t('ctaSecondary')}
            </a>
          </div>
        </div>
      </section>

      {/* ── FEAT-039: We Are Hiring ───────────────────────────────────────── */}
      <section className="careers-hiring">
        <div className="container careers-hiring-content">
          <span className="label-tag anim-fadeup">{t('hiringLabel')}</span>
          <h2 className="heading-lg anim-fadeup delay-1 careers-hiring-heading">
            {t('hiringTitle')}
          </h2>
          <p className="careers-hiring-subtitle anim-fadeup delay-2">
            {t('benefitsIntro')}
          </p>
          <div className="careers-stats anim-fadeup delay-4">
            {[
              { value: t('stat1Value'), label: t('stat1Label') },
              { value: t('stat2Value'), label: t('stat2Label') },
              { value: t('stat3Value'), label: t('stat3Label') },
            ].map((s) => (
              <div key={s.label} className="careers-stat">
                <div className="careers-stat-value">{s.value}</div>
                <div className="careers-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEAT-040: The MobiSure Experience ────────────────────────────── */}
      <section className="careers-experience" id="experience">
        <div className="container">
          <div className="careers-experience-content">
            <span className="label-tag anim-fadeup">{t('experienceLabel')}</span>
            <h2 className="heading-lg anim-fadeup delay-1 careers-experience-heading">
              {t('experienceTitle')}
            </h2>
          </div>
          <div className="careers-hero-grid">
            {EXPERIENCE_ITEMS.map((item, i) => (
              <ExperienceCard key={item.title} item={item} delay={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FEAT-041: Core Values ─────────────────────────────────────────── */}
      <section className="careers-values-section" id="core-values">
        <div className="container">
          <div className="careers-values-content">
            <span className="label-tag anim-fadeup">{t('valuesLabel')}</span>
            <h2 className="heading-lg anim-fadeup delay-1 careers-values-heading">
              {t('valuesTitle')}
            </h2>
          </div>
          <div className="careers-values-grid-3">
            {CORE_VALUES.map((v, i) => (
              <ValueCard key={v.title} value={v} delay={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FEAT-042: Benefits at a Glance ───────────────────────────────── */}
      <section className="careers-benefits-section" id="benefits">
        <div className="container">
          <div className="careers-benefits-layout">
            {/* Left: intro text */}
            <div>
              <span className="label-tag anim-fadeup">{t('benefitsLabel')}</span>
              <h2 className="heading-lg anim-fadeup delay-1 careers-benefits-heading">
                {t('benefitsTitle')}
              </h2>
              <p className="anim-fadeup delay-2 careers-benefits-sub">
                {t('benefitsIntro')}
              </p>
            </div>

            {/* Right: 3×2 image grid */}
            <div className="careers-benefits-imgs-grid">
              {BENEFITS.map((b, i) => (
                <div key={b.title} className={`careers-benefit-item anim-fadeup delay-${i + 1}`}>
                  <div className="careers-benefit-img-wrap">
                    <Image src={b.img} alt={b.title} fill style={{ objectFit: 'cover' }} sizes="56px" />
                  </div>
                  <p className="careers-benefit-title">{b.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEAT-043: Employee Testimonials ──────────────────────────────── */}
      <section className="careers-testimonials" id="employee-stories">
        <div className="container">
          <div className="careers-testimonials-content">
            <span className="label-tag anim-fadeup">{t('teamLabel')}</span>
            <h2 className="heading-lg anim-fadeup delay-1 careers-testimonials-heading">
              {t('teamTitle')}
            </h2>
          </div>
          <div className="careers-testimonials-grid">
            {EMPLOYEE_STORIES.map((s, i) => (
              <EmployeeCard key={s.name} story={s} delay={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FEAT-044: Inclusivity Section ────────────────────────────────── */}
      <section className="careers-inclusion" id="inclusivity">
        <div className="container">
          <div className="careers-inclusion-content">
            <span className="label-tag anim-fadeup">{t('inclusivityLabel')}</span>
            <h2 className="heading-lg anim-fadeup delay-1 careers-inclusion-heading">
              {t('inclusivityTitle')}
            </h2>
            <p className="anim-fadeup delay-2 careers-inclusion-para">
              {t('inclusivityBody')}
            </p>
          </div>

          {/* Stats */}
          <div className="careers-inclusion-stats">
            {INCLUSION_STATS.map((s) => (
              <div key={s.value} className="careers-inclusion-stat-row">
                <div className="careers-inclusion-value">{s.value}</div>
                <div className="careers-inclusion-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEAT-045: Current Openings ────────────────────────────────────── */}
      <section className="careers-openings" id="openings">
        <div className="container">
          <div className="careers-openings-content">
            <span className="label-tag anim-fadeup">{t('openingsLabel')}</span>
            <h2 className="heading-lg anim-fadeup delay-1 careers-openings-heading">
              {t('openingsTitle')}
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="careers-filters">
            {DEPARTMENTS.map(dept => (
              <button
                key={dept}
                onClick={() => setActiveDept(dept)}
                aria-pressed={activeDept === dept}
                className={`careers-filter-btn ${activeDept === dept ? 'active' : ''}`}
                onMouseEnter={e => { if (activeDept !== dept) e.currentTarget.style.background = '#F5F4F1' }}
                onMouseLeave={e => { if (activeDept !== dept) e.currentTarget.style.background = 'transparent' }}
              >
                {dept === 'All' ? t('filterAll') : dept}
              </button>
            ))}
          </div>

          {/* Job list */}
          <div className="careers-job-list">
            {filteredJobs.length === 0 ? (
              <div className="careers-empty-state">
                <p className="careers-empty-state-title">No openings in this department right now.</p>
                <p className="careers-empty-state-sub">Check back soon or explore all roles.</p>
              </div>
            ) : (
              filteredJobs.map((job, i) => <JobRow key={job.slug} job={job} isLast={i === filteredJobs.length - 1} applyLabel={t('applyNow')} />)
            )}
          </div>
        </div>
      </section>

      {/* ── FEAT-046: Keyless Future CTA ──────────────────────────────────── */}
      <section className="careers-cta-section" id="careers-cta">
        <div className="container careers-cta-inner">
          <span className="label-tag anim-fadeup">{t('badge')}</span>
          <h2 className="careers-cta-heading anim-fadeup delay-1">
            {t('ctaTitle')}
          </h2>
          <p className="careers-cta-para anim-fadeup delay-2">
            {t('ctaSubtitle')}
          </p>
          <div className="careers-cta-buttons anim-fadeup delay-3">
            <button onClick={scrollToOpenings} className="btn-primary" aria-label="Explore career opportunities">
              {t('ctaPrimary')}
            </button>
            <a href="/about" className="btn-ghost-white" aria-label="Learn about us">
              {t('ctaSecondary')}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
