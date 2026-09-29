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
    <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: "#FFFFFF" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 4.5 }}>
          <Typography
            sx={{
              fontWeight: 800,
              color: "#0B1F3A",
              mb: 1,
              fontSize: { xs: "1.5rem", md: "1.85rem" },
            }}
          >
            {sections.specialties.title}
          </Typography>
          <Typography sx={{ color: "#6B7C93", maxWidth: 520, mx: "auto", fontSize: 14.5 }}>
            {sections.specialties.subtitle}
          </Typography>
        </Box>

        <Grid container spacing={2.25}>
          {specialties.map((specialty) => {
            const Icon = getIcon(specialty.icon);
            const active = selectedSpecialtyId === specialty.id;
            return (
              <Grid key={specialty.id} size={{ xs: 12, sm: 6, md: 3 }}>
                <Card
                  elevation={0}
                  onClick={() => onViewPrograms(specialty.id)}
                  sx={{
                    height: "100%",
                    borderRadius: "12px",
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
                  <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
                    <Stack spacing={1.35}>
                      <Icon sx={{ color: "#0056D2", fontSize: 32 }} />
                      <Typography sx={{ fontWeight: 700, color: "#0B1F3A", fontSize: 15.5 }}>
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
                          fontSize: 13.5,
                          cursor: "pointer",
                          alignSelf: "flex-start",
                          "&:hover": { color: "#003E99" },
                        }}
                      >
                        View Programs <ArrowForwardIcon sx={{ fontSize: 15 }} />
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
