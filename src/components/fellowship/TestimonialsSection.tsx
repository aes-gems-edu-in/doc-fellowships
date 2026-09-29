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
} from "@mui/material";
import masterData from "../../data/masterData.json";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FormatQuoteIcon,
} from "../../utils/iconMap";

export default function TestimonialsSection() {
  const { testimonials, sections } = masterData;
  const [start, setStart] = useState(0);
  const visibleCount = 3;

  const prev = () => setStart((s) => (s - 1 + testimonials.length) % testimonials.length);
  const next = () => setStart((s) => (s + 1) % testimonials.length);

  const visible = Array.from(
    { length: Math.min(visibleCount, testimonials.length) },
    (_, i) => testimonials[(start + i) % testimonials.length]
  );

  return (
    <Box sx={{ py: { xs: 5, md: 7 }, bgcolor: "#FFFFFF" }}>
      <Container maxWidth="lg">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 3.5 }}
        >
          <Typography
            sx={{ fontWeight: 800, color: "#0B1F3A", fontSize: { xs: "1.4rem", md: "1.85rem" } }}
          >
            {sections.testimonials.title}
          </Typography>
          <Stack direction="row" spacing={1}>
            <IconButton
              onClick={prev}
              aria-label="Previous"
              sx={{
                width: 36,
                height: 36,
                border: "1px solid #D7E0EC",
                bgcolor: "#fff",
                borderRadius: "8px",
                "&:hover": { bgcolor: "#F5F9FF" },
              }}
            >
              <ChevronLeftIcon sx={{ fontSize: 20, color: "#0B1F3A" }} />
            </IconButton>
            <IconButton
              onClick={next}
              aria-label="Next"
              sx={{
                width: 36,
                height: 36,
                border: "1px solid #D7E0EC",
                bgcolor: "#fff",
                borderRadius: "8px",
                "&:hover": { bgcolor: "#F5F9FF" },
              }}
            >
              <ChevronRightIcon sx={{ fontSize: 20, color: "#0B1F3A" }} />
            </IconButton>
          </Stack>
        </Stack>

        <Grid container spacing={2.5}>
          {visible.map((item) => (
            <Grid key={`${item.id}-${start}`} size={{ xs: 12, md: 4 }}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: "14px",
                  border: "1px solid #E8EEF5",
                  bgcolor: "#fff",
                  boxShadow: "0 6px 20px rgba(15, 40, 80, 0.05)",
                }}
              >
                <CardContent sx={{ p: 2.75, "&:last-child": { pb: 2.75 } }}>
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Avatar
                      src={item.avatar}
                      alt={item.name}
                      sx={{ width: 56, height: 56, flexShrink: 0, border: "2px solid #E8F1FF" }}
                    />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <FormatQuoteIcon sx={{ color: "#0056D2", fontSize: 26, mb: 0.5 }} />
                      <Typography
                        sx={{
                          color: "#5A6B80",
                          fontWeight: 500,
                          fontSize: 14,
                          lineHeight: 1.6,
                          mb: 1.75,
                        }}
                      >
                        {item.quote}
                      </Typography>
                      <Typography sx={{ fontWeight: 800, color: "#0B1F3A", fontSize: 13.5 }}>
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
