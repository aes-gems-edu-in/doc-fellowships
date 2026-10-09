import { Box, Container, Grid, Typography } from "@mui/material";
import masterData from "../../data/masterData.json";

export default function CertificatesSection() {
  const { certificates, sections } = masterData;

  if (!certificates?.length) return null;

  return (
    <Box sx={{ py: { xs: 4.5, sm: 5, md: 7, tv: 9 }, bgcolor: "#F7FAFF" }}>
      <Container maxWidth="xl">
        <Typography
          component="h2"
          sx={{
            fontWeight: 800,
            color: "#0B1F3A",
            textAlign: "center",
            mb: { xs: 3, md: 4, tv: 5 },
            fontSize: { xs: "1.3rem", sm: "1.45rem", md: "1.85rem", xl: "2.1rem", tv: "2.35rem" },
            px: { xs: 1, sm: 0 },
          }}
        >
          {sections.certificates.title}
        </Typography>

        <Grid container spacing={{ xs: 2, sm: 2.5, md: 3.5, tv: 4 }} justifyContent="center">
          {certificates.map((item) => (
            <Grid key={item.id} size={{ xs: 12, sm: 6, md: 5, lg: 5 }}>
              <Box
                sx={{
                  bgcolor: "#fff",
                  border: "1px solid #E8EEF5",
                  borderRadius: { xs: "12px", md: "14px" },
                  boxShadow: "0 8px 28px rgba(15, 40, 80, 0.06)",
                  p: { xs: 1.25, sm: 1.5, md: 2 },
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  component="img"
                  src={item.image}
                  alt={item.alt}
                  sx={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    borderRadius: { xs: "6px", md: "8px" },
                    objectFit: "contain",
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
