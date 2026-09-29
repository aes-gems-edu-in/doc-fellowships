import { useEffect, useMemo, useState } from "react";
import masterData from "../data/masterData.json";
import LandingPage from "../pages/LandingPage";
import { scrollToTop } from "../components/LenisSmoothScroll";
import type { Program } from "../types/fellowship";

export default function Home() {
  const [specialtyId, setSpecialtyId] = useState<string | null>(null);
  const [programId, setProgramId] = useState<string | null>(null);

  const specialty = useMemo(
    () => masterData.specialties.find((s) => s.id === specialtyId) || null,
    [specialtyId]
  );

  const programs = useMemo(() => {
    if (!specialtyId) {
      return masterData.programs.filter((p) => p.featured) as Program[];
    }
    return masterData.programs.filter((p) => p.specialtyId === specialtyId) as Program[];
  }, [specialtyId]);

  const selectedProgram = useMemo(() => {
    if (!programId) return null;
    return (masterData.programs.find((p) => p.id === programId) as Program | undefined) || null;
  }, [programId]);

  useEffect(() => {
    if (!specialtyId) return;
    scrollToTop(false);
    const timer = window.setTimeout(() => {
      const el = document.getElementById("featured-programs");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 450);
    return () => window.clearTimeout(timer);
  }, [specialtyId]);

  useEffect(() => {
    if (!programId) return;
    const el = document.getElementById("selected-program");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [programId]);

  const viewPrograms = (id: string) => {
    setSpecialtyId(id);
    setProgramId(null);
  };

  const learnMore = (id: string) => {
    const program = masterData.programs.find((p) => p.id === id);
    if (!program) return;
    setSpecialtyId(program.specialtyId);
    setProgramId(program.id);
  };

  const clearSpecialty = () => {
    setSpecialtyId(null);
    setProgramId(null);
    scrollToTop(false);
  };

  const clearProgram = () => setProgramId(null);

  return (
    <LandingPage
      specialtyId={specialtyId}
      specialty={specialty}
      programs={programs}
      selectedProgram={selectedProgram}
      onViewPrograms={viewPrograms}
      onLearnMore={learnMore}
      onClearProgram={clearProgram}
      onClearSpecialty={clearSpecialty}
    />
  );
}
