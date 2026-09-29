import { Box, Card, CardContent, Container, Grid, Stack, Typography } from "@mui/material";
import masterData from "../../data/masterData.json";
import { getIcon } from "../../utils/iconMap";

export default function WhyChooseSection() {
  const { whyChoose, sections } = masterData;

  return (
    <Box sx={{ py: { xs: 5, sm: 6, md: 8, tv: 10 }, bgcolor: "#F7FAFF" }}>
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
            {sections.whyChoose.title}
          </Typography>
          {"subtitle" in sections.whyChoose && sections.whyChoose.subtitle && (
            <Typography
              sx={{
                color: "#6B7C93",
                maxWidth: { xs: "100%", sm: 560, tv: 680 },
                mx: "auto",
                fontSize: { xs: 13.5, md: 14.5, tv: 16 },
                px: { xs: 1, sm: 0 },
              }}
            >
              {sections.whyChoose.subtitle}
            </Typography>
          )}
        </Box>

        <Grid container spacing={{ xs: 1.75, sm: 2, md: 2.25, tv: 3 }}>
          {whyChoose.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <Grid key={item.id} size={{ xs: 12, sm: 6, md: 3 }}>
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    borderRadius: { xs: "10px", md: "12px" },
                    bgcolor: "#fff",
                    border: "1px solid #E8EEF5",
                    borderTop: "3px solid #0056D2",
                    boxShadow: "0 4px 18px rgba(15, 40, 80, 0.04)",
                  }}
                >
                  <CardContent
                    sx={{
                      p: { xs: 2.25, md: 2.75, tv: 3.25 },
                      "&:last-child": { pb: { xs: 2.25, md: 2.75, tv: 3.25 } },
                    }}
                  >
                    <Stack spacing={{ xs: 1.25, md: 1.5 }}>
                      <Icon sx={{ color: "#0056D2", fontSize: { xs: 26, md: 30, tv: 36 } }} />
                      <Typography
                        sx={{
                          fontWeight: 700,
                          color: "#0B1F3A",
                          fontSize: { xs: 15, md: 16, tv: 18 },
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#6B7C93",
                          fontSize: { xs: 13, md: 13.5, tv: 15 },
                          lineHeight: 1.65,
                        }}
                      >
                        {item.description}
                      </Typography>
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
