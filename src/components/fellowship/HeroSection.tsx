import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import masterData from "../../data/masterData.json";
import { getIcon } from "../../utils/iconMap";
import LeadFormCard from "./LeadFormCard";
import type { Specialty } from "../../types/fellowship";

interface HeroSectionProps {
  specialty?: Specialty | null;
  onHomeClick?: () => void;
}

export default function HeroSection({ specialty = null, onHomeClick }: HeroSectionProps) {
  const { brand, hero, sections } = masterData;
  const [cpdExpanded, setCpdExpanded] = useState(false);

  useEffect(() => {
    if (!cpdExpanded) return undefined;
    const timer = window.setTimeout(() => setCpdExpanded(false), 5000);
    return () => window.clearTimeout(timer);
  }, [cpdExpanded]);

  const headlineBefore = specialty?.headlineBefore || hero.headlineBefore;
  const headlineHighlight = specialty?.headlineHighlight || hero.headlineHighlight;
  const subheadline = specialty?.subheadline || hero.subheadline;
  const description = specialty?.heroDescription || hero.description;
  const meta = specialty?.meta || hero.meta || "";
  const fullHeroImage = specialty?.heroImage || hero.image;

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        minHeight: { xs: "100svh", lg: "100vh" },
        // Fill the viewport at 100%; grow if content needs more (e.g. zoom)
        height: { xs: "auto", lg: "auto" },
        display: { lg: "flex" },
        flexDirection: { lg: "column" },
      }}
    >
      {/* Full image as background — person stays visible, no solid left white block */}
      <Box
        key={fullHeroImage}
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${fullHeroImage})`,
          backgroundSize: "cover",
          backgroundPosition: { xs: "center top", lg: "68% center", xl: "center center" },
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Soft left fade for text only — image must still show through */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: {
            xs: "linear-gradient(180deg, rgba(234,243,255,0.92) 0%, rgba(245,249,255,0.85) 50%, rgba(255,255,255,0.95) 100%)",
            md: "linear-gradient(180deg, rgba(234,243,255,0.88) 0%, rgba(245,249,255,0.65) 40%, rgba(255,255,255,0.82) 100%)",
            lg: "linear-gradient(90deg, rgba(234,243,255,0.96) 0%, rgba(245,249,255,0.85) 26%, rgba(255,255,255,0.35) 42%, rgba(255,255,255,0.08) 52%, transparent 60%)",
          },
          pointerEvents: "none",
        }}
      />

      {/* Light fade under form only */}
      <Box
        sx={{
          display: { xs: "none", lg: "block" },
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: { lg: "28%", xl: "26%", tv: "24%" },
          background:
            "linear-gradient(270deg, rgba(245,249,255,0.45) 0%, rgba(245,249,255,0.12) 60%, transparent 100%)",
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
          flex: { lg: 1 },
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: { lg: "center" },
          minHeight: { lg: "100vh" },
          // Clear absolute logo so eyebrow/content never sit under it
          pt: { xs: 8, sm: 8, md: 10, lg: 10, tv: 12 },
          pb: { xs: 4, sm: 5, md: 6, lg: 5, tv: 6 },
          "@media (max-height: 700px) and (min-width: 1200px)": {
            minHeight: "auto",
            pt: 11,
            pb: 3,
            justifyContent: "flex-start",
          },
        }}
      >
        {/* Logo overlay — click returns to homepage */}
        <Box
          component="button"
          type="button"
          onClick={onHomeClick}
          aria-label={sections.hero.homeAriaLabel}
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
              maxWidth: { xs: "100%", md: 640, lg: 580, xl: 680, tv: 760 },
              pt: { xs: 0.5, lg: 1.5 },
              position: "relative",
              zIndex: 3,
            }}
          >
            <Typography
              sx={{
                color: "#0056D2",
                fontWeight: 700,
                fontSize: specialty
                  ? { xs: 13, sm: 14, md: 16, tv: 18 }
                  : { xs: 10, sm: 11, tv: 13 },
                letterSpacing: specialty ? "0.01em" : "0.14em",
                textTransform: specialty ? "none" : "uppercase",
                mb: { xs: 1.25, md: 1.5 },
                mt: { xs: 0.5, md: 1 },
              }}
            >
              {specialty ? specialty.name : brand.eyebrow}
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
                  lg: "3.2rem",
                  xl: "3.7rem",
                  tv: "4.2rem",
                },
                lineHeight: 1.15,
                mb: { xs: 1.25, md: 1.5 },
                letterSpacing: "-0.02em",
                whiteSpace: "pre-line",
                "@media (max-height: 700px) and (min-width: 1200px)": {
                  fontSize: "2.35rem",
                  mb: 1,
                },
              }}
            >
              <Box
                component="span"
                sx={{
                  display: "block",
                  fontSize: {
                    xs: "1.35rem",
                    sm: "1.6rem",
                    md: "1.9rem",
                    lg: "2.45rem",
                    xl: "2.85rem",
                    tv: "3.2rem",
                  },
                  lineHeight: 1.2,
                  "@media (max-height: 700px) and (min-width: 1200px)": {
                    fontSize: "1.95rem",
                  },
                }}
              >
                {headlineBefore}
              </Box>
              {headlineHighlight ? (
                <Box
                  component="span"
                  sx={{
                    display: "block",
                    color: "#0056D2",
                    fontSize: {
                      xs: "1.85rem",
                      sm: "2.25rem",
                      md: "2.7rem",
                      lg: "3.6rem",
                      xl: "4.15rem",
                      tv: "4.7rem",
                    },
                    lineHeight: 1.12,
                    mt: 0.35,
                    "@media (max-height: 700px) and (min-width: 1200px)": {
                      fontSize: "2.7rem",
                    },
                  }}
                >
                  {headlineHighlight}
                </Box>
              ) : null}
            </Typography>

            <Typography
              sx={{
                fontWeight: 700,
                color: "#0B1F3A",
                fontSize: { xs: 14, sm: 15, md: 22, lg: 24, xl: 26, tv: 28 },
                mb: 1.25,
                "@media (max-height: 700px) and (min-width: 1200px)": {
                  fontSize: 17,
                  mb: 0.85,
                },
              }}
            >
              {subheadline}
            </Typography>

            <Box
              sx={{
                position: "relative",
                mb: { xs: 2, md: 2.25 },
                maxWidth: { xs: "100%", md: 480, lg: 500, xl: 560, tv: 600 },
                "@media (max-height: 700px) and (min-width: 1200px)": {
                  mb: 1.25,
                },
              }}
            >
              <Typography
                sx={{
                  color: "#5A6B80",
                  fontSize: { xs: 13, sm: 13.5, md: 14.5, lg: 16, xl: 18, tv: 20 },
                  lineHeight: 1.7,
                  "@media (max-height: 700px) and (min-width: 1200px)": {
                    fontSize: 14,
                    lineHeight: 1.55,
                  },
                }}
              >
                {description}
              </Typography>
              {meta ? (
                <Typography
                  sx={{
                    mt: 1.25,
                    color: "#0B1F3A",
                    fontWeight: 700,
                    fontSize: { xs: 13, md: 14.5, tv: 16 },
                  }}
                >
                  {meta}
                </Typography>
              ) : null}
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
                mb: { xs: 1.5, md: 1.75 },
                px: { xs: 0.5, sm: 0.75, md: 1 },
                py: { xs: 0.75, md: 1 },
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
              alignItems="flex-start"
              spacing={{ xs: 1.5, md: 2 }}
              sx={{
                maxWidth: { xs: "100%", md: 520, lg: 540, xl: 600, tv: 640 },
                bgcolor: "rgba(255,255,255,0.95)",
                border: "1px solid #E0EAF6",
                borderRadius: "12px",
                px: { xs: 1.5, md: 1.75 },
                py: { xs: 1.15, md: 1.35 },
                boxShadow: "0 4px 16px rgba(0,86,210,0.08)",
              }}
            >
              <Box
                component="img"
                src={hero.cpdBadge}
                alt={sections.hero.cpdAlt}
                sx={{
                  width: { xs: 72, md: 92, tv: 108 },
                  height: "auto",
                  display: "block",
                  objectFit: "contain",
                  flexShrink: 0,
                  mt: 0.25,
                }}
              />
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography
                  sx={{ fontSize: { xs: 12, md: 13, tv: 15 }, fontWeight: 700, color: "#0B1F3A" }}
                >
                  {hero.cpdLabel}
                </Typography>
                {hero.cpdSubLabel ? (
                  <Typography
                    sx={{ fontSize: { xs: 10, md: 11, tv: 12 }, color: "#6B7C93", mb: 0.75 }}
                  >
                    {hero.cpdSubLabel}
                  </Typography>
                ) : null}
                {hero.cpdDescription ? (
                  <>
                    <Typography
                      sx={{
                        color: "#5A6B80",
                        fontSize: { xs: 12, md: 13, tv: 14 },
                        lineHeight: 1.55,
                        ...(cpdExpanded
                          ? {}
                          : {
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }),
                      }}
                    >
                      {hero.cpdDescription}
                    </Typography>
                    <Button
                      onClick={() => setCpdExpanded((open) => !open)}
                      sx={{
                        mt: 0.35,
                        px: 0,
                        minWidth: 0,
                        textTransform: "none",
                        fontWeight: 700,
                        fontSize: { xs: 11, md: 12 },
                        color: "#0056D2",
                        lineHeight: 1.2,
                        "&:hover": { bgcolor: "transparent", textDecoration: "underline" },
                      }}
                    >
                      {cpdExpanded ? sections.hero.cpdViewLess : sections.hero.cpdViewMore}
                    </Button>
                  </>
                ) : null}
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
            <LeadFormCard
              key={specialty?.id || "home"}
              defaultSpecialty={specialty?.id || ""}
              eyebrow={specialty?.formEyebrow}
              title={specialty?.formTitle}
              subtitle={specialty?.formSubtitle}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
