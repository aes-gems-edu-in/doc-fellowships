import { useState } from "react";
import { Box, Collapse, Container, Stack, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import masterData from "../../data/masterData.json";
import type { FaqItem } from "../../types/fellowship";

type Props = {
  items: FaqItem[];
};

export default function FaqSection({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const title = masterData.sections.faqs.title;

  if (!items.length) return null;

  return (
    <Box sx={{ py: { xs: 4.5, sm: 5, md: 7, tv: 9 }, bgcolor: "#FFFFFF" }}>
      <Container maxWidth="xl">
        <Typography
          component="h2"
          sx={{
            fontWeight: 800,
            color: "#0B1F3A",
            fontSize: { xs: "1.3rem", sm: "1.45rem", md: "1.85rem", xl: "2.1rem", tv: "2.35rem" },
            mb: { xs: 2.5, md: 3.5 },
          }}
        >
          {title}
        </Typography>

        <Stack spacing={{ xs: 1.25, md: 1.5 }}>
          {items.map((item, index) => {
            const open = openIndex === index;
            return (
              <Box
                key={item.question}
                sx={{
                  borderRadius: { xs: "14px", md: "16px" },
                  border: open ? "1px solid #B7D0F5" : "1px solid #E8EEF5",
                  bgcolor: open ? "#F5F9FF" : "#fff",
                  boxShadow: open
                    ? "0 10px 28px rgba(0, 86, 210, 0.08)"
                    : "0 4px 16px rgba(15, 40, 80, 0.04)",
                  overflow: "hidden",
                  transition: "border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease",
                }}
              >
                <Box
                  component="button"
                  type="button"
                  onClick={() => setOpenIndex(open ? null : index)}
                  aria-expanded={open}
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: { xs: 1.25, md: 1.75 },
                    textAlign: "left",
                    border: "none",
                    bgcolor: "transparent",
                    cursor: "pointer",
                    px: { xs: 1.5, sm: 2, md: 2.5 },
                    py: { xs: 1.5, md: 2 },
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: 36, md: 42 },
                      height: { xs: 36, md: 42 },
                      borderRadius: "12px",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: open ? "#0056D2" : "#EAF2FF",
                      color: open ? "#fff" : "#0056D2",
                      fontWeight: 800,
                      fontSize: { xs: 13, md: 14 },
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </Box>
                  <Typography
                    sx={{
                      flex: 1,
                      fontWeight: 700,
                      color: "#0B1F3A",
                      fontSize: { xs: 14, md: 16, tv: 17.5 },
                      lineHeight: 1.4,
                    }}
                  >
                    {item.question}
                  </Typography>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: open ? "#0056D2" : "#F3F7FC",
                      color: open ? "#fff" : "#0056D2",
                    }}
                  >
                    {open ? <RemoveRoundedIcon sx={{ fontSize: 18 }} /> : <AddRoundedIcon sx={{ fontSize: 18 }} />}
                  </Box>
                </Box>
                <Collapse in={open}>
                  <Typography
                    sx={{
                      color: "#4A5D73",
                      lineHeight: 1.75,
                      fontSize: { xs: 13.5, md: 15, tv: 16 },
                      px: { xs: 1.5, sm: 2, md: 2.5 },
                      pb: { xs: 2, md: 2.5 },
                      pl: { sm: 9, md: 10.5 },
                    }}
                  >
                    {item.answer}
                  </Typography>
                </Collapse>
              </Box>
            );
          })}
        </Stack>
      </Container>
    </Box>
  );
}
