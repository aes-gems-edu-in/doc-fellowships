import {
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import masterData from "../data/masterData.json";
import LeadFormCard from "../components/fellowship/LeadFormCard";
import FeaturedProgramsSection from "../components/fellowship/FeaturedProgramsSection";
import FooterCtaSection from "../components/fellowship/FooterCtaSection";
import {
  ArrowBackIcon,
  CheckCircleOutlineIcon,
  LocationOnOutlinedIcon,
  ScheduleOutlinedIcon,
} from "../utils/iconMap";
import { scrollToTop } from "../components/LenisSmoothScroll";
import type { Program } from "../types/fellowship";

interface CourseDetailsPageProps {
  specialtyId?: string;
  programId?: string;
  onBack: () => void;
  onLearnMore: (programId: string) => void;
}

export default function CourseDetailsPage({
  specialtyId,
  programId,
  onBack,
  onLearnMore,
}: CourseDetailsPageProps) {
  const { brand, programs, specialties } = masterData;

  const activeSpecialtyId = specialtyId || programs.find((p) => p.id === programId)?.specialtyId;
  const specialtyPrograms = (
    activeSpecialtyId
      ? programs.filter((p) => p.specialtyId === activeSpecialtyId)
      : programs
  ) as Program[];

  const program: Program =
    (programs.find((p) => p.id === programId) as Program | undefined) ||
    specialtyPrograms[0] ||
    (programs[0] as Program);

  const specialty =
    specialties.find((s) => s.id === activeSpecialtyId) ||
    specialties.find((s) => s.id === program.specialtyId);

  const related = programs.filter(
    (p) => p.id !== program.id && p.specialtyId === program.specialtyId
  ) as Program[];

  const specialtyName = specialty?.name || "Fellowship";

  const handleSpecialtyChange = (nextSpecialtyId: string) => {
    const first = programs.find((p) => p.specialtyId === nextSpecialtyId);
    if (first) onLearnMore(first.id);
  };

  return (
    <Box component="main" sx={{ bgcolor: "#FAFBFD", minHeight: "100vh" }}>
      <Box
        sx={{
          bgcolor: "#fff",
          borderBottom: "1px solid #E8EEF5",
          py: { xs: 1.5, md: 2 },
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <Container maxWidth="lg">
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1.25}
              onClick={onBack}
              sx={{ cursor: "pointer" }}
            >
              <Box component="img" src={brand.logo} alt={brand.name} sx={{ width: 32, height: 32 }} />
              <Typography sx={{ fontWeight: 800, fontSize: 13, letterSpacing: "0.06em" }}>
                {brand.name}
              </Typography>
            </Stack>
            <Button startIcon={<ArrowBackIcon />} onClick={onBack} sx={{ fontWeight: 700, fontSize: 13 }}>
              Back to Home
            </Button>
          </Stack>
        </Container>
      </Box>

      <Box
        sx={{
          background: "linear-gradient(135deg, #003E99 0%, #0056D2 100%)",
          color: "#fff",
          py: { xs: 3.5, md: 5, tv: 6 },
        }}
      >
        <Container maxWidth="lg">
          <Breadcrumbs
            sx={{
              mb: 2,
              "& .MuiBreadcrumbs-separator, & a, & p": { color: "rgba(255,255,255,0.8)", fontSize: 13 },
            }}
          >
            <Link component="button" underline="hover" onClick={onBack} sx={{ color: "inherit" }}>
              Home
            </Link>
            <Typography sx={{ color: "#fff" }}>{specialtyName}</Typography>
          </Breadcrumbs>

          {program.isPopular && (
            <Chip
              label="Most Popular"
              size="small"
              sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "#fff", mb: 1.5, fontWeight: 700 }}
            />
          )}

          <Typography
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1.45rem", md: "2.2rem", tv: "2.6rem" },
              mb: 2,
              maxWidth: 760,
              lineHeight: 1.2,
            }}
          >
            {program.title}
          </Typography>

          <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
            <Stack direction="row" spacing={0.75} alignItems="center">
              <ScheduleOutlinedIcon sx={{ fontSize: 20 }} />
              <Typography sx={{ fontSize: { xs: 14, tv: 16 } }}>{program.duration}</Typography>
            </Stack>
            <Stack direction="row" spacing={0.75} alignItems="center">
              <LocationOnOutlinedIcon sx={{ fontSize: 20 }} />
              <Typography sx={{ fontSize: { xs: 14, tv: 16 } }}>
                {program.location} · {program.hospital}
              </Typography>
            </Stack>
          </Stack>

          {/* Course / specialty select */}
          <Box
            sx={{
              bgcolor: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.22)",
              borderRadius: 2,
              p: { xs: 1.5, md: 2 },
              backdropFilter: "blur(6px)",
            }}
          >
            <Typography sx={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", mb: 1.25, opacity: 0.9 }}>
              SELECT COURSE
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              alignItems={{ xs: "stretch", sm: "center" }}
            >
              <TextField
                select
                size="small"
                label="Specialty"
                value={program.specialtyId}
                onChange={(e) => handleSpecialtyChange(e.target.value)}
                sx={{
                  minWidth: { sm: 220 },
                  bgcolor: "#fff",
                  borderRadius: 1,
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                }}
              >
                {specialties.map((s) => (
                  <MenuItem key={s.id} value={s.id}>
                    {s.name}
                  </MenuItem>
                ))}
              </TextField>

              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ flex: 1 }}>
                {specialtyPrograms.map((item) => (
                  <Chip
                    key={item.id}
                    label={item.title.replace(" Fellowship", "").replace("Fellowship in ", "")}
                    onClick={() => onLearnMore(item.id)}
                    clickable
                    sx={{
                      bgcolor: item.id === program.id ? "#fff" : "rgba(255,255,255,0.16)",
                      color: item.id === program.id ? "#0056D2" : "#fff",
                      fontWeight: 700,
                      fontSize: 12,
                      height: 34,
                      "&:hover": {
                        bgcolor: item.id === program.id ? "#F0F6FF" : "rgba(255,255,255,0.28)",
                      },
                    }}
                  />
                ))}
              </Stack>
            </Stack>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 3.5, md: 5, tv: 6 } }}>
        <Grid container spacing={{ xs: 3, md: 4 }}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Box
              component="img"
              src={program.image}
              alt={program.title}
              sx={{
                width: "100%",
                height: { xs: 200, sm: 280, md: 360, tv: 420 },
                objectFit: "cover",
                borderRadius: 3,
                mb: 3,
              }}
            />

            <Box
              sx={{
                bgcolor: "#fff",
                borderRadius: 3,
                p: { xs: 2.25, md: 3.5 },
                mb: 3,
                border: "1px solid #E8EEF5",
              }}
            >
              <Typography sx={{ fontWeight: 800, color: "#0B1F3A", mb: 1.5, fontSize: { xs: 18, md: 22 } }}>
                Program Overview
              </Typography>
              <Typography sx={{ color: "text.secondary", lineHeight: 1.75, mb: 3, fontSize: { xs: 14, tv: 16 } }}>
                {program.overview}
              </Typography>

              <Divider sx={{ my: 2.5 }} />
              <Typography sx={{ fontWeight: 700, color: "#0B1F3A", mb: 1.5, fontSize: 17 }}>
                Key Highlights
              </Typography>
              <List dense disablePadding>
                {program.highlights.map((item) => (
                  <ListItem key={item} disableGutters sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircleOutlineIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ my: 2.5 }} />
              <Typography sx={{ fontWeight: 700, color: "#0B1F3A", mb: 1.5, fontSize: 17 }}>
                Curriculum
              </Typography>
              <List dense disablePadding>
                {program.curriculum.map((item) => (
                  <ListItem key={item} disableGutters sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircleOutlineIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ my: 2.5 }} />
              <Typography sx={{ fontWeight: 700, color: "#0B1F3A", mb: 1.5, fontSize: 17 }}>
                Eligibility
              </Typography>
              <List dense disablePadding>
                {program.eligibility.map((item) => (
                  <ListItem key={item} disableGutters sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircleOutlineIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ my: 2.5 }} />
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Course Fee
                  </Typography>
                  <Typography sx={{ fontWeight: 700, color: "#0B1F3A" }}>{program.fee}</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Stipend
                  </Typography>
                  <Typography sx={{ fontWeight: 700, color: "#0B1F3A" }}>{program.stipend}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ position: { md: "sticky" }, top: { md: 88 } }}>
              <LeadFormCard key={program.id} defaultSpecialty={program.specialtyId} />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {related.length > 0 && (
        <FeaturedProgramsSection
          programs={related.slice(0, 3)}
          title={`More ${specialtyName} Programs`}
          showViewAll={false}
          onLearnMore={onLearnMore}
        />
      )}

      <FooterCtaSection onTalkToExpert={() => scrollToTop(false)} />
    </Box>
  );
}
