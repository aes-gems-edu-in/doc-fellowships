import { Box, Card, CardContent, Container, Grid, Stack, Typography } from "@mui/material";
import masterData from "../../data/masterData.json";
import { getIcon } from "../../utils/iconMap";

export default function WhyChooseSection() {
  const { whyChoose, sections } = masterData;

  return (
    <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: "#F7FAFF" }}>
      <Container maxWidth="xl" sx={{ maxWidth: "95%" }}>
        <Box sx={{ textAlign: "center", mb: 4.5 }}>
          <Typography
            sx={{
              fontWeight: 800,
              color: "#0B1F3A",
              mb: 1,
              fontSize: { xs: "1.5rem", md: "1.85rem" },
            }}
          >
            {sections.whyChoose.title}
          </Typography>
          {"subtitle" in sections.whyChoose && sections.whyChoose.subtitle && (
            <Typography sx={{ color: "#6B7C93", maxWidth: 560, mx: "auto", fontSize: 14.5 }}>
              {sections.whyChoose.subtitle}
            </Typography>
          )}
        </Box>

        <Grid container spacing={2.25}>
          {whyChoose.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <Grid key={item.id} size={{ xs: 12, sm: 6, md: 3 }}>
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    borderRadius: "12px",
                    bgcolor: "#fff",
                    border: "1px solid #E8EEF5",
                    borderTop: "3px solid #0056D2",
                    boxShadow: "0 4px 18px rgba(15, 40, 80, 0.04)",
                  }}
                >
                  <CardContent sx={{ p: 2.75, "&:last-child": { pb: 2.75 } }}>
                    <Stack spacing={1.5}>
                      <Icon sx={{ color: "#0056D2", fontSize: 30 }} />
                      <Typography sx={{ fontWeight: 700, color: "#0B1F3A", fontSize: 16 }}>
                        {item.title}
                      </Typography>
                      <Typography sx={{ color: "#6B7C93", fontSize: 13.5, lineHeight: 1.65 }}>
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
