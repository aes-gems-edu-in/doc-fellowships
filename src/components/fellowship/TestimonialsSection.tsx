import { useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
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
  const theme = useTheme();
  const isTv = useMediaQuery(theme.breakpoints.up("tv"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  const visibleCount = isTv ? 3 : isMd ? 3 : isSm ? 2 : 1;

  const [start, setStart] = useState(0);

  const prev = () => setStart((s) => (s - 1 + testimonials.length) % testimonials.length);
  const next = () => setStart((s) => (s + 1) % testimonials.length);

  const visible = Array.from(
    { length: Math.min(visibleCount, testimonials.length) },
    (_, i) => testimonials[(start + i) % testimonials.length]
  );

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
              aria-label="Previous"
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
              aria-label="Next"
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

        <Grid container spacing={{ xs: 2, md: 2.5, tv: 3 }}>
          {visible.map((item) => (
            <Grid
              key={`${item.id}-${start}`}
              size={{ xs: 12, sm: 6, md: 4 }}
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
                  sx={{
                    p: { xs: 2, sm: 2.5, md: 2.75, tv: 3.25 },
                    "&:last-child": { pb: { xs: 2, md: 2.75, tv: 3.25 } },
                  }}
                >
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 1.75, sm: 2 }}
                    alignItems={{ xs: "center", sm: "flex-start" }}
                  >
                    <Avatar
                      src={item.avatar}
                      alt={item.name}
                      variant="rounded"
                      sx={{
                        width: { xs: 72, sm: 84, md: 96, tv: 110 },
                        height: { xs: 72, sm: 84, md: 96, tv: 110 },
                        flexShrink: 0,
                        borderRadius: "10px",
                        border: "2px solid #E8F1FF",
                      }}
                    />
                    <Box sx={{ flex: 1, minWidth: 0, textAlign: { xs: "center", sm: "left" } }}>
                      <FormatQuoteIcon
                        sx={{
                          color: "#0056D2",
                          fontSize: { xs: 22, md: 26, tv: 30 },
                          mb: 0.5,
                        }}
                      />
                      <Typography
                        sx={{
                          color: "#5A6B80",
                          fontWeight: 500,
                          fontSize: { xs: 13.5, md: 14, tv: 15.5 },
                          lineHeight: 1.6,
                          mb: 1.75,
                        }}
                      >
                        {item.quote}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 800,
                          color: "#0B1F3A",
                          fontSize: { xs: 13, md: 13.5, tv: 15 },
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
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
