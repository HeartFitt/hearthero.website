import React, { useState } from 'react';
import Button from '~/hkit/Button';
import { Check } from 'lucide-react';
import { createLead, type LeadCreate } from "~/utils/api";
import { Link } from 'react-router';
import { TextAreaField, TextInput, Checkbox } from "~/components/FormFields";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?\d{10,15}$/; // Accepts 10-15 digits, optional +

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    goals: '',
    docApproved: false,
    ownsStrap: false,
    optOutSMS: false,
    optOutEmail: false,
    termsAccepted: false,
  });
  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    goals: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'firstName':
        return value.trim() ? '' : 'First name is required.';
      case 'lastName':
        return value.trim() ? '' : 'Last name is required.';
      case 'email':
        if (!value.trim()) return 'Email is required.';
        if (!emailRegex.test(value)) return 'Invalid email format.';
        return '';
      case 'phone':
        if (!value.trim()) return 'Phone is required.';
        if (!phoneRegex.test(value)) return 'Invalid phone format. Use digits only, e.g. +1234567890';
        return '';
      case 'goals':
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const isCheckbox = (e.target as HTMLInputElement).type === 'checkbox';
    const { name } = e.target;
    const value = isCheckbox ? (e.target as HTMLInputElement).checked : e.target.value;

    setFormData(prev => ({ ...prev, [name]: value }));
    if (typeof value === 'string') {
      setFormErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const validateForm = () => {
    const errors: typeof formErrors = {
      firstName: validateField('firstName', formData.firstName),
      lastName: validateField('lastName', formData.lastName),
      email: validateField('email', formData.email),
      phone: validateField('phone', formData.phone),
      goals: validateField('goals', formData.goals),
    };
    setFormErrors(errors);
    return Object.values(errors).every(err => !err);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload: LeadCreate = {
      First_Name: formData.firstName,
      Last_Name: formData.lastName,
      Email: formData.email || undefined,
      Phone: formData.phone || undefined,
      Lead_Source: 'Website',
      Lead_Type: 'Personal',
      Description: JSON.stringify({
        docApproved: formData.docApproved,
        ownsStrap: formData.ownsStrap,
        goals: formData.goals,
      }) as string,
      Opt_Out_SMS: formData.optOutSMS,
      Opt_Out_Email: formData.optOutEmail,
    };

    setSubmitting(true);
    try {
      await createLead(payload);
      alert('Thanks! Your information was submitted.');
      setFormData({ firstName: '', lastName: '', email: '', phone: '', goals: '', docApproved: false, ownsStrap: false, optOutSMS: false, optOutEmail: false, termsAccepted: false });
      setFormErrors({ firstName: '', lastName: '', email: '', phone: '', goals: ''});
    } catch (err: any) {
      const status = err?.status as number | undefined;
      if (status === 400) {
        alert(`Please check your info: ${err.message || 'Validation failed.'}`);
      } else if (status === 502) {
        alert('Sorry, our CRM is unavailable right now. Please try again later.');
      } else {
        alert('Unexpected error. Please try again.');
      }
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const isFormValid =
    Object.values(formErrors).every(err => !err) &&
    formData.firstName.trim() !== '' &&
    formData.lastName.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.phone.trim() !== '';

  return (
    <form onSubmit={handleSubmit} className="max-w-[50rem] mx-auto lg:p-6 p-2 text-neutral-100">
      <h2 className="text-2xl font-semibold mb-1 text-center">Reach Out</h2>
      <p className="text-sm text-center mb-6">Help us personalize your fitness journey by answering a few questions</p>

      <div className='grid grid-cols-2 gap-2 justify-stretch'>
      <TextInput
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        error={formErrors.firstName}
        required
      />
      <TextInput
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        error={formErrors.lastName}
        required
      />
      </div>
      <TextInput
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={formErrors.email}
        required
      />
      <TextInput
      type="phone"
      label="Phone"
      name="phone"
      value={formData.phone}
      onChange={handleChange}
      error={formErrors.phone}
      required
      />

      <Checkbox
      label="Doctor has approved me to workout"
      name="docApproved"
      checked={formData.docApproved}
      onChange={handleChange}
      />
      <Checkbox
      label="I own a Bluetooth HR strap"
      name="ownsStrap"
      checked={formData.ownsStrap}
      onChange={handleChange}
      />

      <TextAreaField
        label="Goals"
        name="goals"
        value={formData.goals}
        onChange={handleChange}
        error={formErrors.goals}
      />

      {/* Required agreement checkbox with inline Privacy Policy link */}
      <Checkbox
      required
      label={
        <>
        By clicking here, you consent to receive Customer Care and Account Notification SMS from HeartHero Fitness.
        Message frequency may vary. Standard Message and Data Rates may apply. Reply STOP to opt out. Reply HELP
        for help. See our{" "}
        <Link to="/privacy-policy" target="_blank" className="underline">
          Privacy Policy
        </Link>
        .
        </>
      }
      name="termsAccepted"
      checked={formData.termsAccepted}
      onChange={handleChange}
      />

      {/* Only show these once the required agreement is checked */}
      {formData.termsAccepted && (
      <div className='ml-10'>
        <Checkbox
        label="Opt-out of SMS notifications"
        name="optOutSMS"
        checked={formData.optOutSMS}
        onChange={handleChange}
        />

        <Checkbox
        label="Opt-out of Email notifications"
        name="optOutEmail"
        checked={formData.optOutEmail}
        onChange={handleChange}
        />
      </div>
      )}

      <Button
      label={submitting ? 'Submitting…' : 'Submit'}
      onClick={handleSubmit}
      icon={<Check />}
      disabled={!isFormValid || submitting || !formData.termsAccepted}
      fillWidth
      />
    </form>
  );
};

export default ContactForm;
