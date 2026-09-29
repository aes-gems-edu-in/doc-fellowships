import { Box, Container, Stack, Typography } from "@mui/material";
import masterData from "../../data/masterData.json";
import { getIcon } from "../../utils/iconMap";
import LeadFormCard from "./LeadFormCard";
import type { Specialty } from "../../types/fellowship";

interface HeroSectionProps {
  specialty?: Specialty | null;
}

export default function HeroSection({ specialty = null }: HeroSectionProps) {
  const { brand, hero } = masterData;

  const headlineBefore = specialty?.headlineBefore || hero.headlineBefore;
  const headlineHighlight = specialty?.headlineHighlight || hero.headlineHighlight;
  const subheadline = specialty?.subheadline || hero.subheadline;
  const description = specialty?.heroDescription || hero.description;
  // Full AI image = doctor + background together (one image)
  const fullHeroImage = specialty?.heroImage || hero.image;

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        height: { xs: "auto", md: "100vh" },
        minHeight: { xs: "100svh", md: "100vh" },
      }}
    >
      {/* FULL image as background (person + scene joined) */}
      <Box
        key={fullHeroImage}
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${fullHeroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Left fade — text readability only; center image stays visible */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: {
            xs: "linear-gradient(180deg, rgba(234,243,255,0.92) 0%, rgba(245,249,255,0.85) 50%, rgba(255,255,255,0.95) 100%)",
            md: "linear-gradient(90deg, rgba(234,243,255,0.96) 0%, rgba(245,249,255,0.88) 24%, rgba(255,255,255,0.35) 40%, rgba(255,255,255,0.08) 50%, transparent 58%)",
          },
        }}
      />

      {/* Light fade only on far right under form — doctor stays in center */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: { md: "28%", lg: "26%" },
          background:
            "linear-gradient(270deg, rgba(245,249,255,0.5) 0%, rgba(245,249,255,0.15) 60%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.1,
          backgroundImage: "radial-gradient(circle, rgba(0,86,210,0.3) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          pointerEvents: "none",
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 2,
          height: { md: "100%" },
          display: "flex",
          flexDirection: "column",
          pt: { xs: 2, md: 2.5 },
          pb: { xs: 4, md: 4 },
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.1} sx={{ mb: { xs: 2.5, md: 2.5 }, flexShrink: 0 }}>
          <Box component="img" src={brand.logo} alt={brand.name} sx={{ width: 34, height: 34 }} />
          <Typography sx={{ fontWeight: 800, fontSize: 14, letterSpacing: "0.08em", color: "#0B1F3A" }}>
            {brand.name}
          </Typography>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr minmax(320px, 400px)" },
            gap: { xs: 3, md: 4 },
            alignItems: { xs: "start", md: "center" },
            flex: { md: 1 },
            minHeight: 0,
          }}
        >
          <Box sx={{ maxWidth: 480, pt: { md: 1 }, position: "relative", zIndex: 3 }}>
            <Typography
              sx={{
                color: "#0056D2",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "0.14em",
                mb: 1.5,
              }}
            >
              {specialty ? specialty.name.toUpperCase() : brand.eyebrow}
            </Typography>

            <Typography
              component="h1"
              sx={{
                fontWeight: 800,
                color: "#0B1F3A",
                fontSize: { xs: "1.7rem", sm: "2.1rem", md: "2.4rem", lg: "2.55rem" },
                lineHeight: 1.15,
                mb: 1.5,
                letterSpacing: "-0.02em",
              }}
            >
              {headlineBefore}
              <Box component="span" sx={{ color: "#0056D2" }}>
                {headlineHighlight}
              </Box>
            </Typography>

            <Typography sx={{ fontWeight: 700, color: "#0B1F3A", fontSize: { xs: 15, md: 17 }, mb: 1.25 }}>
              {subheadline}
            </Typography>

            <Box sx={{ position: "relative", mb: 3, maxWidth: 420 }}>
              <Typography sx={{ color: "#5A6B80", fontSize: { xs: 13.5, md: 14.5 }, lineHeight: 1.7 }}>
                {description}
              </Typography>
              <Typography
                sx={{
                  display: { xs: "none", lg: "block" },
                  position: "absolute",
                  right: -90,
                  top: 8,
                  width: 120,
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: 20,
                  lineHeight: 1.15,
                  color: "#0056D2",
                  fontWeight: 700,
                  transform: "rotate(-10deg)",
                  whiteSpace: "pre-line",
                  textAlign: "center",
                }}
              >
                {hero.scriptText}
              </Typography>
            </Box>

            <Stack
              direction="row"
              flexWrap="wrap"
              useFlexGap
              spacing={{ xs: 2, md: 2.5 }}
              alignItems="center"
              sx={{ mb: 2 }}
            >
              {hero.stats.map((stat) => {
                const Icon = getIcon(stat.icon);
                return (
                  <Stack key={stat.id} direction="row" spacing={0.9} alignItems="center">
                    <Box
                      sx={{
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        bgcolor: "rgba(232,241,255,0.95)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon sx={{ color: "#0056D2", fontSize: 18 }} />
                    </Box>
                    <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: "#0B1F3A" }}>
                      {stat.value ? (
                        <>
                          <Box component="span" sx={{ color: "#0056D2" }}>
                            {stat.value}
                          </Box>{" "}
                          {stat.label}
                        </>
                      ) : (
                        stat.label
                      )}
                    </Typography>
                  </Stack>
                );
              })}
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              spacing={1.25}
              sx={{
                display: "inline-flex",
                bgcolor: "rgba(255,255,255,0.95)",
                border: "1px solid #E0EAF6",
                borderRadius: "12px",
                px: 1.5,
                py: 0.9,
                boxShadow: "0 4px 16px rgba(0,86,210,0.08)",
              }}
            >
              <Box component="img" src={hero.cpdBadge} alt="CPD" sx={{ width: 38, height: 38 }} />
              <Box>
                <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#0B1F3A" }}>
                  {hero.cpdLabel}
                </Typography>
                {hero.cpdSubLabel && (
                  <Typography sx={{ fontSize: 10, color: "#6B7C93" }}>{hero.cpdSubLabel}</Typography>
                )}
              </Box>
            </Stack>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "stretch", md: "flex-end" },
              pt: { md: 0.5 },
              position: "relative",
              zIndex: 3,
            }}
          >
            <LeadFormCard key={specialty?.id || "default"} defaultSpecialty={specialty?.id || ""} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
