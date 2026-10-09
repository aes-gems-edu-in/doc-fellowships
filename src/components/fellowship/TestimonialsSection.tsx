import { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import masterData from "../../data/masterData.json";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FormatQuoteIcon,
} from "../../utils/iconMap";

export default function TestimonialsSection() {
  const { testimonials, sections } = masterData;
  const prevLabel = sections.common.previous;
  const nextLabel = sections.common.next;
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  const visibleCount = isMd ? 3 : isSm ? 2 : 1;
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  const count = testimonials.length;

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || !count) return undefined;

    const getStep = () => {
      if (!el.children.length) return 0;
      const first = el.children[0] as HTMLElement;
      const styles = window.getComputedStyle(el);
      const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
      return first.offsetWidth + gap;
    };

    const onScroll = () => {
      const step = getStep();
      if (!step) return;
      const index = Math.round(el.scrollLeft / step);
      const maxIndex = Math.max(0, count - visibleCount);
      setActive(Math.max(0, Math.min(index, maxIndex)));
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [count, visibleCount]);

  if (!testimonials.length) return null;

  const getStep = () => {
    const el = scrollerRef.current;
    if (!el || !el.children.length) return 0;
    const first = el.children[0] as HTMLElement;
    const styles = window.getComputedStyle(el);
    const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
    return first.offsetWidth + gap;
  };

  const scrollToIndex = (index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const step = getStep();
    if (!step) return;
    const maxIndex = Math.max(0, count - visibleCount);
    const nextIndex = Math.max(0, Math.min(index, maxIndex));
    el.scrollTo({ left: nextIndex * step, behavior: "smooth" });
    setActive(nextIndex);
    setExpandedIds({});
  };

  const prev = () => scrollToIndex(active - 1);
  const next = () => scrollToIndex(active + 1);

  const toggleExpanded = (id: string) => {
    setExpandedIds((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  const maxDotIndex = Math.max(0, count - visibleCount);

  return (
    <Box sx={{ py: { xs: 4.5, sm: 5, md: 7, tv: 9 }, bgcolor: "#FFFFFF" }}>
      <Container maxWidth="xl">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ mb: { xs: 3, md: 3.5 } }}
        >
          <Typography
            component="h2"
            sx={{
              fontWeight: 800,
              color: "#0B1F3A",
              fontSize: { xs: "1.3rem", sm: "1.45rem", md: "1.85rem", xl: "2.1rem", tv: "2.35rem" },
            }}
          >
            {sections.testimonials.title}
          </Typography>
          <Stack direction="row" spacing={1}>
            <IconButton
              onClick={prev}
              aria-label={prevLabel}
              disabled={active <= 0}
              sx={{
                width: { xs: 34, md: 36, tv: 42 },
                height: { xs: 34, md: 36, tv: 42 },
                border: "1px solid #D7E0EC",
                bgcolor: "#fff",
                borderRadius: "8px",
                "&:hover": { bgcolor: "#F5F9FF" },
              }}
            >
              <ChevronLeftIcon sx={{ fontSize: { xs: 18, md: 20 }, color: "#0B1F3A" }} />
            </IconButton>
            <IconButton
              onClick={next}
              aria-label={nextLabel}
              disabled={active >= maxDotIndex}
              sx={{
                width: { xs: 34, md: 36, tv: 42 },
                height: { xs: 34, md: 36, tv: 42 },
                border: "1px solid #D7E0EC",
                bgcolor: "#fff",
                borderRadius: "8px",
                "&:hover": { bgcolor: "#F5F9FF" },
              }}
            >
              <ChevronRightIcon sx={{ fontSize: { xs: 18, md: 20 }, color: "#0B1F3A" }} />
            </IconButton>
          </Stack>
        </Stack>

        <Box
          ref={scrollerRef}
          sx={{
            display: "flex",
            gap: { xs: 2, md: 2.5 },
            overflowX: "auto",
            overflowY: "hidden",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            overscrollBehaviorX: "contain",
            cursor: "grab",
            pb: 0.5,
            mx: { xs: -0.5, md: 0 },
            px: { xs: 0.5, md: 0 },
            "&:active": { cursor: "grabbing" },
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {testimonials.map((item) => {
            const expanded = Boolean(expandedIds[item.id]);
            return (
              <Box
                key={item.id}
                sx={{
                  flex: {
                    xs: "0 0 100%",
                    sm: "0 0 calc((100% - 16px) / 2)",
                    md: "0 0 calc((100% - 40px) / 3)",
                  },
                  scrollSnapAlign: "start",
                  minWidth: 0,
                }}
              >
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    borderRadius: { xs: "12px", md: "14px" },
                    border: "1px solid #E8EEF5",
                    bgcolor: "#fff",
                    boxShadow: "0 6px 20px rgba(15, 40, 80, 0.05)",
                  }}
                >
                  <CardContent
                    sx={{ p: { xs: 2.25, md: 2.75 }, "&:last-child": { pb: { xs: 2.25, md: 2.75 } } }}
                  >
                    <Stack direction="row" spacing={2} alignItems="flex-start">
                      <Avatar
                        src={item.avatar || undefined}
                        alt={item.name}
                        sx={{
                          width: { xs: 72, md: 88, tv: 100 },
                          height: { xs: 72, md: 88, tv: 100 },
                          flexShrink: 0,
                          border: "2px solid #E8F1FF",
                        }}
                      />
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <FormatQuoteIcon
                          sx={{ color: "#0056D2", fontSize: { xs: 24, md: 26 }, mb: 0.5 }}
                        />
                        <Typography
                          sx={{
                            color: "#5A6B80",
                            fontWeight: 500,
                            fontSize: { xs: 13.5, md: 14, tv: 15 },
                            lineHeight: 1.65,
                            ...(expanded
                              ? {}
                              : {
                                  display: "-webkit-box",
                                  WebkitLineClamp: 3,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                }),
                          }}
                        >
                          {item.quote}
                        </Typography>
                        <Button
                          onClick={() => toggleExpanded(item.id)}
                          sx={{
                            mt: 0.5,
                            mb: 1.25,
                            px: 0,
                            minWidth: 0,
                            textTransform: "none",
                            fontWeight: 700,
                            fontSize: { xs: 12, md: 13 },
                            color: "#0056D2",
                            lineHeight: 1.2,
                            "&:hover": { bgcolor: "transparent", textDecoration: "underline" },
                          }}
                        >
                          {expanded
                            ? sections.testimonials.showLess
                            : sections.testimonials.showMore}
                        </Button>
                        <Typography
                          sx={{
                            fontWeight: 800,
                            color: "#0B1F3A",
                            fontSize: { xs: 13, md: 13.5, tv: 14.5 },
                          }}
                        >
                          {item.name}
                          <Box component="span" sx={{ fontWeight: 500, color: "#6B7C93" }}>
                            , {item.role}
                          </Box>
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Box>
            );
          })}
        </Box>

        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          sx={{ mt: { xs: 2.5, md: 3 } }}
        >
          {Array.from({ length: maxDotIndex + 1 }, (_, index) => {
            const isActive = active === index;
            return (
              <Box
                key={`dot-${index}`}
                component="button"
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => scrollToIndex(index)}
                sx={{
                  p: 0,
                  m: 0,
                  border: "none",
                  cursor: "pointer",
                  width: isActive ? 22 : 8,
                  height: 8,
                  borderRadius: 999,
                  bgcolor: isActive ? "#0056D2" : "#D7E0EC",
                  transition: "width 0.2s ease, background-color 0.2s ease",
                  "&:hover": {
                    bgcolor: isActive ? "#0041A8" : "#C3D0E0",
                  },
                }}
              />
            );
          })}
        </Stack>
      </Container>
    </Box>
  );
}
