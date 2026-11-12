import React from "react";
import { PersonStanding, Check, Building } from "lucide-react";
import ProductCard from "~/components/ProductCard";
import Button from "~/hkit/Button";
import HeroBanner from "~/hkit/HeroBanner";
import type { LucideIcon } from "lucide-react";

type ProductCardContent = {
  title: string;
  actionButton: React.ReactNode;
  icon?: React.ElementType;
  iconColor?: string;
  desc?: string;
  features?: string[];
}

const cardContent: ProductCardContent[] = [
    {
        title: "Personal",
        actionButton: <Button onClick={() => window.location.href = "/personal"} label="Download Now" size="lg" variant="primary" fillWidth={true} />,
  icon: PersonStanding,
        iconColor: "var(--orange-500)",
        desc: "Make exercise fun & climb the leaderboard",
        features: [
            "Endurance Game: Optimal fat burn",
            "Power Game: HIIT intervals for Anti-Aging",
            "Recovery Game: Track Fitness Progress"
        ]
    },
    {
        title: "Business",
        actionButton: <Button onClick={() => window.location.href = "/business"} label="Learn More" size="lg" variant="secondary" fillWidth={true} />,
  icon: Building,
        iconColor: "var(--green-500)",
        desc: "Earn revenue by members that train from home.",
        features: [
            "Secure a 5 Mile Exclusive Radius",
            "Club Challenges Encourage Friendly Competition",
            "Give Personal Training a Competitive Edge"
        ]
    }
]

export function Hero() {
  return (
    <main className="flex flex-col items-center w-full">
      <HeroBanner
        eyebrow="HeartHero Fitness"
        title="Gamified,"
        accent="Heart-Healthy Exercise."
        body="Turn every workout into a game. Burn fat, train smarter, and climb the leaderboard."
        videoSrc="https://videos.pexels.com/video-files/19282244/19282244-hd_1920_1080_25fps.mp4"
        
        actions={
          <>
            <Button link="/personal" label="Download Now" size="lg" variant="primary" />
            <Button link="/business" label="For Business" size="lg" variant="secondary" />
          </>
        }
      />
      <section className="py-16">
        <div className='flex flex-col items-center'>
          <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 m-2'>
            {cardContent.map((card, index) => (
              <ProductCard
                key={index}
                title={card.title}
                actionButton={card.actionButton}
                icon={card.icon}
                iconColor={card.iconColor}
              >
                <div></div>
                <p className="text-md text-neutral-200">{card.desc}</p>
                <ol >
                  {card.features?.map((feature, index) => (
                    <li className="flex flex-row gap-2 items-center" key={index}>
                      <Check size={16} strokeWidth={3} color="var(--neutral-500)" />
                      <span className="font-normal text-md text-neutral-200">{feature}</span>
                    </li>
                  ))}

                </ol>
              </ProductCard>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}