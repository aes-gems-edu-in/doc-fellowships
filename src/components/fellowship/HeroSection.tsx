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
        height: { xs: "auto", lg: "100vh" },
        minHeight: { xs: "100svh", md: "auto", lg: "100vh" },
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
            xs: "linear-gradient(180deg, rgba(234,243,255,0.94) 0%, rgba(245,249,255,0.88) 45%, rgba(255,255,255,0.96) 100%)",
            md: "linear-gradient(180deg, rgba(234,243,255,0.9) 0%, rgba(245,249,255,0.7) 40%, rgba(255,255,255,0.85) 100%)",
            lg: "linear-gradient(90deg, rgba(234,243,255,0.96) 0%, rgba(245,249,255,0.88) 24%, rgba(255,255,255,0.35) 40%, rgba(255,255,255,0.08) 50%, transparent 58%)",
          },
        }}
      />

      {/* Light fade only on far right under form — doctor stays in center */}
      <Box
        sx={{
          display: { xs: "none", lg: "block" },
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: { lg: "28%", xl: "26%", tv: "24%" },
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
          height: { lg: "100%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: { lg: "center" },
          pt: { xs: 7, sm: 8, md: 9, lg: 0 },
          pb: { xs: 4, sm: 5, md: 6, lg: 0 },
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
            top: { xs: 12, sm: 16, md: 20, tv: 28 },
            left: { xs: 4, sm: 8, md: 12, tv: 8 },
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
              width: { xs: 56, sm: 72, md: 88, lg: 100, tv: 120 },
              height: "auto",
              display: "block",
            }}
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr",
              lg: "minmax(0, 1.15fr) minmax(320px, 420px)",
              xl: "minmax(0, 1.2fr) minmax(340px, 450px)",
              tv: "minmax(0, 1.25fr) minmax(380px, 480px)",
            },
            gap: { xs: 3, sm: 3.5, md: 4, lg: 5, tv: 6 },
            alignItems: { xs: "start", lg: "center" },
            minHeight: 0,
          }}
        >
          <Box
            sx={{
              maxWidth: { xs: "100%", md: 640, lg: 600, xl: 680, tv: 760 },
              pt: { lg: 1 },
              position: "relative",
              zIndex: 3,
            }}
          >
            <Typography
              sx={{
                color: "#0056D2",
                fontWeight: 700,
                fontSize: { xs: 10, sm: 11, tv: 13 },
                letterSpacing: "0.14em",
                mb: { xs: 1.25, md: 1.5 },
              }}
            >
              {specialty ? specialty.name.toUpperCase() : brand.eyebrow}
            </Typography>

            <Typography
              component="h1"
              sx={{
                fontWeight: 800,
                color: "#0B1F3A",
                fontSize: {
                  xs: "1.55rem",
                  sm: "1.9rem",
                  md: "2.25rem",
                  lg: "2.6rem",
                  xl: "3rem",
                  tv: "3.5rem",
                },
                lineHeight: 1.15,
                mb: { xs: 1.25, md: 1.5 },
                letterSpacing: "-0.02em",
              }}
            >
              {headlineBefore}
              <Box component="span" sx={{ color: "#0056D2" }}>
                {headlineHighlight}
              </Box>
            </Typography>

            <Typography
              sx={{
                fontWeight: 700,
                color: "#0B1F3A",
                fontSize: { xs: 14, sm: 15, md: 17, tv: 19 },
                mb: 1.25,
              }}
            >
              {subheadline}
            </Typography>

            <Box sx={{ position: "relative", mb: { xs: 2.5, md: 3 }, maxWidth: { xs: "100%", md: 480, tv: 560 } }}>
              <Typography
                sx={{
                  color: "#5A6B80",
                  fontSize: { xs: 13, sm: 13.5, md: 14.5, tv: 16 },
                  lineHeight: 1.7,
                }}
              >
                {description}
              </Typography>
              <Typography
                sx={{
                  display: { xs: "none", xl: "block" },
                  position: "absolute",
                  right: { xl: -90, tv: -110 },
                  top: 8,
                  width: { xl: 120, tv: 140 },
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: { xl: 20, tv: 24 },
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
                mb: { xs: 2, md: 2.25 },
                px: { xs: 0.5, sm: 0.75, md: 1 },
                py: { xs: 0.85, md: 1.15 },
                borderRadius: { xs: "12px", md: "14px" },
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
                      minWidth: { xs: 64, sm: 72, md: 88, tv: 100 },
                      px: { xs: 0.85, sm: 1.1, md: 1.5, tv: 1.75 },
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
                        width: { xs: 32, md: 36, tv: 42 },
                        height: { xs: 32, md: 36, tv: 42 },
                        borderRadius: "10px",
                        background:
                          "linear-gradient(145deg, rgba(0,86,210,0.12) 0%, rgba(0,86,210,0.04) 100%)",
                        border: "1px solid rgba(0,86,210,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon sx={{ color: "#0056D2", fontSize: { xs: 16, md: 18, tv: 20 } }} />
                    </Box>
                    <Box sx={{ textAlign: "center" }}>
                      {stat.value ? (
                        <>
                          <Typography
                            sx={{
                              fontSize: { xs: 12, md: 13, tv: 15 },
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
                              fontSize: { xs: 9.5, md: 10.5, tv: 12 },
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
                            fontSize: { xs: 10.5, md: 11.5, tv: 13 },
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
                px: { xs: 1.25, md: 1.5 },
                py: { xs: 0.75, md: 0.9 },
                boxShadow: "0 4px 16px rgba(0,86,210,0.08)",
              }}
            >
              <Box
                component="img"
                src={hero.cpdBadge}
                alt="CPD"
                sx={{ width: { xs: 34, md: 38, tv: 44 }, height: { xs: 34, md: 38, tv: 44 } }}
              />
              <Box>
                <Typography sx={{ fontSize: { xs: 11, md: 12, tv: 14 }, fontWeight: 700, color: "#0B1F3A" }}>
                  {hero.cpdLabel}
                </Typography>
                {hero.cpdSubLabel && (
                  <Typography sx={{ fontSize: { xs: 9, md: 10, tv: 12 }, color: "#6B7C93" }}>
                    {hero.cpdSubLabel}
                  </Typography>
                )}
              </Box>
            </Stack>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "stretch", lg: "flex-end" },
              width: "100%",
              maxWidth: { xs: "100%", sm: 480, md: 520, lg: "none" },
              mx: { xs: "auto", lg: 0 },
              pt: { lg: 0.5 },
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
