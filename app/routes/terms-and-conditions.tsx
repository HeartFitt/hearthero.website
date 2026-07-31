import React from "react";
import Button from "~/hkit/Button";
import { Download } from "lucide-react";

export function meta() {
  return [
    { title: "Terms and Conditions • HeartHero" },
    { name: "description", content: "Terms and Conditions for HeartHero Fitness" },
  ];
}

const effectiveDate = "July 31, 2026";

// Centralized content used for rendering and download
type SubSection = { subtitle: string; paragraphs: string[] };
type Section = { title: string; paragraphs: string[]; subSections?: SubSection[] };

const sections: Section[] = [
  {
    title: "Overview",
    paragraphs: [
    //   `This Privacy Policy describes how HeartHero ("HeartHero", "we", "our", or "us") collects, uses, and protects information about you when you visit our website, submit forms, or otherwise interact with us online.`,
    //   // SMS consent snippet (kept verbatim)
    //   `We will not share your opt-in to an SMS campaign with any third party for purposes unrelated to providing you with the services of that campaign. We may share your Personal Data, including your SMS opt-in or consent status, with third parties that help us provide our messaging services, including but not limited to platform providers, phone companies, and any other vendors who assist us in the delivery of text messages.`,
    //   `All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.`
    ],
  },
  // {
  //   title: "Information We Collect",
  //   paragraphs: [
  //     "Information you provide directly, such as your name, email address, phone number, organization, role, and any details you share in our forms (e.g., waitlist signups, contact forms, or inquiries).",
  //     "Information related to your fitness interests or goals that you choose to provide so we can understand how HeartHero might be a fit.",
  //     "Technical information automatically collected when you use the site, such as IP address, browser type, device information, pages visited, and timestamps.",
  //   ],
  // },
  // {
  //   title: "How We Use Information",
  //   paragraphs: [
  //     "To operate, maintain, and improve our website and services.",
  //     "To respond to your messages, manage waitlists, and follow up on business or partnership inquiries.",
  //     "To personalize certain communications and maintain business and legal records.",
  //   ],
  //   subSections: [
  //     {
  //       subtitle: "Communications",
  //       paragraphs: [
  //         "If you provide your email address or phone number, we may use them to send you messages about HeartHero, including waitlist updates, product information, or responses to your requests. You can unsubscribe or opt out at any time using the options in our messages or by contacting us through our website. Opting out of marketing does not stop important administrative communications.",
  //       ],
  //     },
  //     {
  //       subtitle: "SMS Campaigns",
  //       paragraphs: [
  //         "We will never share your opt-in to an SMS campaign with any third party for purposes unrelated to the services of that campaign.",
  //         "We may share your personal data, including SMS opt-in or consent status, with trusted third parties that assist in providing our messaging services. This includes platform providers, phone companies, and other vendors necessary for message delivery.",
  //         "Text messaging originator opt-in data and consent will **not** be shared with any third parties under any circumstances.",
  //       ],
  //     },
  //   ],
  // },
  // {
  //   title: "Cookies and Analytics",
  //   paragraphs: [
  //     "Our website may use cookies and similar technologies to remember preferences and understand how visitors use the site.",
  //     "You can usually block or delete cookies through your browser settings, but this may affect how the website functions.",
  //   ],
  // },
  // {
  //   title: "Sharing of Information",
  //   paragraphs: [
  //     "We do not sell your personal information.",
  //     "We may share information with service providers who help us operate our website, send communications, store data, or perform analytics, and with third parties when required by law or to protect our rights, users, or the public.",
  //   ],
  // },
  // {
  //   title: "Data Retention and Security",
  //   paragraphs: [
  //     "We keep personal information only for as long as reasonably necessary for the purposes described in this Privacy Policy or as required by law.",
  //     "We use reasonable technical and organizational measures to help protect your information, but no method of transmission or storage is completely secure.",
  //   ],
  // },
  // {
  //   title: "Children's Privacy",
  //   paragraphs: [
  //     "Our website is intended for adults and is not directed to children under 13 (or a higher age where required by law). If we learn that we have collected information from a child in violation of this policy, we will take reasonable steps to delete it.",
  //   ],
  // },
  // {
  //   title: "Your Choices and Rights",
  //   paragraphs: [
  //     "You may choose not to submit certain information, although this may limit some features or communications.",
  //     "Depending on your location, you may have rights to access, correct, or delete certain personal information. If you wish to exercise these rights, please contact us.",
  //   ],
  // },
  // {
  //   title: "Changes to This Privacy Policy",
  //   paragraphs: [
  //     "We may update this Privacy Policy from time to time. When we make changes, we will update the effective date at the top of this page.",
  //     "Your continued use of the website after changes means that you accept the updated policy.",
  //   ],
  // },
  // {
  //   title: "Contact Us",
  //   paragraphs: [
  //     "If you have questions about this Privacy Policy or want to request changes to your information, please contact us through the forms available on our website.",
  //   ],
  // },
];


function buildPlainText(): string {
  const lines: string[] = [];
  lines.push("Privacy Policy");
  lines.push("");
  for (const s of sections) {
    lines.push(s.title);
    for (const p of s.paragraphs) {
      lines.push(p);
    }
    lines.push("");
  }
  return lines.join("\n");
}

export default function PrivacyPolicy() {
  const policyText = buildPlainText();

  const handleDownload = () => {
    const blob = new Blob([policyText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "privacy-policy.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pt-32 px-4 max-w-[60rem] mx-auto text-neutral-100">
      <h1 className="mb-2">Privacy Policy</h1>
      <p className="text-sm text-neutral-400 mb-8">Effective {effectiveDate}</p>

      <div className="flex flex-col gap-8">
        {sections.map((sec) => (
          <section key={`section-${sec.title}`}>
            <h2 className="mb-2">{sec.title}</h2>
            {sec.paragraphs.map((para, i) => (
              <p key={`para-${sec.title}-${i}`} className="text-neutral-200 mb-3">{para}</p>
            ))}
            {sec.subSections?.map((sub) => (
              <div key={`sub-${sec.title}-${sub.subtitle}`} className="ml-4 mb-4">
                <h3 className="mb-1 text-neutral-300">{sub.subtitle}</h3>
                {sub.paragraphs.map((p, k) => (
                  <p key={`subp-${sec.title}-${sub.subtitle}-${k}`} className="text-neutral-200 mb-2">{p}</p>
                ))}
              </div>
            ))}
          </section>
        ))}
      </div>

      <div className="mt-10">
        <Button
          label="Download Privacy Policy"
          onClick={handleDownload}
          icon={<Download />}
          fillWidth
        />
      </div>
      <div className="py-[10rem]" />
    </div>
  );
}
