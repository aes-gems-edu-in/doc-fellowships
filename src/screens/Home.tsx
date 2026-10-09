import { useEffect, useMemo, useState } from "react";
import masterData from "../data/masterData.json";
import LandingPage from "../pages/LandingPage";
import { scrollToTop } from "../components/LenisSmoothScroll";
import type { Program } from "../types/fellowship";

export default function Home() {
  const [specialtyId, setSpecialtyId] = useState<string | null>(null);

  const specialty = useMemo(
    () => masterData.specialties.find((s) => s.id === specialtyId) || null,
    [specialtyId]
  );

  const program = useMemo(() => {
    if (!specialty) return null;
    return (
      (masterData.programs.find((p) => p.specialtyId === specialty.id) as Program | undefined) ||
      null
    );
  }, [specialty]);

  useEffect(() => {
    if (!specialtyId) return;
    scrollToTop(false);
  }, [specialtyId]);

  const viewPrograms = (id: string) => {
    setSpecialtyId(id);
  };

  const clearSpecialty = () => {
    setSpecialtyId(null);
    scrollToTop(false);
  };

  return (
    <LandingPage
      specialtyId={specialtyId}
      specialty={specialty}
      program={program}
      onViewPrograms={viewPrograms}
      onClearSpecialty={clearSpecialty}
    />
  );
}
