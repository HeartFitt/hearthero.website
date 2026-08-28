import React, { useState } from 'react';
import Button from '~/hkit/Button';
import { Check } from 'lucide-react';
import { createLead, type LeadCreate } from "~/utils/api";
import { Link } from 'react-router';
import { TextInput, Dropdown, Checkbox } from "~/components/FormFields";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?\d{10,15}$/; // Accepts 10-15 digits, optional +

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    Phone: '',
    Email: '',
    clubName: '',
    memberCount: '0 - 50',
    offersCycling: false,
    clubStreet: '',
    clubCity: '',
    clubState: '',
    clubZip: '',
    optOutSMS: false,
    optOutEmail: false,
    termsAccepted: false,
  });
  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    Phone: '',
    Email: '',
    clubName: '',
    memberCount: '',
    clubStreet: '',
    clubCity: '',
    clubState: '',
    clubZip: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'firstName':
        return value.trim() ? '' : 'First name is required.';
      case 'lastName':
        return value.trim() ? '' : 'Last name is required.';
      case 'email':
      case 'Email':
        if (!value.trim()) return 'Email is required.';
        if (!emailRegex.test(value)) return 'Invalid email format.';
        return '';
      case 'phone':
      case 'Phone':
        if (!value.trim()) return 'Phone is required.';
        if (!phoneRegex.test(value)) return 'Invalid phone format. Use digits only, e.g. +1234567890';
        return '';
      case 'clubName':
        return value.trim() ? '' : 'Club name is required.';
      case 'clubAddress':
        return value.trim() ? '' : 'Club address is required.';
      case 'memberCount':
        return value ? '' : 'Please select member count.';
      case 'clubStreet':
        return '';
      case 'clubCity':
        return value ? '' : 'Club city is required.';
      case 'clubState':
        return value ? '' : 'Club state is required.';
      case 'clubZip':
        return '';
      case 'clubCountry':
        return value ? '' : 'Club country is required.';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      Phone: validateField('Phone', formData.Phone),
      Email: validateField('Email', formData.Email),
      clubName: validateField('clubName', formData.clubName),
      clubStreet: validateField('clubStreet', formData.clubStreet),
      clubCity: validateField('clubCity', formData.clubCity),
      clubState: validateField('clubState', formData.clubState),
      clubZip: validateField('clubZip', formData.clubZip),
      memberCount: validateField('memberCount', formData.memberCount),
    };
    setFormErrors(errors);
    return Object.values(errors).every(err => !err);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // const [first, ...rest] = formData.contactName.trim().split(' ').filter(Boolean);
    // const First_Name = first || undefined;
    // const Last_Name = rest.length ? rest.join(' ') : first || 'Unknown';

    const payload: LeadCreate = {
      First_Name: formData.firstName,
      Last_Name: formData.lastName,
      Email: formData.Email || undefined,
      Phone: formData.Phone || undefined,
      Company: formData.clubName || undefined,
      Street: formData.clubStreet || undefined,
      City: formData.clubCity || undefined,
      State: formData.clubState || undefined,
      Zip_Code: formData.clubZip || undefined,
      Lead_Source: 'Website',
      Lead_Type: 'Club',
      Description: JSON.stringify({
        memberCount: formData.memberCount,
        offersCycling: formData.offersCycling,
      }),
      Opt_Out_SMS: formData.optOutSMS,
      Opt_Out_Email: formData.optOutEmail,
    };

    setSubmitting(true);
    try {
      await createLead(payload);
      alert('Thanks! Your information was submitted.');
      setFormData({ firstName: '', lastName: '', Phone: '', Email: '', clubName: '', clubStreet: '', clubCity: '', clubState: '', clubZip: '', memberCount: '0 - 50', offersCycling: false, optOutSMS: false, optOutEmail: false, termsAccepted: false });  
      setFormErrors({ firstName: '', lastName: '', Phone: '', Email: '', clubName: '', clubStreet: '', clubCity: '', clubState: '', clubZip: '', memberCount: ''});
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
    formData.clubName.trim() !== '' &&
    formData.clubCity.trim() !== '' &&
    formData.clubState.trim() !== '' &&
    true;

  return (
    <form onSubmit={handleSubmit} className="max-w-[50rem] mx-auto lg:p-6 p-2 text-neutral-100">
      <h2 className="text-2xl font-semibold mb-1 text-center">Let’s Chat.</h2>
      <p className="text-sm text-center mb-6">Interested in becoming a HeartHero Hub?</p>

      <div className="grid grid-cols-2 gap-2">
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
      <div className="grid grid-cols-2 gap-2">
        <TextInput
          label="Phone Number"
          name="Phone"
          value={formData.Phone}
          onChange={handleChange}
          error={formErrors.Phone}
          required
        />
        <TextInput
          label="Email Address"
          name="Email"
          value={formData.Email}
          onChange={handleChange}
          error={formErrors.Email}
          required
        />
      </div>

      <TextInput
        label="Club Name"
        name="clubName"
        value={formData.clubName}
        onChange={handleChange}
        error={formErrors.clubName}
        required
      />

      {/* Address fields */}
      <TextInput
        label="Street Address"
        name="clubStreet"
        value={formData.clubStreet}
        onChange={handleChange}
        error={formErrors.clubStreet}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <TextInput
          label="City"
          name="clubCity"
          value={formData.clubCity}
          onChange={handleChange}
          error={formErrors.clubCity}
          required
        />
        <Dropdown
          label="State"
          name="clubState"
          value={formData.clubState}
          onChange={handleChange}
          options={[
        '',
        'AL',
        'AK',
        'AZ',
        'AR',
        'CA',
        'CO',
        'CT',
        'DE',
        'FL',
        'GA',
        'HI',
        'ID',
        'IL',
        'IN',
        'IA',
        'KS',
        'KY',
        'LA',
        'ME',
        'MD',
        'MA',
        'MI',
        'MN',
        'MS',
        'MO',
        'MT',
        'NE',
        'NV',
        'NH',
        'NJ',
        'NM',
        'NY',
        'NC',
        'ND',
        'OH',
        'OK',
        'OR',
        'PA',
        'RI',
        'SC',
        'SD',
        'TN',
        'TX',
        'UT',
        'VT',
        'VA',
        'WA',
        'WV',
        'WI',
        'WY',
          ]}
          error={formErrors.clubState}
          required
        />
        <TextInput
          label="ZIP / Postal Code"
          name="clubZip"
          value={formData.clubZip}
          onChange={handleChange}
          error={formErrors.clubZip}
        />
      </div>

      <Dropdown
        label="Member Count"
        name="memberCount"
        value={formData.memberCount}
        onChange={handleChange}
        options={[
          '0 - 50',
          '51 - 100',
          '101 - 250',
          '251 - 500',
          '500+',
        ]}
        error={formErrors.memberCount}
        required
      />

      {/* Offer cycling as a checkbox */}
      <Checkbox
        label="We offer spinning / indoor cycling / cardio theatre classes"
        name="offersCycling"
        checked={formData.offersCycling}
        onChange={handleChange}
      />

            {/* Required agreement checkbox with inline Privacy Policy link */}
      <Checkbox
        label={
          <>
          You agree to receive customer care-related or one-on-one communication messages from HeartHero Fitness.
          Message frequency may vary. Standard Message and Data Rates may apply. Reply STOP to opt out. Reply HELP
          for help. See our{" "}
          <Link to="/privacy-policy" target="_blank" className="underline">
            Privacy Policy
          </Link>
          {/* and our {" "}
          <Link to="/privacy-policy" target="_blank" className="underline">
            Terms and Conditions
          </Link> */}
          .
          </>
        }
      name="termsAccepted"
      checked={formData.termsAccepted}
      onChange={handleChange}
      required
      />

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
