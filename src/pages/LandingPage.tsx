import { Box } from "@mui/material";
import {
  HeroSection,
  SpecialtiesSection,
  WhyChooseSection,
  SelectedProgramSection,
  PartnersSection,
  CertificatesSection,
  TestimonialsSection,
  FaqSection,
  FooterCtaSection,
} from "../components/fellowship";
import type { Program, Specialty } from "../types/fellowship";

interface LandingPageProps {
  specialtyId: string | null;
  specialty: Specialty | null;
  program: Program | null;
  onViewPrograms: (specialtyId: string) => void;
  onClearSpecialty: () => void;
}

export default function LandingPage({
  specialtyId,
  specialty,
  program,
  onViewPrograms,
  onClearSpecialty,
}: LandingPageProps) {
  return (
    <Box component="main">
      <HeroSection specialty={specialty} onHomeClick={onClearSpecialty} />
      <WhyChooseSection />
      <SpecialtiesSection selectedSpecialtyId={specialtyId} onViewPrograms={onViewPrograms} />
      {program ? <SelectedProgramSection program={program} /> : null}
      <CertificatesSection />
      <PartnersSection />
      <TestimonialsSection />
      {program?.faqs ? <FaqSection items={program.faqs} /> : null}
      <FooterCtaSection />
    </Box>
  );
}
