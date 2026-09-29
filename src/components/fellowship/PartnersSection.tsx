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
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignItems: "center",
            justifyContent: "center",
            gap: { xs: 1.25, sm: 1.5, md: 4, lg: 4, tv: 4 },
            m: 0,
            ml: 0,
            overflowX: { xs: "auto", lg: "visible" },
            pb: { xs: 1, lg: 0 },
            WebkitOverflowScrolling: "touch",
            "&::-webkit-scrollbar": { height: 4 },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: "#D7E0EC",
              borderRadius: 2,
            },
          }}
        >
          {partners.map((partner) => (
            <Box
              key={partner.id}
              sx={{
                m: 0,
                ml: 0,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: { xs: 100, sm: 112, md: 128, lg: 140, tv: 156 },
                height: { xs: 64, sm: 72, md: 84, lg: 92, tv: 104 },
                px: 1.25,
                py: 1,
                border: "none",
                borderRadius: "12px",
                bgcolor: "#fff",
                boxShadow: "none",
              }}
            >
              <Box
                component="img"
                src={partner.logo}
                alt={partner.name}
                sx={{
                  height: { xs: 36, sm: 44, md: 52, lg: 70, xl: 80, tv: 90 },
                  width: "auto",
                  maxWidth: "100%",
                  objectFit: "contain",
                  opacity: 0.9,
                  display: "block",
                }}
              />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
