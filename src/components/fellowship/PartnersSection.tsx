import { Box, Container, Stack, Typography } from "@mui/material";
// import toast from "react-hot-toast";
import masterData from "../../data/masterData.json";
// import { ArrowForwardIcon } from "../../utils/iconMap";

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
          {/* <Link
            component="button"
            underline="none"
            onClick={() => toast(sections.partners.comingSoon)}
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
          </Link> */}
        </Stack>

        <Box
          id="partners"
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, minmax(0, 1fr))",
              sm: "repeat(3, minmax(0, 1fr))",
              md: "repeat(5, minmax(0, 1fr))",
            },
            alignItems: "start",
            justifyItems: "center",
            columnGap: { xs: 1.5, sm: 2, md: 2.5, lg: 3, tv: 4 },
            rowGap: { xs: 2.5, sm: 3, md: 3.5, tv: 4 },
            width: "100%",
            m: 0,
            overflow: "visible",
          }}
        >
          {partners.map((partner) => (
            <Box
              key={partner.id}
              sx={{
                m: 0,
                width: "100%",
                maxWidth: { xs: 140, sm: 150, md: 160, lg: 180, tv: 200 },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                px: 0.5,
                py: 0,
                border: "none",
                borderRadius: 0,
                bgcolor: "transparent",
                boxShadow: "none",
                gap: { xs: 0.75, md: 1 },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: { xs: 64, sm: 72, md: 100, lg: 120, tv: 144 },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  component="img"
                  src={partner.logo}
                  alt={partner.name}
                  sx={{
                    height: { xs: 44, sm: 56, md: 80, lg: 100, xl: 110, tv: 120 },
                    width: "auto",
                    maxWidth: "100%",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </Box>
              <Typography
                sx={{
                  color: "#0B1F3A",
                  fontWeight: 700,
                  fontSize: { xs: 12, sm: 13, md: 14, tv: 16 },
                  lineHeight: 1.3,
                  textAlign: "center",
                }}
              >
                {partner.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
