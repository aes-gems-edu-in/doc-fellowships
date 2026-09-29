import { Box } from "@mui/material";
import {
  HeroSection,
  SpecialtiesSection,
  WhyChooseSection,
  FeaturedProgramsSection,
  SelectedProgramSection,
  PartnersSection,
  TestimonialsSection,
  FooterCtaSection,
} from "../components/fellowship";
import type { Program, Specialty } from "../types/fellowship";

interface LandingPageProps {
  specialtyId: string | null;
  specialty: Specialty | null;
  programs: Program[];
  selectedProgram: Program | null;
  onViewPrograms: (specialtyId: string) => void;
  onLearnMore: (programId: string) => void;
  onClearProgram: () => void;
  onClearSpecialty: () => void;
}

export default function LandingPage({
  specialtyId,
  specialty,
  programs,
  selectedProgram,
  onViewPrograms,
  onLearnMore,
  onClearProgram,
  onClearSpecialty,
}: LandingPageProps) {
  return (
    <Box component="main">
      <HeroSection specialty={specialty} />
      <SpecialtiesSection
        selectedSpecialtyId={specialtyId}
        onViewPrograms={onViewPrograms}
      />
      <WhyChooseSection />
      <Box id="featured-programs">
        <FeaturedProgramsSection
          programs={programs}
          title={specialty ? `${specialty.name} Fellowship Programs` : undefined}
          showViewAll
          onLearnMore={onLearnMore}
          onViewAll={specialty ? onClearSpecialty : undefined}
          viewAllLabel={specialty ? "View All Specialities →" : "View All Programs →"}
        />
      </Box>
      {selectedProgram && (
        <Box id="selected-program">
          <SelectedProgramSection
            program={selectedProgram}
            specialtyPrograms={programs}
            onSelectProgram={onLearnMore}
            onClose={onClearProgram}
          />
        </Box>
      )}
      <PartnersSection />
      <TestimonialsSection />
      <FooterCtaSection />
    </Box>
  );
}
