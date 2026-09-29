import { Box, Container, Link, Stack, Typography } from "@mui/material";
import toast from "react-hot-toast";
import masterData from "../../data/masterData.json";
import { ArrowForwardIcon } from "../../utils/iconMap";

export default function PartnersSection() {
  const { partners, sections } = masterData;

  return (
    <Box sx={{ py: { xs: 4.5, sm: 5, md: 6.5, tv: 8 }, bgcolor: "#FFFFFF" }}>
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={{ xs: 1.5, sm: 2 }}
          sx={{ mb: { xs: 3, md: 3.5 } }}
        >
          <Typography
            sx={{
              fontWeight: 800,
              color: "#0B1F3A",
              fontSize: { xs: "1.3rem", sm: "1.45rem", md: "1.85rem", xl: "2.1rem", tv: "2.35rem" },
            }}
          >
            {sections.partners.title}
          </Typography>
          <Link
            component="button"
            underline="none"
            onClick={() => toast("Coming Soon")}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.5,
              color: "#0056D2",
              fontWeight: 600,
              fontSize: { xs: 13, md: 14.5, tv: 16 },
              cursor: "pointer",
              border: "none",
              background: "none",
              p: 0,
              flexShrink: 0,
            }}
          >
            {sections.partners.viewAll} <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </Link>
        </Stack>

        <Box
          id="partners"
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(4, 1fr)",
              lg: "repeat(4, 1fr)",
              xl: "repeat(8, 1fr)",
            },
            gap: { xs: 2, sm: 2.5, md: 3, tv: 3.5 },
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          {partners.map((partner) => (
            <Box
              key={partner.id}
              component="img"
              src={partner.logo}
              alt={partner.name}
              sx={{
                height: { xs: 52, sm: 64, md: 80, tv: 96 },
                width: "100%",
                maxWidth: { xs: 120, sm: 140, md: 150, tv: 170 },
                objectFit: "contain",
                opacity: 0.85,
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
