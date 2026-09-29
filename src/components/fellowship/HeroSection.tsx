import { Box, Container, Stack, Typography } from "@mui/material";
import masterData from "../../data/masterData.json";
import { getIcon } from "../../utils/iconMap";
import LeadFormCard from "./LeadFormCard";
import type { Specialty } from "../../types/fellowship";

interface HeroSectionProps {
  specialty?: Specialty | null;
  onHomeClick?: () => void;
}

export default function HeroSection({ specialty = null, onHomeClick }: HeroSectionProps) {
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
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 2,
          height: { md: "100%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: { md: "center" },
          pt: { xs: 7, md: 0 },
          pb: { xs: 4, md: 0 },
          maxWidth: "95%",
        }}
      >
        {/* Logo overlay — click returns to homepage */}
        <Box
          component="button"
          type="button"
          onClick={onHomeClick}
          aria-label="Go to homepage"
          sx={{
            position: "absolute",
            top: { xs: 14, md: 20 },
            left: { xs: 8, md: 16 },
            zIndex: 4,
            p: 0,
            m: 0,
            border: "none",
            background: "none",
            cursor: "pointer",
            lineHeight: 0,
            display: "inline-flex",
            "&:hover": { opacity: 0.88 },
            "&:focus-visible": {
              outline: "2px solid #0056D2",
              outlineOffset: 4,
              borderRadius: 1,
            },
          }}
        >
          <Box
            component="img"
            src={brand.logo}
            alt={brand.name}
            sx={{
              width: { xs: 64, md: 100 },
              height: "auto",
              display: "block",
            }}
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr minmax(320px, 800px)" },
            gap: { xs: 3, md: 4 },
            alignItems: { xs: "start", md: "center" },
            minHeight: 0,
          }}
        >
          <Box sx={{ maxWidth: 600, pt: { md: 1 }, position: "relative", zIndex: 3 }}>
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
                fontSize: { xs: "1.7rem", sm: "2.1rem", md: "2.4rem", lg: "3.4rem" },
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

            <Box
              sx={{
                display: "inline-flex",
                alignItems: "stretch",
                flexWrap: "wrap",
                maxWidth: "100%",
                mb: 2.25,
                px: { xs: 0.75, md: 1 },
                py: { xs: 1, md: 1.15 },
                borderRadius: "14px",
                bgcolor: "rgba(255,255,255,0.18)",
                border: "1px solid rgba(255,255,255,0.28)",
                boxShadow: "0 8px 28px rgba(15, 40, 80, 0.06)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
              }}
            >
              {hero.stats.map((stat, index) => {
                const Icon = getIcon(stat.icon);
                return (
                  <Stack
                    key={stat.id}
                    alignItems="center"
                    spacing={0.75}
                    sx={{
                      minWidth: { xs: 72, md: 88 },
                      px: { xs: 1.1, md: 1.5 },
                      py: 0.5,
                      borderRight: {
                        xs: "none",
                        sm:
                          index < hero.stats.length - 1
                            ? "1px solid rgba(0,86,210,0.12)"
                            : "none",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: "10px",
                        background:
                          "linear-gradient(145deg, rgba(0,86,210,0.12) 0%, rgba(0,86,210,0.04) 100%)",
                        border: "1px solid rgba(0,86,210,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon sx={{ color: "#0056D2", fontSize: 18 }} />
                    </Box>
                    <Box sx={{ textAlign: "center" }}>
                      {stat.value ? (
                        <>
                          <Typography
                            sx={{
                              fontSize: 13,
                              fontWeight: 800,
                              color: "#0056D2",
                              lineHeight: 1.15,
                              letterSpacing: "-0.01em",
                            }}
                          >
                            {stat.value}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 10.5,
                              fontWeight: 600,
                              color: "#5A6B80",
                              lineHeight: 1.25,
                            }}
                          >
                            {stat.label}
                          </Typography>
                        </>
                      ) : (
                        <Typography
                          sx={{
                            fontSize: 11.5,
                            fontWeight: 700,
                            color: "#0B1F3A",
                            lineHeight: 1.25,
                          }}
                        >
                          {stat.label}
                        </Typography>
                      )}
                    </Box>
                  </Stack>
                );
              })}
            </Box>

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
