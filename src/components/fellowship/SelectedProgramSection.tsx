import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import masterData from "../../data/masterData.json";
import { CheckCircleOutlineIcon } from "../../utils/iconMap";
import type { Program } from "../../types/fellowship";

type Props = {
  program: Program;
};

function SectionLabel({ children }: { children: string }) {
  return (
    <Typography
      sx={{
        fontWeight: 800,
        color: "#0B1F3A",
        mb: { xs: 1.5, md: 2 },
        fontSize: { xs: 16, md: 18, tv: 20 },
      }}
    >
      {children}
    </Typography>
  );
}

function InfoCards({ items }: { items: string[] }) {
  return (
    <Grid container spacing={{ xs: 1.25, md: 1.75 }}>
      {items.map((item, index) => (
        <Grid key={item} size={{ xs: 12, sm: 6 }}>
          <Stack
            direction="row"
            spacing={1.25}
            alignItems="flex-start"
            sx={{
              height: "100%",
              p: { xs: 1.5, md: 2 },
              borderRadius: "14px",
              bgcolor: "#F7FAFF",
              border: "1px solid #E3EDF8",
            }}
          >
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: "8px",
                flexShrink: 0,
                bgcolor: "#E7F0FF",
                color: "#0056D2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: 12,
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </Box>
            <Typography sx={{ color: "#3D4F66", fontSize: { xs: 13.5, md: 14.5, tv: 16 }, lineHeight: 1.6 }}>
              {item}
            </Typography>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
}

export default function SelectedProgramSection({ program }: Props) {
  const labels = masterData.sections.selectedProgram;
  const facts = [
    program.duration ? { label: labels.duration, value: program.duration } : null,
    program.department ? { label: labels.department, value: program.department } : null,
    program.eligibilityLabel ? { label: labels.eligibility, value: program.eligibilityLabel } : null,
  ].filter((item): item is { label: string; value: string } => Boolean(item));

  return (
    <Box id="selected-program" sx={{ py: { xs: 4.5, sm: 5, md: 7, tv: 9 }, bgcolor: "#F7FAFF" }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            bgcolor: "#fff",
            borderRadius: { xs: 2, md: 3 },
            p: { xs: 2.25, sm: 3, md: 4, tv: 5 },
            border: "1px solid #E8EEF5",
            boxShadow: "0 10px 32px rgba(15, 40, 80, 0.04)",
          }}
        >
          <Typography
            component="h2"
            sx={{
              fontWeight: 800,
              color: "#0B1F3A",
              fontSize: { xs: "1.35rem", sm: "1.5rem", md: "1.85rem", tv: "2.2rem" },
              lineHeight: 1.25,
              mb: 2,
            }}
          >
            {program.title}
          </Typography>

          <Grid container spacing={{ xs: 1.25, md: 1.5 }} sx={{ mb: 2.5 }}>
            {facts.map((fact) => (
              <Grid key={fact.label} size={{ xs: 12, sm: 4 }}>
                <Box
                  sx={{
                    height: "100%",
                    px: { xs: 1.5, md: 2 },
                    py: { xs: 1.25, md: 1.5 },
                    borderRadius: "12px",
                    bgcolor: "#F4F8FF",
                    border: "1px solid #E3EDF8",
                  }}
                >
                  <Typography sx={{ color: "#6B7C93", fontSize: 12, fontWeight: 700, letterSpacing: "0.04em" }}>
                    {fact.label.toUpperCase()}
                  </Typography>
                  <Typography sx={{ color: "#0B1F3A", fontWeight: 800, fontSize: { xs: 14, md: 15.5 }, mt: 0.35 }}>
                    {fact.value}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          {program.hospital ? (
            <Typography sx={{ color: "#5A6B80", fontSize: { xs: 13.5, md: 14.5 }, mb: 2.5 }}>
              {labels.trainingPrefix} {program.hospital}
              {program.location ? `, ${program.location}` : ""}
            </Typography>
          ) : null}

          <SectionLabel>{labels.description}</SectionLabel>
          <Typography
            sx={{ color: "#5A6B80", lineHeight: 1.75, mb: 3, fontSize: { xs: 13.5, md: 15, tv: 16.5 } }}
          >
            {program.overview}
          </Typography>

          <SectionLabel>{labels.highlights}</SectionLabel>
          <Grid container spacing={{ xs: 1.25, md: 1.75 }} sx={{ mb: 3 }}>
            {program.highlights.map((item) => (
              <Grid key={item} size={{ xs: 12, sm: 6, md: 3 }}>
                <Stack
                  spacing={1.25}
                  sx={{
                    height: "100%",
                    p: { xs: 1.75, md: 2 },
                    borderRadius: "16px",
                    background: "linear-gradient(180deg, #F5F9FF 0%, #FFFFFF 100%)",
                    border: "1px solid #D7E6F8",
                  }}
                >
                  <CheckCircleOutlineIcon sx={{ color: "#0056D2", fontSize: 22 }} />
                  <Typography sx={{ fontWeight: 700, color: "#0B1F3A", fontSize: { xs: 14, md: 15 }, lineHeight: 1.45 }}>
                    {item}
                  </Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>

          <SectionLabel>{labels.curriculum}</SectionLabel>
          <Box sx={{ mb: 3 }}>
            <InfoCards items={program.curriculum} />
          </Box>

          {program.outcomes && program.outcomes.length > 0 ? (
            <>
              <SectionLabel>{labels.outcomes}</SectionLabel>
              <Typography sx={{ color: "#5A6B80", mb: 1.5, fontSize: { xs: 13.5, md: 15, tv: 16 } }}>
                {labels.outcomesIntro}
              </Typography>
              <InfoCards items={program.outcomes} />
            </>
          ) : null}
        </Box>
      </Container>
    </Box>
  );
}
