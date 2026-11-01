import { useRef, useState } from 'react';
import usePageMeta from '../hooks/usePageMeta.js';
import { site, emailjs, emailjsReady } from '../config.js';

const EVENT_TYPES = ['Conference', 'Competition or hackathon', 'Cultural event', 'Corporate event', 'Private celebration', 'Other'];
const today = () => new Date().toISOString().slice(0, 10);
const EMPTY = { name: '', email: '', type: '', date: '', location: '', message: '', website: '' };

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Enter your full name.';
  if (!v.email.trim()) e.email = 'Enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Enter a valid email address, like name@example.com.';
  if (!v.type) e.type = 'Choose the type of event.';
  if (!v.date) e.date = 'Choose the event date.';
  else if (v.date < today()) e.date = 'Choose today or a future date.';
  if (v.location.trim().length < 2) e.location = 'Enter where the event takes place.';
  if (v.message.trim().length < 20) e.message = 'Describe your event in at least 20 characters.';
  return e;
}

function Field({ id, label, error, children }) {
  return (
    <div className={`field${error ? ' has-error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && <p className="field__error" id={`${id}-error`}>{error}</p>}
    </div>
  );
}

export default function Contact() {
  usePageMeta({ title: 'Contact', description: 'Get in touch with Iyad Sebti to book event photography in Algeria.' });
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | unconfigured | failed
  const summaryRef = useRef(null);

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
  };
  const a11y = (k) => ({ id: k, 'aria-invalid': errors[k] ? 'true' : undefined, 'aria-describedby': errors[k] ? `${k}-error` : undefined });

  const mailto = () => {
    const body = `Name: ${values.name}\nEmail: ${values.email}\nEvent type: ${values.type}\nDate: ${values.date}\nLocation: ${values.location}\n\n${values.message}`;
    return `mailto:${site.email}?subject=${encodeURIComponent(`Event enquiry: ${values.type}`)}&body=${encodeURIComponent(body)}`;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (values.website) return; // honeypot: bots fill hidden fields
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      setStatus('idle');
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    if (!emailjsReady) {
      setStatus('unconfigured');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: emailjs.serviceId,
          template_id: emailjs.templateId,
          user_id: emailjs.publicKey,
          template_params: {
            from_name: values.name, reply_to: values.email, event_type: values.type,
            event_date: values.date, event_location: values.location, message: values.message,
          },
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus('sent');
      setValues(EMPTY);
    } catch {
      setStatus('failed');
    }
  };

  const errorList = Object.entries(errors).filter(([, m]) => m);

  return (
    <section className="contact">
      <div className="contact__info">
        <p className="label">Contact</p>
        <h1 className="contact__title">Let's talk about your event.</h1>
        <dl className="contact__details">
          <div><dt>Email</dt><dd><a href={`mailto:${site.email}`}>{site.email}</a></dd></div>
          <div><dt>Instagram</dt><dd><a href={site.instagramUrl} target="_blank" rel="noreferrer noopener">{site.instagramHandle}</a></dd></div>
          <div><dt>Location</dt><dd>{site.location}</dd></div>
        </dl>
      </div>

      <div className="contact__form">
        {status === 'sent' ? (
          <div className="notice notice--ok" role="status">
            <h2>Message sent.</h2>
            <p>Thank you. I'll reply to the email address you provided.</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate>
            {errorList.length > 0 && (
              <div ref={summaryRef} tabIndex={-1} className="notice notice--error" role="alert">
                <h2>Please fix {errorList.length === 1 ? '1 field' : `${errorList.length} fields`}:</h2>
                <ul>{errorList.map(([k, m]) => <li key={k}><a href={`#/contact`} onClick={(ev) => { ev.preventDefault(); document.getElementById(k)?.focus(); }}>{m}</a></li>)}</ul>
              </div>
            )}

            <Field id="name" label="Full name" error={errors.name}>
              <input {...a11y('name')} type="text" autoComplete="name" value={values.name} onChange={set('name')} />
            </Field>
            <Field id="email" label="Email" error={errors.email}>
              <input {...a11y('email')} type="email" autoComplete="email" value={values.email} onChange={set('email')} />
            </Field>
            <Field id="type" label="Event type" error={errors.type}>
              <select {...a11y('type')} value={values.type} onChange={set('type')}>
                <option value="">Select an event type</option>
                {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </Field>
            <div className="field-row">
              <Field id="date" label="Event date" error={errors.date}>
                <input {...a11y('date')} type="date" min={today()} value={values.date} onChange={set('date')} />
              </Field>
              <Field id="location" label="Event location" error={errors.location}>
                <input {...a11y('location')} type="text" value={values.location} onChange={set('location')} />
              </Field>
            </div>
            <Field id="message" label="Project description" error={errors.message}>
              <textarea {...a11y('message')} rows="5" value={values.message} onChange={set('message')} />
            </Field>

            {/* Honeypot: hidden from people, visible to bots */}
            <div className="visually-hidden" aria-hidden="true">
              <label>Website<input type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} /></label>
            </div>

            <button type="submit" className="btn btn--ink" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>

            {status === 'unconfigured' && (
              <div className="notice" role="status">
                <h2>Nothing has been sent.</h2>
                <p>
                  This form isn't connected to an email service yet. Your details are valid, so you can{' '}
                  <a href={mailto()}>send them from your email app instead</a>.
                </p>
              </div>
            )}
            {status === 'failed' && (
              <div className="notice notice--error" role="alert">
                <h2>The message could not be sent.</h2>
                <p>Check your connection and try again, or <a href={mailto()}>send it by email</a>.</p>
              </div>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
