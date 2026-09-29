import { FormEvent, useEffect, useState } from "react";
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

type FormFields = {
  fullName: string;
  phone: string;
  email: string;
  specialty: string;
  city: string;
};

type FormErrors = Partial<Record<keyof FormFields, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_REGEX = /^[a-zA-Z\s.'-]{2,60}$/;
const PHONE_MAX = 10;

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    bgcolor: "#fff",
    borderRadius: "8px",
    fontSize: 14,
    "& fieldset": { borderColor: "#D7E0EC" },
    "&:hover fieldset": { borderColor: "#A8C0E0" },
    "&.Mui-focused fieldset": { borderColor: "#0056D2" },
    "&.Mui-error fieldset": { borderColor: "#E53E3E" },
  },
  "& .MuiInputLabel-root": {
    fontSize: 13,
    color: "#4A5568",
  },
  "& .MuiInputLabel-asterisk": {
    color: "#E53E3E",
  },
  "& .MuiFormHelperText-root": {
    marginLeft: 0,
    fontSize: 12,
  },
};

const emptyForm = (specialty = ""): FormFields => ({
  fullName: "",
  phone: "",
  email: "",
  specialty,
  city: "",
});

export default function LeadFormCard({ defaultSpecialty = "" }: LeadFormCardProps) {
  const { leadForm, specialties } = masterData;
  const [form, setForm] = useState<FormFields>(emptyForm(defaultSpecialty));
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormFields, boolean>>>({});

  useEffect(() => {
    setForm((prev) => ({ ...prev, specialty: defaultSpecialty || prev.specialty }));
  }, [defaultSpecialty]);

  const validateField = (name: keyof FormFields, value: string): string => {
    const trimmed = value.trim();

    switch (name) {
      case "fullName":
        if (!trimmed) return "Full name is required";
        if (!NAME_REGEX.test(trimmed)) return "Enter a valid full name";
        return "";
      case "phone":
        if (!trimmed) return "Mobile number is required";
        if (!/^\d+$/.test(trimmed)) return "Mobile number must contain digits only";
        if (trimmed.length !== PHONE_MAX) return `Mobile number must be ${PHONE_MAX} digits`;
        if (!/^[6-9]/.test(trimmed)) return "Enter a valid Indian mobile number";
        return "";
      case "email":
        if (!trimmed) return "Email address is required";
        if (!EMAIL_REGEX.test(trimmed)) return "Enter a valid email address";
        return "";
      case "specialty":
        if (!trimmed) return "Please select a specialty";
        return "";
      case "city":
        return "";
      default:
        return "";
    }
  };

  const validateAll = (): FormErrors => {
    const next: FormErrors = {};
    (Object.keys(form) as (keyof FormFields)[]).forEach((key) => {
      const message = validateField(key, form[key]);
      if (message) next[key] = message;
    });
    return next;
  };

  const updateField = (name: keyof FormFields, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (name: keyof FormFields) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, form[name]) }));
  };

  const handlePhoneChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, PHONE_MAX);
    updateField("phone", digits);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const nextErrors = validateAll();
    setErrors(nextErrors);
    setTouched({
      fullName: true,
      phone: true,
      email: true,
      specialty: true,
      city: true,
    });

    const messages = Object.values(nextErrors).filter(Boolean);
    if (messages.length > 0) {
      toast.error(messages[0] || "Please fix the form errors.");
      return;
    }

    const specialtyName =
      specialties.find((item) => item.id === form.specialty)?.name || form.specialty;

    const payload = {
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      specialty: specialtyName,
      city: form.city.trim(),
      source: "fellowship-website",
    };

    const scriptUrl = process.env.REACT_APP_APPS_SCRIPT_URL?.trim();

    try {
      if (scriptUrl) {
        // Apps Script web apps need no-cors from browser; sheet still receives the row
        await fetch(scriptUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload),
        });
      } else {
        console.warn(
          "REACT_APP_APPS_SCRIPT_URL missing — lead not sent to Google Sheet."
        );
      }

      toast.success("Thanks! Our team will share program details shortly.");
      setForm(emptyForm(defaultSpecialty));
      setErrors({});
      setTouched({});
    } catch {
      toast.error("Could not save your details. Please try again.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        bgcolor: "#FFFFFF",
        borderRadius: "16px",
        p: { xs: 2.5, md: 3 },
        boxShadow: "0 16px 48px rgba(0, 50, 120, 0.16)",
        border: "1px solid rgba(0, 86, 210, 0.08)",
        width: "100%",
        maxWidth: 450,
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
          whiteSpace: "pre-line",
        }}
      >
        {leadForm.title}
      </Typography>
      <Typography sx={{ color: "#6B7C93", fontSize: 13, lineHeight: 1.5, mb: 2.25 }}>
        {leadForm.subtitle}
      </Typography>

      <Stack spacing={1.75}>
        <TextField
          fullWidth
          required
          size="small"
          label={leadForm.fields.fullName}
          placeholder="Enter your full name"
          value={form.fullName}
          onChange={(e) => updateField("fullName", e.target.value)}
          onBlur={() => handleBlur("fullName")}
          error={Boolean(errors.fullName)}
          helperText={errors.fullName || " "}
          InputLabelProps={{ shrink: true }}
          sx={fieldSx}
        />

        <TextField
          fullWidth
          required
          size="small"
          label={leadForm.fields.phone}
          placeholder="10-digit mobile number"
          value={form.phone}
          onChange={(e) => handlePhoneChange(e.target.value)}
          onBlur={() => handleBlur("phone")}
          error={Boolean(errors.phone)}
          helperText={errors.phone || " "}
          inputProps={{
            inputMode: "numeric",
            maxLength: PHONE_MAX,
            pattern: "[0-9]*",
          }}
          InputLabelProps={{ shrink: true }}
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
          placeholder="name@example.com"
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          error={Boolean(errors.email)}
          helperText={errors.email || " "}
          InputLabelProps={{ shrink: true }}
          sx={fieldSx}
        />

        <TextField
          select
          fullWidth
          required
          size="small"
          label={leadForm.fields.specialty}
          value={form.specialty}
          onChange={(e) => updateField("specialty", e.target.value)}
          onBlur={() => handleBlur("specialty")}
          error={Boolean(errors.specialty)}
          helperText={errors.specialty || " "}
          InputLabelProps={{ shrink: true }}
          SelectProps={{
            displayEmpty: true,
            renderValue: (selected) => {
              if (!selected) {
                return (
                  <Typography component="span" sx={{ color: "#9AA8BC", fontSize: 14 }}>
                    Select specialty
                  </Typography>
                );
              }
              return specialties.find((item) => item.id === selected)?.name || String(selected);
            },
          }}
          sx={fieldSx}
        >
          <MenuItem value="" disabled>
            Select specialty
          </MenuItem>
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
          onChange={(e) => updateField("city", e.target.value)}
          helperText=" "
          InputLabelProps={{ shrink: true }}
          SelectProps={{
            displayEmpty: true,
            renderValue: (selected) => {
              if (!selected) {
                return (
                  <Typography component="span" sx={{ color: "#9AA8BC", fontSize: 14 }}>
                    Select preferred city
                  </Typography>
                );
              }
              return String(selected);
            },
          }}
          sx={fieldSx}
        >
          <MenuItem value="">
            Select preferred city
          </MenuItem>
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
            mt: 0.25,
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
