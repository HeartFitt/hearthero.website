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
    title: "SMS Program",
    paragraphs: [
      `By opting in, you agree to receive customer care-related or one-on-one communication messages from HeartHero Fitness.`,
      `Message frequency may vary. Standard Message and Data Rates may apply.`,
      `Reply STOP to opt out at any time. Reply HELP for help.`,
      `Carriers are not liable for delayed or undelivered messages.`,
    ],
  },
  {
    title: "Privacy",
    paragraphs: [
      `See our Privacy Policy at /privacy-policy for how we handle your information.`,
    ],
  },
];

function buildPlainText(): string {
  const lines: string[] = [];
  lines.push("Terms and Conditions");
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

export default function TermsAndConditions() {
  const policyText = buildPlainText();

  const handleDownload = () => {
    const blob = new Blob([policyText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "terms-and-conditions.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pt-32 px-4 max-w-[60rem] mx-auto text-neutral-100">
      <h1 className="mb-2">Terms and Conditions</h1>
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
          label="Download Terms and Conditions"
          onClick={handleDownload}
          icon={<Download />}
          fillWidth
        />
      </div>
      <div className="py-[10rem]" />
    </div>
  );
}
