import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import LeadFormCard from "./LeadFormCard";
import {
  CheckCircleOutlineIcon,
  LocationOnOutlinedIcon,
  ScheduleOutlinedIcon,
} from "../../utils/iconMap";
import type { Program } from "../../types/fellowship";

type Props = {
  program: Program;
  specialtyPrograms: Program[];
  onSelectProgram: (programId: string) => void;
  onClose: () => void;
};

export default function SelectedProgramSection({
  program,
  specialtyPrograms,
  onSelectProgram,
  onClose,
}: Props) {
  return (
    <Box sx={{ py: { xs: 3.5, sm: 4, md: 6, tv: 8 }, bgcolor: "#F7FAFF" }}>
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
          sx={{ mb: { xs: 2.5, md: 3 } }}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: 800,
                color: "#0B1F3A",
                fontSize: { xs: "1.25rem", sm: "1.4rem", md: "1.75rem", tv: "2.1rem" },
              }}
            >
              {program.title}
            </Typography>
            <Typography sx={{ color: "#6B7C93", fontSize: { xs: 13, md: 14, tv: 15 }, mt: 0.5 }}>
              Select another course below or continue with this program.
            </Typography>
          </Box>
          <Button onClick={onClose} sx={{ fontWeight: 700, fontSize: { xs: 13, tv: 15 } }}>
            Close details
          </Button>
        </Stack>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: { xs: 2.5, md: 3 } }}>
          {specialtyPrograms.map((item) => (
            <Chip
              key={item.id}
              label={item.title}
              onClick={() => onSelectProgram(item.id)}
              clickable
              sx={{
                bgcolor: item.id === program.id ? "#0056D2" : "#fff",
                color: item.id === program.id ? "#fff" : "#0B1F3A",
                border: "1px solid #D7E0EC",
                fontWeight: 700,
                fontSize: { xs: 11, md: 12, tv: 13 },
                height: { xs: 32, md: 34 },
              }}
            />
          ))}
        </Stack>

        <Grid container spacing={{ xs: 2.5, md: 3, tv: 4 }}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <Box
              component="img"
              src={program.image}
              alt={program.title}
              sx={{
                width: "100%",
                height: { xs: 180, sm: 220, md: 280, lg: 320, tv: 380 },
                objectFit: "cover",
                borderRadius: { xs: 2, md: 3 },
                mb: 2.5,
              }}
            />
            <Box
              sx={{
                bgcolor: "#fff",
                borderRadius: { xs: 2, md: 3 },
                p: { xs: 2, sm: 2.25, md: 3, tv: 3.5 },
                border: "1px solid #E8EEF5",
              }}
            >
              <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <ScheduleOutlinedIcon sx={{ fontSize: 16, color: "#6B7C93" }} />
                  <Typography sx={{ fontSize: { xs: 12.5, md: 13, tv: 14 }, color: "#6B7C93" }}>
                    {program.duration}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <LocationOnOutlinedIcon sx={{ fontSize: 16, color: "#6B7C93" }} />
                  <Typography sx={{ fontSize: { xs: 12.5, md: 13, tv: 14 }, color: "#6B7C93" }}>
                    {program.location} · {program.hospital}
                  </Typography>
                </Stack>
              </Stack>

              <Typography
                sx={{ fontWeight: 800, color: "#0B1F3A", mb: 1, fontSize: { xs: 15, tv: 17 } }}
              >
                Program Overview
              </Typography>
              <Typography
                sx={{
                  color: "#5A6B80",
                  lineHeight: 1.7,
                  mb: 2,
                  fontSize: { xs: 13.5, md: 14.5, tv: 16 },
                }}
              >
                {program.overview}
              </Typography>

              <Divider sx={{ my: 2 }} />
              <Typography
                sx={{ fontWeight: 700, color: "#0B1F3A", mb: 1, fontSize: { xs: 14.5, tv: 16 } }}
              >
                Key Highlights
              </Typography>
              <List dense disablePadding>
                {program.highlights.map((item) => (
                  <ListItem key={item} disableGutters sx={{ py: 0.35 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircleOutlineIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={item}
                      primaryTypographyProps={{ fontSize: { xs: 13.5, tv: 15 } }}
                    />
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ my: 2 }} />
              <Typography
                sx={{ fontWeight: 700, color: "#0B1F3A", mb: 1, fontSize: { xs: 14.5, tv: 16 } }}
              >
                Curriculum
              </Typography>
              <List dense disablePadding>
                {program.curriculum.map((item) => (
                  <ListItem key={item} disableGutters sx={{ py: 0.35 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircleOutlineIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={item}
                      primaryTypographyProps={{ fontSize: { xs: 13.5, tv: 15 } }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, lg: 4 }}>
            <Box sx={{ maxWidth: { xs: 480, lg: "none" }, mx: { xs: "auto", lg: 0 } }}>
              <LeadFormCard key={program.id} defaultSpecialty={program.specialtyId} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
