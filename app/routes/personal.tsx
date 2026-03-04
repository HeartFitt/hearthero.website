import React from "react";
import Button from "~/hkit/Button";
import VideoPlayer from "~/components/VideoPlayer";
import HubBenefits from "~/sections/HubBenefits";
import DecisionToInstall from "~/sections/DecisionToInstall";
import ContactForm from "~/sections/PersonalForm";
import { ArrowLeft } from "lucide-react";
import AppStoreAnnouncement from "~/sections/AppStoreAnnouncement";
import ScrollFadeIn from "~/components/ScrollFadeIn";

export default function Personal() {
    return (
        <>
            <div className="flex flex-col pt-32 px-4 gap-10">
                {/* Back Button and Title */}
                <ScrollFadeIn direction="up">
                  <div className="flex flex-col gap-4">
                      <div>
                         <Button onClick={() => window.history.back()} icon={<ArrowLeft size={24} strokeWidth={3}/>} variant="icon" />   
                      </div>
                      <br/>
                      <h1>Personal</h1>
                      <h6 className="px-1 text-neutral-400">Fat burn starts in Blue Recovery, builds with Green Endurance, and ignites in Orange & Red Power. Cardio becomes a game worth playing.</h6>
                      <VideoPlayer />
                  </div>
                </ScrollFadeIn>
                <ScrollFadeIn direction="up" delay={0.4}>
                  <AppStoreAnnouncement/>
                </ScrollFadeIn>
                <ScrollFadeIn direction="up" delay={0.2}>
                  <div>
                      <ContactForm />
                  </div>
                </ScrollFadeIn>
                <br className="py-[20rem]"></br>
            </div>
        </>
    )
}