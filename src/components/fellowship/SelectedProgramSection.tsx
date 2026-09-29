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
    <Box sx={{ py: { xs: 4, md: 6 }, bgcolor: "#F7FAFF" }}>
      <Container maxWidth="xl" sx={{ maxWidth: "95%" }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
          sx={{ mb: 3 }}
        >
          <Box>
            <Typography
              sx={{ fontWeight: 800, color: "#0B1F3A", fontSize: { xs: "1.35rem", md: "1.75rem" } }}
            >
              {program.title}
            </Typography>
            <Typography sx={{ color: "#6B7C93", fontSize: 14, mt: 0.5 }}>
              Select another course below or continue with this program.
            </Typography>
          </Box>
          <Button onClick={onClose} sx={{ fontWeight: 700 }}>
            Close details
          </Button>
        </Stack>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
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
                fontSize: 12,
                height: 34,
              }}
            />
          ))}
        </Stack>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Box
              component="img"
              src={program.image}
              alt={program.title}
              sx={{
                width: "100%",
                height: { xs: 200, md: 320 },
                objectFit: "cover",
                borderRadius: 3,
                mb: 2.5,
              }}
            />
            <Box
              sx={{
                bgcolor: "#fff",
                borderRadius: 3,
                p: { xs: 2.25, md: 3 },
                border: "1px solid #E8EEF5",
              }}
            >
              <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <ScheduleOutlinedIcon sx={{ fontSize: 16, color: "#6B7C93" }} />
                  <Typography sx={{ fontSize: 13, color: "#6B7C93" }}>{program.duration}</Typography>
                </Stack>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <LocationOnOutlinedIcon sx={{ fontSize: 16, color: "#6B7C93" }} />
                  <Typography sx={{ fontSize: 13, color: "#6B7C93" }}>
                    {program.location} · {program.hospital}
                  </Typography>
                </Stack>
              </Stack>

              <Typography sx={{ fontWeight: 800, color: "#0B1F3A", mb: 1 }}>
                Program Overview
              </Typography>
              <Typography sx={{ color: "#5A6B80", lineHeight: 1.7, mb: 2, fontSize: 14.5 }}>
                {program.overview}
              </Typography>

              <Divider sx={{ my: 2 }} />
              <Typography sx={{ fontWeight: 700, color: "#0B1F3A", mb: 1 }}>Key Highlights</Typography>
              <List dense disablePadding>
                {program.highlights.map((item) => (
                  <ListItem key={item} disableGutters sx={{ py: 0.35 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircleOutlineIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ my: 2 }} />
              <Typography sx={{ fontWeight: 700, color: "#0B1F3A", mb: 1 }}>Curriculum</Typography>
              <List dense disablePadding>
                {program.curriculum.map((item) => (
                  <ListItem key={item} disableGutters sx={{ py: 0.35 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircleOutlineIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <LeadFormCard key={program.id} defaultSpecialty={program.specialtyId} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
