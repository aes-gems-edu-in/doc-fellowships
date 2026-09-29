import { FormEvent, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import masterData from "../../data/masterData.json";
import { ArrowForwardIcon, getIcon } from "../../utils/iconMap";

interface LeadFormCardProps {
  defaultSpecialty?: string;
}

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    bgcolor: "#fff",
    borderRadius: "8px",
    fontSize: 14,
    "& fieldset": { borderColor: "#D7E0EC" },
    "&:hover fieldset": { borderColor: "#A8C0E0" },
    "&.Mui-focused fieldset": { borderColor: "#0056D2" },
  },
  "& .MuiInputLabel-root": {
    fontSize: 13,
    color: "#4A5568",
  },
  "& .MuiInputLabel-asterisk": {
    color: "#E53E3E",
  },
};

export default function LeadFormCard({ defaultSpecialty = "" }: LeadFormCardProps) {
  const { leadForm, specialties } = masterData;
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    specialty: defaultSpecialty,
    city: "",
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!form.fullName.trim() || !form.phone.trim() || !form.email.trim() || !form.specialty) {
      toast.error("Please fill all required fields.");
      return;
    }
    toast.success("Thanks! Our team will share program details shortly.");
    setForm({
      fullName: "",
      phone: "",
      email: "",
      specialty: defaultSpecialty,
      city: "",
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        bgcolor: "#FFFFFF",
        borderRadius: "16px",
        p: { xs: 2.5, md: 3 },
        boxShadow: "0 16px 48px rgba(0, 50, 120, 0.16)",
        border: "1px solid rgba(0, 86, 210, 0.08)",
        width: "100%",
        maxWidth: 420,
      }}
    >
      <Typography
        sx={{
          color: "#0056D2",
          fontWeight: 700,
          fontSize: 11,
          letterSpacing: "0.12em",
          mb: 0.75,
        }}
      >
        {leadForm.eyebrow}
      </Typography>
      <Typography
        sx={{
          fontWeight: 800,
          color: "#0B1F3A",
          fontSize: { xs: 18, md: 20 },
          lineHeight: 1.3,
          mb: 0.75,
        }}
      >
        {leadForm.title}
      </Typography>
      <Typography sx={{ color: "#6B7C93", fontSize: 13, lineHeight: 1.5, mb: 2.25 }}>
        {leadForm.subtitle}
      </Typography>

      <Stack spacing={1.6}>
        <TextField
          fullWidth
          required
          size="small"
          label={leadForm.fields.fullName}
          value={form.fullName}
          onChange={(e) => setForm((s) => ({ ...s, fullName: e.target.value }))}
          sx={fieldSx}
        />
        <TextField
          fullWidth
          required
          size="small"
          label={leadForm.fields.phone}
          value={form.phone}
          onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
          InputProps={{
            startAdornment: (
              <Typography sx={{ mr: 1, color: "#4A5568", fontSize: 14, fontWeight: 600 }}>
                +91
              </Typography>
            ),
          }}
          sx={fieldSx}
        />
        <TextField
          fullWidth
          required
          size="small"
          type="email"
          label={leadForm.fields.email}
          value={form.email}
          onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
          sx={fieldSx}
        />
        <TextField
          select
          fullWidth
          required
          size="small"
          label={leadForm.fields.specialty}
          value={form.specialty}
          onChange={(e) => setForm((s) => ({ ...s, specialty: e.target.value }))}
          sx={fieldSx}
        >
          {specialties.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          fullWidth
          size="small"
          label={leadForm.fields.city}
          value={form.city}
          onChange={(e) => setForm((s) => ({ ...s, city: e.target.value }))}
          sx={fieldSx}
        >
          {leadForm.cities.map((city) => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))}
        </TextField>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          endIcon={<ArrowForwardIcon />}
          sx={{
            mt: 0.5,
            py: 1.35,
            fontSize: 15,
            fontWeight: 700,
            borderRadius: "10px",
            bgcolor: "#0056D2",
            "&:hover": { bgcolor: "#0041A8" },
          }}
        >
          {leadForm.submitLabel}
        </Button>
      </Stack>

      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={1}
        sx={{ mt: 2.25, pt: 2, borderTop: "1px solid #E8EEF5" }}
      >
        {leadForm.trustPoints.map((point) => {
          const Icon = getIcon(point.icon);
          return (
            <Stack key={point.id} alignItems="center" spacing={0.5} sx={{ flex: 1 }}>
              <Icon sx={{ color: "#0056D2", fontSize: 22 }} />
              <Typography
                sx={{
                  color: "#6B7C93",
                  textAlign: "center",
                  lineHeight: 1.2,
                  fontSize: 11,
                  fontWeight: 500,
                }}
              >
                {point.label}
              </Typography>
            </Stack>
          );
        })}
      </Stack>
    </Box>
  );
}
