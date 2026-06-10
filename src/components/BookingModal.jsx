import { useState } from 'react'
import { supabase } from '../lib/supabase'
import './BookingModal.css'

const SERVICES = [
  {
    id: 'consultation',
    name: 'Initial Consultation',
    duration: '30 min · Free',
    desc: 'Discuss your vision, style preferences, and budget with our design team.',
  },
  {
    id: 'custom',
    name: 'Custom Order & Fitting',
    duration: '60 min',
    desc: 'Full bespoke garment design, fabric selection, and body measurement session.',
  },
  {
    id: 'alteration',
    name: 'Alteration & Tailoring',
    duration: '45 min',
    desc: 'Expert adjustments to an existing garment for a flawless, personalised fit.',
  },
  {
    id: 'virtual',
    name: 'Virtual Fitting',
    duration: '30 min',
    desc: 'Remote style consultation and measurement guidance via video call.',
  },
]

const TIME_SLOTS = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
]

const MEASUREMENT_FIELDS = [
  { key: 'bust',       label: 'Bust / Chest',    hint: 'Around fullest part of chest' },
  { key: 'waist',      label: 'Waist',            hint: 'Around natural waist' },
  { key: 'hips',       label: 'Hips',             hint: 'Around fullest part of hips' },
  { key: 'shoulder',   label: 'Shoulder Width',   hint: 'Across back, shoulder to shoulder' },
  { key: 'armLength',  label: 'Arm Length',       hint: 'Shoulder point to wrist' },
  { key: 'backLength', label: 'Back Length',      hint: 'Nape of neck to natural waist' },
  { key: 'inseam',     label: 'Inseam',           hint: 'Crotch to ankle' },
  { key: 'height',     label: 'Height',           hint: 'Total standing height' },
]

const STEP_LABELS = ['Service', 'Measurements', 'Schedule & Confirm']

function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-GB', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
  })
}

export default function BookingModal({ onClose }) {
  const [step, setStep] = useState(1)
  const [service, setService] = useState(null)
  const [unit, setUnit] = useState('cm')
  const [measurements, setMeasurements] = useState(
    Object.fromEntries(MEASUREMENT_FIELDS.map(f => [f.key, '']))
  )
  const [notes, setNotes] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [contact, setContact] = useState({ name: '', email: '', phone: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const setMeasurement = (key, val) => setMeasurements(prev => ({ ...prev, [key]: val }))
  const setContactField = (key, val) => setContact(prev => ({ ...prev, [key]: val }))

  const today = new Date().toISOString().split('T')[0]
  const selectedService = SERVICES.find(s => s.id === service)
  const canSubmit = contact.name && contact.email && contact.phone && date && time

  async function handleSubmit(e) {
    e.preventDefault()
    if (!canSubmit || submitting) return
    setSubmitting(true)
    setSubmitError(null)

    const hasMeasurements = Object.values(measurements).some(v => v !== '')

    if (!supabase) {
      setSubmitting(false)
      setConfirmed(true)
      return
    }

    const { error } = await supabase.from('bookings').insert({
      service,
      service_duration: selectedService?.duration,
      appointment_date: date,
      appointment_time: time,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      measurements: hasMeasurements ? { ...measurements, unit } : null,
      notes: notes || null,
    })

    setSubmitting(false)
    if (error) {
      setSubmitError('Something went wrong. Please try again.')
      return
    }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="booking-overlay">
        <div className="booking-modal booking-modal--success">
          <div className="booking-success">
            <div className="booking-success__icon">✦</div>
            <h2 className="booking-success__title">Appointment Requested</h2>
            <p className="booking-success__sub">
              Thank you, <strong>{contact.name.split(' ')[0]}</strong>. We'll confirm your booking at{' '}
              <strong>{contact.email}</strong> within 24 hours.
            </p>
            <div className="booking-success__summary">
              <div className="booking-success__row">
                <span>Service</span>
                <strong>{selectedService?.name}</strong>
              </div>
              <div className="booking-success__row">
                <span>Date</span>
                <strong>{formatDate(date)}</strong>
              </div>
              <div className="booking-success__row">
                <span>Time</span>
                <strong>{time}</strong>
              </div>
              <div className="booking-success__row">
                <span>Duration</span>
                <strong>{selectedService?.duration}</strong>
              </div>
            </div>
            <p className="booking-success__note">
              Our atelier team will reach out to confirm availability and share any preparation details.
            </p>
            <button className="booking-action-btn" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="booking-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="booking-modal">

        <div className="booking-modal__header">
          <div>
            <p className="booking-modal__eyebrow">MAYEN'S TOUCH ATELIER</p>
            <h2 className="booking-modal__title">Book a Fitting</h2>
          </div>
          <button className="booking-modal__close" onClick={onClose} aria-label="Close booking">✕</button>
        </div>

        <div className="booking-progress">
          {STEP_LABELS.map((label, i) => {
            const n = i + 1
            return (
              <div key={n} className={`booking-progress__item ${step === n ? 'is-active' : ''} ${step > n ? 'is-done' : ''}`}>
                <div className="booking-progress__dot">{step > n ? '✓' : n}</div>
                <span className="booking-progress__label">{label}</span>
                {i < STEP_LABELS.length - 1 && <div className="booking-progress__line" />}
              </div>
            )
          })}
        </div>

        <div className="booking-modal__body">

          {step === 1 && (
            <div className="booking-step">
              <p className="booking-step__hint">Choose the service that best suits your needs.</p>
              <div className="booking-services">
                {SERVICES.map(s => (
                  <button
                    key={s.id}
                    type="button"
                    className={`booking-service-card ${service === s.id ? 'is-selected' : ''}`}
                    onClick={() => setService(s.id)}
                  >
                    <div className="booking-service-card__top">
                      <span className="booking-service-card__name">{s.name}</span>
                      <span className="booking-service-card__duration">{s.duration}</span>
                    </div>
                    <p className="booking-service-card__desc">{s.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="booking-step">
              <div className="booking-measurements-header">
                <p className="booking-step__hint">
                  All fields are optional — our tailor will guide you through any missing measurements at your appointment.
                </p>
                <div className="booking-unit-toggle">
                  <button type="button" className={unit === 'cm' ? 'is-active' : ''} onClick={() => setUnit('cm')}>cm</button>
                  <button type="button" className={unit === 'in' ? 'is-active' : ''} onClick={() => setUnit('in')}>in</button>
                </div>
              </div>
              <div className="booking-measurements-grid">
                {MEASUREMENT_FIELDS.map(({ key, label, hint }) => (
                  <div className="booking-measure-field" key={key}>
                    <label>{label}</label>
                    <div className="booking-measure-field__wrap">
                      <input
                        type="number"
                        min="0"
                        placeholder="—"
                        value={measurements[key]}
                        onChange={e => setMeasurement(key, e.target.value)}
                      />
                      <span className="booking-measure-field__unit">{unit}</span>
                    </div>
                    <span className="booking-measure-field__hint">{hint}</span>
                  </div>
                ))}
              </div>
              <div className="booking-notes">
                <label>Style Notes & Special Requests</label>
                <textarea
                  rows={3}
                  placeholder="Fabric preferences, occasion, inspiration images, or anything we should know..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <form className="booking-step" onSubmit={handleSubmit} id="booking-form">
              <div className="booking-schedule">
                <div className="booking-field">
                  <label>Preferred Date</label>
                  <input
                    type="date"
                    min={today}
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    required
                  />
                </div>
                <div className="booking-timeslots-wrap">
                  <label>Preferred Time</label>
                  <div className="booking-timeslots">
                    {TIME_SLOTS.map(slot => (
                      <button
                        type="button"
                        key={slot}
                        className={`booking-timeslot ${time === slot ? 'is-active' : ''}`}
                        onClick={() => setTime(slot)}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="booking-divider" />

              <div className="booking-contact">
                <p className="booking-section-label">Your Details</p>
                <div className="booking-contact__grid">
                  <div className="booking-field">
                    <label>Full Name</label>
                    <input
                      type="text"
                      placeholder="Adaeze Okafor"
                      value={contact.name}
                      onChange={e => setContactField('name', e.target.value)}
                      required
                    />
                  </div>
                  <div className="booking-field">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="hello@email.com"
                      value={contact.email}
                      onChange={e => setContactField('email', e.target.value)}
                      required
                    />
                  </div>
                  <div className="booking-field booking-field--full">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+234 800 000 0000"
                      value={contact.phone}
                      onChange={e => setContactField('phone', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="booking-divider" />

              <div className="booking-summary">
                <p className="booking-section-label">Booking Summary</p>
                <div className="booking-summary__rows">
                  <div className="booking-summary__row">
                    <span>Service</span>
                    <strong>{selectedService?.name ?? '—'}</strong>
                  </div>
                  <div className="booking-summary__row">
                    <span>Duration</span>
                    <strong>{selectedService?.duration ?? '—'}</strong>
                  </div>
                  <div className="booking-summary__row">
                    <span>Date</span>
                    <strong>{formatDate(date)}</strong>
                  </div>
                  <div className="booking-summary__row">
                    <span>Time</span>
                    <strong>{time || '—'}</strong>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>

        <div className="booking-modal__footer">
          {step > 1 && (
            <button type="button" className="booking-nav-btn booking-nav-btn--back" onClick={() => setStep(s => s - 1)}>
              ← Back
            </button>
          )}
          <div className="booking-modal__footer-right">
            {step === 1 && (
              <button
                type="button"
                className="booking-nav-btn booking-nav-btn--skip"
                disabled={!service}
                onClick={() => setStep(3)}
              >
                Skip & Confirm Appointment
              </button>
            )}
            {step < 3 && (
              <button
                type="button"
                className="booking-nav-btn booking-nav-btn--next"
                disabled={step === 1 && !service}
                onClick={() => setStep(s => s + 1)}
              >
                {step === 1 ? 'Add Measurements →' : 'Schedule Appointment →'}
              </button>
            )}
            {step === 3 && (
              <>
                {submitError && <span className="booking-submit-error">{submitError}</span>}
                <button
                  type="submit"
                  form="booking-form"
                  className="booking-nav-btn booking-nav-btn--submit"
                  disabled={!canSubmit || submitting}
                >
                  {submitting ? 'Confirming…' : 'Confirm Booking'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
