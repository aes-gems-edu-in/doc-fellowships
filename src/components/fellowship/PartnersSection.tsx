import { Box, Container, Link, Stack, Typography } from "@mui/material";
import toast from "react-hot-toast";
import masterData from "../../data/masterData.json";
import { ArrowForwardIcon } from "../../utils/iconMap";

export default function PartnersSection() {
  const { partners, sections } = masterData;

  return (
    <Box sx={{ py: { xs: 5, md: 6.5 }, bgcolor: "#FFFFFF" }}>
      <Container maxWidth="lg">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 3.5 }}
        >
          <Typography
            sx={{ fontWeight: 800, color: "#0B1F3A", fontSize: { xs: "1.35rem", md: "1.85rem" } }}
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
              fontSize: { xs: 13, md: 14.5 },
              cursor: "pointer",
              border: "none",
              background: "none",
              p: 0,
            }}
          >
            {sections.partners.viewAll} <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </Link>
        </Stack>

        <Stack
          direction="row"
          flexWrap="wrap"
          useFlexGap
          spacing={{ xs: 2, md: 3 }}
          justifyContent="space-between"
          alignItems="center"
          id="partners"
        >
          {partners.map((partner) => (
            <Box
              key={partner.id}
              component="img"
              src={partner.logo}
              alt={partner.name}
              sx={{
                height: 44,
                width: { xs: "42%", sm: 118 },
                objectFit: "contain",
                opacity: 0.85,
              }}
            />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
