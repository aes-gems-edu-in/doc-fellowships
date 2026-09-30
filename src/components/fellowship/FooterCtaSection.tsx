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
        px: { xs: 1.5, sm: 2.5, md: 4, lg: 5, tv: 6 },
        pt: { xs: 2, md: 3, tv: 4 },
        pb: { xs: 2.5, md: 4, tv: 5 },
      }}
    >
      <Container maxWidth="xl" disableGutters>
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: {
              xs: "16px",
              sm: "20px",
              md: "28px",
              tv: "32px",
            },
            bgcolor: "#0056D2",
            minHeight: {
              xs: "auto",
              md: 200,
              lg: 220,
              tv: 260,
            },
            boxShadow: "0 12px 40px rgba(0, 62, 153, 0.22)",
          }}
        >
          {/* Left Image */}
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: { md: "34%", lg: "32%", tv: "30%" },
              backgroundImage: `url(${footerCta.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              zIndex: 0,
            }}
          />

          {/* Image Gradient */}
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: { md: "42%", lg: "40%", tv: "38%" },
              background:
                "linear-gradient(90deg, rgba(0,62,153,0.15) 0%, rgba(0,86,210,0.55) 42%, rgba(0,86,210,0.95) 72%, #0056D2 100%)",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />

          {/* Wave Background */}
          {waveBg && (
            <Box
              sx={{
                display: { xs: "none", lg: "block" },
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                width: { lg: "34%", tv: "32%" },
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

          {/* Main Content */}
          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              pl: {
                xs: 2,
                sm: 3,
                md: "30%",
                lg: "26%",
                tv: "28%",
              },
              pr: {
                xs: 2,
                sm: 3,
                md: 3.5,
                lg: 5,
                tv: 6,
              },
              py: {
                xs: 3,
                sm: 3.25,
                md: 3.5,
                tv: 4.5,
              },
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr",
                md: "1.15fr 0.9fr",
                lg: "1.2fr 0.85fr",
              },
              gap: {
                xs: 2.5,
                sm: 3,
                md: 3.5,
                tv: 5,
              },
              alignItems: "center",
              minHeight: {
                md: 200,
                lg: 220,
                tv: 260,
              },
            }}
          >
            {/* Headline + Description */}
            <Box
              sx={{
                minWidth: 0,
                width: "100%",
                textAlign: {
                  xs: "center",
                  md: "left",
                },
              }}
            >
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.92)",
                  fontWeight: 700,
                  fontSize: {
                    xs: 11,
                    sm: 12,
                    md: 13,
                    lg: 14,
                    tv: 15,
                  },
                  letterSpacing: "0.08em",
                  lineHeight: 1.35,
                  mb: 1,
                  textTransform: "uppercase",
                }}
              >
                {footerCta.headline}
              </Typography>

              <Typography
                sx={{
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: {
                    xs: "1.2rem",
                    sm: "1.35rem",
                    md: "1.55rem",
                    lg: "1.85rem",
                    tv: "2.15rem",
                  },
                  lineHeight: {
                    xs: 1.3,
                    md: 1.25,
                  },
                  letterSpacing: "-0.01em",
                  maxWidth: {
                    xs: "100%",
                    sm: 520,
                    md: 480,
                    tv: 580,
                  },
                  mx: {
                    xs: "auto",
                    md: 0,
                  },
                  whiteSpace: "pre-line",
                  overflowWrap: "break-word",
                }}
              >
                {footerCta.subheadline}
              </Typography>
            </Box>

            {/* Button + Trust Points */}
            <Stack
              spacing={{
                xs: 2,
                md: 2.25,
              }}
              alignItems="center"
              sx={{
                justifySelf: {
                  xs: "stretch",
                  md: "end",
                },
                width: "100%",
                maxWidth: {
                  xs: "100%",
                  sm: 420,
                  md: "none",
                },
              }}
            >
              {/* CTA Button */}
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                onClick={handleTalkToExpert}
                sx={{
                  bgcolor: "#fff",
                  color: "#0056D2",
                  px: {
                    xs: 2.75,
                    md: 3.25,
                    tv: 3.75,
                  },
                  py: {
                    xs: 1.2,
                    md: 1.4,
                    tv: 1.55,
                  },
                  minHeight: {
                    xs: 46,
                    md: 50,
                  },
                  borderRadius: "999px",
                  fontWeight: 700,
                  fontSize: {
                    xs: 13.5,
                    md: 14.5,
                    tv: 16,
                  },
                  textTransform: "none",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                  "&:hover": {
                    bgcolor: "#F0F6FF",
                  },
                  whiteSpace: "nowrap",
                  width: {
                    xs: "100%",
                    sm: "auto",
                  },
                  maxWidth: {
                    xs: 320,
                    sm: "none",
                  },
                }}
              >
                {footerCta.buttonLabel}
              </Button>

              {/* Trust Points */}
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: {
                    xs: "wrap",
                    sm: "nowrap",
                  },
                  gap: {
                    xs: 1.25,
                    sm: 1.5,
                    md: 2,
                    lg: 2.5,
                    tv: 3,
                  },
                  alignItems: "center",
                  justifyContent: {
                    xs: "center",
                    md: "flex-end",
                  },
                  overflow: "hidden",
                }}
              >
                {footerCta.trustPoints.map((point) => {
                  const Icon = getIcon(point.icon);

                  return (
                    <Stack
                      key={point.id}
                      direction="row"
                      spacing={0.75}
                      alignItems="center"
                      justifyContent="center"
                      sx={{
                        flexShrink: 0,
                        minWidth: 0,
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Icon
                        sx={{
                          color: "#fff",
                          fontSize: {
                            xs: 15,
                            md: 17,
                            tv: 19,
                          },
                          flexShrink: 0,
                        }}
                      />

                      <Typography
                        sx={{
                          color: "#fff",
                          fontSize: {
                            xs: 11.5,
                            sm: 12.5,
                            tv: 14,
                          },
                          fontWeight: 500,
                          whiteSpace: "nowrap",
                          lineHeight: 1.3,
                        }}
                      >
                        {point.label}
                      </Typography>
                    </Stack>
                  );
                })}
              </Box>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}