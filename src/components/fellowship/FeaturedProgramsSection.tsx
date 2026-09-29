import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import masterData from "../../data/masterData.json";
import {
  ArrowForwardIcon,
  LocationOnOutlinedIcon,
  ScheduleOutlinedIcon,
} from "../../utils/iconMap";
import type { Program } from "../../types/fellowship";

interface FeaturedProgramsSectionProps {
  onLearnMore: (programId: string) => void;
  onViewAll?: () => void;
  programs?: Program[];
  title?: string;
  showViewAll?: boolean;
  viewAllLabel?: string;
}

export default function FeaturedProgramsSection({
  onLearnMore,
  onViewAll,
  programs,
  title,
  showViewAll = true,
  viewAllLabel,
}: FeaturedProgramsSectionProps) {
  const { sections } = masterData;
  const list =
    programs || (masterData.programs.filter((p) => p.featured) as Program[]);

  return (
    <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: "#FFFFFF" }}>
      <Container maxWidth="xl" sx={{ maxWidth: "95%" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 3.5 }}
        >
          <Typography
            sx={{ fontWeight: 800, color: "#0B1F3A", fontSize: { xs: "1.35rem", md: "1.85rem" } }}
          >
            {title || sections.featured.title}
          </Typography>
          {showViewAll && (
            <Link
              component="button"
              underline="none"
              onClick={() => {
                if (onViewAll) {
                  onViewAll();
                  return;
                }
                toast("Coming Soon");
              }}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.5,
                color: "#0056D2",
                fontWeight: 600,
                fontSize: { xs: 13, md: 14.5 },
                cursor: "pointer",
              }}
            >
              {viewAllLabel || `${sections.featured.viewAll} →`}
            </Link>
          )}
        </Stack>

        {list.length === 0 ? (
          <Typography color="text.secondary">No programs found for this speciality.</Typography>
        ) : (
        <Grid container spacing={2.5}>
          {list.map((program) => (
            <Grid key={program.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "14px",
                  overflow: "hidden",
                  border: "1px solid #E8EEF5",
                  boxShadow: "0 6px 22px rgba(15, 40, 80, 0.06)",
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="190"
                    image={program.image}
                    alt={program.title}
                    sx={{ objectFit: "cover" }}
                  />
                  {program.isPopular && (
                    <Chip
                      label="Most Popular"
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        bgcolor: "#0056D2",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: 11,
                        height: 26,
                        borderRadius: "6px",
                      }}
                    />
                  )}
                </Box>
                <CardContent
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    p: 2.5,
                    "&:last-child": { pb: 2.5 },
                  }}
                >
                  <Typography sx={{ fontWeight: 700, color: "#0B1F3A", mb: 1.5, fontSize: 16 }}>
                    {program.title}
                  </Typography>
                  <Stack direction="row" spacing={2} sx={{ mb: 0.75 }}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <ScheduleOutlinedIcon sx={{ fontSize: 15, color: "#6B7C93" }} />
                      <Typography sx={{ fontSize: 13, color: "#6B7C93" }}>
                        {program.duration}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <LocationOnOutlinedIcon sx={{ fontSize: 15, color: "#6B7C93" }} />
                      <Typography sx={{ fontSize: 13, color: "#6B7C93" }}>
                        {program.location}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Typography sx={{ fontSize: 13, color: "#6B7C93", mb: 2.25 }}>
                    Conducted at {program.hospital}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => onLearnMore(program.id)}
                    sx={{
                      mt: "auto",
                      py: 1.15,
                      borderRadius: "8px",
                      fontWeight: 700,
                      bgcolor: "#0056D2",
                      "&:hover": { bgcolor: "#0041A8" },
                    }}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        )}
      </Container>
    </Box>
  );
}
