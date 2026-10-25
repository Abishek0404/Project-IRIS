import { motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import {
  PaperPlaneTilt,
  EnvelopeSimple,
  InstagramLogo,
  YoutubeLogo,
} from '@phosphor-icons/react';
import { GetStartedButton } from './ui/get-started-button';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { Magnetic } from './ui/Magnetic';

function DiscordLogo({ size = 20, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

const SOCIALS = [
  { label: 'YouTube', icon: YoutubeLogo, href: '#' },
  { label: 'Instagram', icon: InstagramLogo, href: '#' },
  { label: 'Discord', icon: DiscordLogo, href: 'https://discord.com/users/1295238237639413793' },
];

export default function Contact() {
  const reduce = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)');
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
    botcheck: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!formState.name.trim()) newErrors.name = 'Name is required';
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formState.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot check: silently simulate success for automated bots without calling API
    if (formState.botcheck) {
      setSubmitted(true);
      return;
    }

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    setServerError(null);

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setServerError('Contact form is temporarily unavailable. Please email disc.abishek@gmail.com directly.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formState.name,
          email: formState.email,
          message: formState.message,
          subject: `New Portfolio Inquiry from ${formState.name}`,
          from_name: 'Iris Portfolio Contact Form',
          botcheck: false,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
      } else {
        // If key is not yet set or invalid, show helpful message
        setServerError(result.message || 'Submission failed. Please email disc.abishek@gmail.com directly.');
      }
    } catch (err) {
      setServerError('Network error. Please email disc.abishek@gmail.com directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field) => (e) => {
    setFormState((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <section
      id="contact"
      className="section-spacing"
      style={{
        position: 'relative',
        background: 'var(--color-bg-secondary)',
        borderTop: '1px solid var(--color-border)',
      }}
      aria-label="Contact"
    >
      <div className="site-container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: isMobile ? '2rem' : '4rem' }}>
          {/* Left — CTA text */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              className="gradient-text"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                marginBottom: '1.5rem',
              }}
            >
              Have a project<br />in mind?
            </h2>
            <p
              style={{
                color: 'var(--color-text-secondary)',
                maxWidth: '45ch',
                marginBottom: '2.5rem',
                lineHeight: 1.6,
              }}
            >
              I'm always open to new collaborations and interesting projects.
              Drop me a message and let's create something memorable together.
            </p>

            {/* Email direct link */}
            <a
              href="mailto:disc.abishek@gmail.com"
              className="btn-press"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                color: 'var(--color-text-primary)',
                textDecoration: 'none',
                marginBottom: '2.5rem',
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--color-bg-card)',
                }}
              >
                <EnvelopeSimple size={18} weight="bold" />
              </div>
              <span
                className="link-underline"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}
              >
                disc.abishek@gmail.com
              </span>
            </a>

            {/* Social links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {SOCIALS.map((social) => (
                <Magnetic key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow Iris on ${social.label}`}
                    className="btn-press"
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      border: '1px solid var(--color-border)',
                      background: 'var(--color-bg-card)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-text-secondary)',
                      textDecoration: 'none',
                      transition: 'all 200ms ease',
                    }}
                    onMouseEnter={canHover ? (e) => {
                      e.currentTarget.style.color = '#fff';
                      e.currentTarget.style.borderColor = 'var(--color-text-muted)';
                    } : undefined}
                    onMouseLeave={canHover ? (e) => {
                      e.currentTarget.style.color = 'var(--color-text-secondary)';
                      e.currentTarget.style.borderColor = 'var(--color-border)';
                    } : undefined}
                  >
                    <social.icon size={20} />
                  </a>
                </Magnetic>
              ))}
            </div>
          </motion.div>

          {/* Right — Contact form */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {submitted ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  textAlign: 'center',
                  padding: '4rem 1rem',
                }}
              >
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                  }}
                >
                  <PaperPlaneTilt size={26} weight="fill" style={{ color: '#fff' }} />
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    marginBottom: '0.5rem',
                  }}
                >
                  Message Sent
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                  Thanks for reaching out. I'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }} noValidate>
                {/* Honeypot field for bot spam prevention — hidden from real users */}
                <input
                  type="checkbox"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ display: 'none' }}
                  checked={!!formState.botcheck}
                  onChange={(e) => setFormState((prev) => ({ ...prev, botcheck: e.target.checked }))}
                />

                {/* Name */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label
                    htmlFor="contact-name"
                    style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={formState.name}
                    onChange={handleChange('name')}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--color-bg-card)',
                      border: errors.name ? '1px solid #ef4444' : '1px solid var(--color-border)',
                      color: 'var(--color-text-primary)',
                      fontSize: '0.875rem',
                      outline: 'none',
                      transition: 'border-color 200ms ease',
                    }}
                    onFocus={(e) => { if (!errors.name) e.target.style.borderColor = 'rgba(255,255,255,0.4)'; }}
                    onBlur={(e) => { if (!errors.name) e.target.style.borderColor = 'var(--color-border)'; }}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p style={{ fontSize: '0.75rem', color: '#f87171' }} role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label
                    htmlFor="contact-email"
                    style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formState.email}
                    onChange={handleChange('email')}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--color-bg-card)',
                      border: errors.email ? '1px solid #ef4444' : '1px solid var(--color-border)',
                      color: 'var(--color-text-primary)',
                      fontSize: '0.875rem',
                      outline: 'none',
                      transition: 'border-color 200ms ease',
                    }}
                    onFocus={(e) => { if (!errors.email) e.target.style.borderColor = 'rgba(255,255,255,0.4)'; }}
                    onBlur={(e) => { if (!errors.email) e.target.style.borderColor = 'var(--color-border)'; }}
                    placeholder="you@email.com"
                  />
                  {errors.email && (
                    <p style={{ fontSize: '0.75rem', color: '#f87171' }} role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label
                    htmlFor="contact-message"
                    style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={formState.message}
                    onChange={handleChange('message')}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--color-bg-card)',
                      border: errors.message ? '1px solid #ef4444' : '1px solid var(--color-border)',
                      color: 'var(--color-text-primary)',
                      fontSize: '0.875rem',
                      outline: 'none',
                      resize: 'none',
                      transition: 'border-color 200ms ease',
                    }}
                    onFocus={(e) => { if (!errors.message) e.target.style.borderColor = 'rgba(255,255,255,0.4)'; }}
                    onBlur={(e) => { if (!errors.message) e.target.style.borderColor = 'var(--color-border)'; }}
                    placeholder="Tell me about your project"
                  />
                  {errors.message && (
                    <p style={{ fontSize: '0.75rem', color: '#f87171' }} role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                {serverError && (
                  <p style={{ fontSize: '0.8rem', color: '#f87171', background: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem 0.75rem', borderRadius: '8px' }} role="alert">
                    {serverError}
                  </p>
                )}

                <GetStartedButton
                  text={isSubmitting ? 'Sending...' : 'Send Message'}
                  type="submit"
                  disabled={isSubmitting}
                  style={{ opacity: isSubmitting ? 0.7 : 1 }}
                />
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
