import { Box, Button, Container, Stack, Typography } from "@mui/material";
import masterData from "../../data/masterData.json";
import { ArrowForwardIcon, getIcon } from "../../utils/iconMap";
import { scrollToTop as lenisScrollToTop } from "../LenisSmoothScroll";

interface FooterCtaSectionProps {
  onTalkToExpert?: () => void;
}

export default function FooterCtaSection({ onTalkToExpert }: FooterCtaSectionProps) {
  const { footerCta } = masterData;
  const waveBg = (footerCta as { waveBg?: string }).waveBg || "";

  const handleTalkToExpert = () => {
    if (onTalkToExpert) {
      onTalkToExpert();
      return;
    }
    lenisScrollToTop(false);
  };

  return (
    <Box
      sx={{
        bgcolor: "#FFFFFF",
        px: { xs: 2, sm: 3, md: 4, lg: 5 },
        pt: { xs: 2, md: 3 },
        pb: { xs: 3, md: 4 },
      }}
    >
      <Container maxWidth="lg" disableGutters>
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: { xs: "18px", md: "28px" },
            bgcolor: "#0056D2",
            minHeight: { xs: "auto", md: 220 },
            boxShadow: "0 12px 40px rgba(0, 62, 153, 0.22)",
          }}
        >
          {/* Left surgery image — left side only */}
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: { md: "34%", lg: "32%" },
              backgroundImage: `url(${footerCta.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              zIndex: 0,
            }}
          />

          {/* Fade surgery image into solid blue */}
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: { md: "42%", lg: "40%" },
              background:
                "linear-gradient(90deg, rgba(0,62,153,0.15) 0%, rgba(0,86,210,0.55) 42%, rgba(0,86,210,0.95) 72%, #0056D2 100%)",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />

          {/* Soft wave pattern — right side only */}
          {waveBg && (
            <Box
              sx={{
                display: { xs: "none", md: "block" },
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                width: { md: "38%", lg: "34%" },
                backgroundImage: `url(${waveBg})`,
                backgroundSize: "cover",
                backgroundPosition: "right center",
                backgroundRepeat: "no-repeat",
                opacity: 0.35,
                zIndex: 0,
                pointerEvents: "none",
              }}
            />
          )}

          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              pl: { xs: 2.5, sm: 3.5, md: "30%", lg: "28%" },
              pr: { xs: 2.5, sm: 3.5, md: 4, lg: 5 },
              py: { xs: 3.25, md: 3.75 },
            }}
          >
            {/* Row 1 — headline + CTA */}
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={{ xs: 2.5, md: 3 }}
              alignItems={{ xs: "stretch", md: "center" }}
              justifyContent="space-between"
            >
              <Box sx={{ flex: 1, minWidth: 0, maxWidth: { md: 560 } }}>
                <Typography
                  sx={{
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: { xs: "1.05rem", md: "1.25rem", lg: "1.35rem" },
                    letterSpacing: "0.04em",
                    lineHeight: 1.3,
                    mb: 0.6,
                    textTransform: "uppercase",
                  }}
                >
                  {footerCta.headline}
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.95)",
                    fontWeight: 600,
                    fontSize: { xs: 15, md: 17, lg: 18 },
                    lineHeight: 1.4,
                  }}
                >
                  {footerCta.subheadline}
                </Typography>
              </Box>

              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                onClick={handleTalkToExpert}
                sx={{
                  bgcolor: "#fff",
                  color: "#0056D2",
                  px: 3.25,
                  py: 1.4,
                  borderRadius: "999px",
                  fontWeight: 700,
                  fontSize: 14.5,
                  textTransform: "none",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                  "&:hover": { bgcolor: "#F0F6FF" },
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  alignSelf: { xs: "stretch", sm: "flex-start", md: "center" },
                }}
              >
                {footerCta.buttonLabel}
              </Button>
            </Stack>

            {/* Row 2 — trust points */}
            <Stack
              direction="row"
              spacing={{ xs: 2, md: 4 }}
              flexWrap="wrap"
              useFlexGap
              sx={{
                mt: { xs: 2.75, md: 3 },
                pt: { xs: 2.25, md: 2.5 },
                borderTop: "1px solid rgba(255,255,255,0.22)",
                justifyContent: { xs: "flex-start", md: "flex-start" },
              }}
            >
              {footerCta.trustPoints.map((point) => {
                const Icon = getIcon(point.icon);
                return (
                  <Stack key={point.id} direction="row" spacing={1} alignItems="center">
                    <Icon sx={{ color: "#fff", fontSize: 20 }} />
                    <Typography sx={{ color: "#fff", fontSize: 13, fontWeight: 500 }}>
                      {point.label}
                    </Typography>
                  </Stack>
                );
              })}
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
