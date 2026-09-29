import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import masterData from "../../data/masterData.json";
import { getIcon, ArrowForwardIcon } from "../../utils/iconMap";

interface SpecialtiesSectionProps {
  onViewPrograms: (specialtyId: string) => void;
  selectedSpecialtyId?: string | null;
}

export default function SpecialtiesSection({
  onViewPrograms,
  selectedSpecialtyId = null,
}: SpecialtiesSectionProps) {
  const { specialties, sections } = masterData;

  return (
    <Box sx={{ py: { xs: 5, sm: 6, md: 8, tv: 10 }, bgcolor: "#FFFFFF" }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: "center", mb: { xs: 3.5, md: 4.5, tv: 5.5 } }}>
          <Typography
            sx={{
              fontWeight: 800,
              color: "#0B1F3A",
              mb: 1,
              fontSize: { xs: "1.35rem", sm: "1.5rem", md: "1.85rem", xl: "2.1rem", tv: "2.4rem" },
            }}
          >
            {sections.specialties.title}
          </Typography>
          <Typography
            sx={{
              color: "#6B7C93",
              maxWidth: { xs: "100%", sm: 520, tv: 640 },
              mx: "auto",
              fontSize: { xs: 13.5, md: 14.5, tv: 16 },
              px: { xs: 1, sm: 0 },
            }}
          >
            {sections.specialties.subtitle}
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 1.75, sm: 2, md: 2.25, tv: 3 }}>
          {specialties.map((specialty) => {
            const Icon = getIcon(specialty.icon);
            const active = selectedSpecialtyId === specialty.id;
            return (
              <Grid key={specialty.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <Card
                  elevation={0}
                  onClick={() => onViewPrograms(specialty.id)}
                  sx={{
                    height: "100%",
                    borderRadius: { xs: "10px", md: "12px" },
                    border: active ? "2px solid #0056D2" : "1px solid #E8EEF5",
                    boxShadow: active
                      ? "0 10px 28px rgba(0, 86, 210, 0.14)"
                      : "0 4px 18px rgba(15, 40, 80, 0.04)",
                    bgcolor: active ? "#F3F8FF" : "#fff",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      borderColor: "#B7D0F5",
                      boxShadow: "0 10px 28px rgba(0, 86, 210, 0.1)",
                      transform: "translateY(-3px)",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      p: { xs: 2, sm: 2.25, md: 2.5, tv: 3 },
                      "&:last-child": { pb: { xs: 2, md: 2.5, tv: 3 } },
                    }}
                  >
                    <Stack spacing={{ xs: 1.1, md: 1.35 }}>
                      <Icon sx={{ color: "#0056D2", fontSize: { xs: 28, md: 32, tv: 38 } }} />
                      <Typography
                        sx={{
                          fontWeight: 700,
                          color: "#0B1F3A",
                          fontSize: { xs: 14.5, md: 15.5, tv: 18 },
                        }}
                      >
                        {specialty.name}
                      </Typography>
                      <Link
                        component="button"
                        underline="none"
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewPrograms(specialty.id);
                        }}
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 0.5,
                          color: "#0056D2",
                          fontWeight: 600,
                          fontSize: { xs: 13, md: 13.5, tv: 15 },
                          cursor: "pointer",
                          alignSelf: "flex-start",
                          "&:hover": { color: "#003E99" },
                        }}
                      >
                        View Programs <ArrowForwardIcon sx={{ fontSize: { xs: 14, md: 15 } }} />
                      </Link>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
