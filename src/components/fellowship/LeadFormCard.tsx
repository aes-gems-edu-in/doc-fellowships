import { FormEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import toast from "react-hot-toast";
import masterData from "../../data/masterData.json";
import { sendFellowshipOtp, verifyFellowshipOtp } from "../../services/fellowshipOtp";
import { captureLead } from "../../services/leadSquared";
import { ArrowForwardIcon, getIcon } from "../../utils/iconMap";
import { captureUtmFromUrl, getUtmParams } from "../../utils/utm";

interface LeadFormCardProps {
  defaultSpecialty?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
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
const OTP_MAX = 6;
const OTP_COOLDOWN_SEC = 30;

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

export default function LeadFormCard({
  defaultSpecialty = "",
  eyebrow,
  title,
  subtitle,
}: LeadFormCardProps) {
  const { leadForm, specialties } = masterData;
  const placeholders = leadForm.placeholders;
  const messages = leadForm.messages;
  const [form, setForm] = useState<FormFields>(emptyForm(defaultSpecialty));
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormFields, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [verifiedPhone, setVerifiedPhone] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [cooldownLeft, setCooldownLeft] = useState(0);

  useEffect(() => {
    captureUtmFromUrl();
  }, []);

  useEffect(() => {
    setForm((prev) => ({ ...prev, specialty: defaultSpecialty || prev.specialty }));
  }, [defaultSpecialty]);

  useEffect(() => {
    if (cooldownLeft <= 0) return undefined;
    const timer = window.setInterval(() => {
      setCooldownLeft((seconds) => (seconds <= 1 ? 0 : seconds - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [cooldownLeft]);

  const resetOtpState = () => {
    setOtp("");
    setOtpError("");
    setOtpSent(false);
    setOtpVerified(false);
    setVerifiedPhone("");
    setCooldownLeft(0);
  };

  const validateField = (name: keyof FormFields, value: string): string => {
    const trimmed = value.trim();

    switch (name) {
      case "fullName":
        if (!trimmed) return messages.fullNameRequired;
        if (!NAME_REGEX.test(trimmed)) return messages.fullNameInvalid;
        return "";
      case "phone":
        if (!trimmed) return messages.phoneRequired;
        if (!/^\d+$/.test(trimmed)) return messages.phoneDigitsOnly;
        if (trimmed.length !== PHONE_MAX) return messages.phoneLength;
        if (!/^[6-9]/.test(trimmed)) return messages.phoneInvalid;
        return "";
      case "email":
        if (!trimmed) return messages.emailRequired;
        if (!EMAIL_REGEX.test(trimmed)) return messages.emailInvalid;
        return "";
      case "specialty":
        if (!trimmed) return messages.specialtyRequired;
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
    if (otpVerified || otpSent || verifiedPhone) {
      resetOtpState();
    }
  };

  const handleSendOtp = async () => {
    if (sendingOtp || otpVerified || cooldownLeft > 0) return;

    const phoneError = validateField("phone", form.phone);
    setTouched((prev) => ({ ...prev, phone: true }));
    setErrors((prev) => ({ ...prev, phone: phoneError }));
    if (phoneError) {
      toast.error(phoneError);
      return;
    }

    setSendingOtp(true);
    try {
      await sendFellowshipOtp(form.phone.trim(), leadForm.countryCode);
      setOtpSent(true);
      setOtp("");
      setOtpError("");
      setCooldownLeft(OTP_COOLDOWN_SEC);
      toast.success(messages.otpSent);
    } catch (error) {
      const message = error instanceof Error ? error.message : messages.failure;
      toast.error(message || messages.failure);
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (verifyingOtp || otpVerified) return;

    const phoneError = validateField("phone", form.phone);
    if (phoneError) {
      setTouched((prev) => ({ ...prev, phone: true }));
      setErrors((prev) => ({ ...prev, phone: phoneError }));
      toast.error(phoneError);
      return;
    }

    const trimmedOtp = otp.trim();
    if (!trimmedOtp) {
      setOtpError(messages.otpRequired);
      toast.error(messages.otpRequired);
      return;
    }
    if (!/^\d{4,6}$/.test(trimmedOtp)) {
      setOtpError(messages.otpInvalid);
      toast.error(messages.otpInvalid);
      return;
    }

    setVerifyingOtp(true);
    try {
      await verifyFellowshipOtp(form.phone.trim(), trimmedOtp, leadForm.countryCode);
      setOtpVerified(true);
      setVerifiedPhone(form.phone.trim());
      setOtpError("");
      toast.success(messages.otpVerified);
    } catch (error) {
      const message = error instanceof Error ? error.message : messages.otpInvalid;
      setOtpError(message || messages.otpInvalid);
      toast.error(message || messages.otpInvalid);
    } finally {
      setVerifyingOtp(false);
    }
  };

  const isMobileVerified = otpVerified && verifiedPhone === form.phone.trim();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (submitting) return;

    if (!isMobileVerified) {
      toast.error(messages.otpVerifyRequired);
      return;
    }

    const nextErrors = validateAll();
    setErrors(nextErrors);
    setTouched({
      fullName: true,
      phone: true,
      email: true,
      specialty: true,
      city: true,
    });

    const errorMessages = Object.values(nextErrors).filter(Boolean);
    if (errorMessages.length > 0) {
      toast.error(errorMessages[0] || messages.formErrors);
      return;
    }

    const specialtyName =
      specialties.find((item) => item.id === form.specialty)?.name || form.specialty;

    const utm = getUtmParams();
    const payload = {
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      specialty: specialtyName,
      city: form.city.trim(),
      ...utm,
    };

    setSubmitting(true);

    try {
      await captureLead(payload);
      toast.success(messages.success);
      setForm(emptyForm(defaultSpecialty));
      setErrors({});
      setTouched({});
      resetOtpState();
    } catch (error) {
      const message = error instanceof Error ? error.message : messages.failure;
      toast.error(message || messages.failure);
    } finally {
      setSubmitting(false);
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
        maxWidth: { xs: "100%", sm: 450, tv: 480 },
        "@media (max-height: 700px) and (min-width: 1200px)": {
          p: 2,
        },
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
        {eyebrow || leadForm.eyebrow}
      </Typography>
      <Typography
        sx={{
          fontWeight: 800,
          color: "#0B1F3A",
          fontSize: { xs: 18, md: 20 },
          lineHeight: 1.3,
          mb: 0.75,
          whiteSpace: "pre-line",
          "@media (max-height: 700px) and (min-width: 1200px)": {
            fontSize: 17,
            mb: 0.5,
          },
        }}
      >
        {title || leadForm.title}
      </Typography>
      <Typography
        sx={{
          color: "#6B7C93",
          fontSize: 13,
          lineHeight: 1.5,
          mb: 2.25,
          "@media (max-height: 700px) and (min-width: 1200px)": {
            fontSize: 12,
            mb: 1.25,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          },
        }}
      >
        {subtitle || leadForm.subtitle}
      </Typography>

      <Stack
        spacing={1.75}
        sx={{
          opacity: submitting ? 0.72 : 1,
          pointerEvents: submitting ? "none" : "auto",
          "@media (max-height: 700px) and (min-width: 1200px)": {
            gap: 1.1,
            "& .MuiFormHelperText-root": { minHeight: 14, mt: 0.25 },
          },
        }}
      >
        <TextField
          fullWidth
          required
          size="small"
          label={leadForm.fields.fullName}
          placeholder={placeholders.fullName}
          value={form.fullName}
          onChange={(e) => updateField("fullName", e.target.value)}
          onBlur={() => handleBlur("fullName")}
          error={Boolean(errors.fullName)}
          helperText={errors.fullName || " "}
          InputLabelProps={{ shrink: true }}
          disabled={submitting}
          sx={fieldSx}
        />

        <Stack direction="row" spacing={1} alignItems="flex-start">
          <TextField
            fullWidth
            required
            size="small"
            label={leadForm.fields.phone}
            placeholder={placeholders.phone}
            value={form.phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            onBlur={() => handleBlur("phone")}
            error={Boolean(errors.phone)}
            helperText={
              otpVerified && verifiedPhone === form.phone
                ? leadForm.otpVerifiedLabel
                : errors.phone || " "
            }
            inputProps={{
              inputMode: "numeric",
              maxLength: PHONE_MAX,
              pattern: "[0-9]*",
            }}
            InputLabelProps={{ shrink: true }}
            disabled={submitting || sendingOtp || verifyingOtp}
            InputProps={{
              startAdornment: (
                <Typography sx={{ mr: 1, color: "#4A5568", fontSize: 14, fontWeight: 600 }}>
                  {leadForm.countryCode}
                </Typography>
              ),
            }}
            sx={fieldSx}
          />
          {otpVerified && verifiedPhone === form.phone.trim() ? (
            <Box
              sx={{
                mt: "22px",
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                borderRadius: "50%",
                bgcolor: "rgba(22,163,74,0.1)",
              }}
              aria-label={leadForm.otpVerifiedLabel}
              title={leadForm.otpVerifiedLabel}
            >
              <CheckCircleRoundedIcon sx={{ color: "#16A34A", fontSize: 26 }} />
            </Box>
          ) : (
            <Button
              type="button"
              variant="outlined"
              onClick={handleSendOtp}
              disabled={
                submitting ||
                sendingOtp ||
                verifyingOtp ||
                cooldownLeft > 0 ||
                form.phone.trim().length !== PHONE_MAX
              }
              sx={{
                mt: "22px",
                minWidth: 108,
                height: 40,
                textTransform: "none",
                fontWeight: 700,
                fontSize: 12,
                borderColor: "#0056D2",
                color: "#0056D2",
                whiteSpace: "nowrap",
                "&:hover": { borderColor: "#0041A8", bgcolor: "rgba(0,86,210,0.04)" },
                "&.Mui-disabled": {
                  borderColor: "#C5D0E0",
                  color: "#7A8BA3",
                },
              }}
            >
              {sendingOtp
                ? leadForm.sendingOtpLabel
                : cooldownLeft > 0
                  ? leadForm.resendOtpInLabel.replace("{seconds}", String(cooldownLeft))
                  : otpSent
                    ? leadForm.resendOtpLabel
                    : leadForm.sendOtpLabel}
            </Button>
          )}
        </Stack>

        {otpSent && !otpVerified ? (
          <Stack direction="row" spacing={1} alignItems="flex-start">
            <TextField
              fullWidth
              required
              size="small"
              label={leadForm.fields.otp}
              placeholder={placeholders.otp}
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value.replace(/\D/g, "").slice(0, OTP_MAX));
                setOtpError("");
              }}
              error={Boolean(otpError)}
              helperText={otpError || " "}
              inputProps={{
                inputMode: "numeric",
                maxLength: OTP_MAX,
                pattern: "[0-9]*",
              }}
              InputLabelProps={{ shrink: true }}
              disabled={submitting || verifyingOtp}
              sx={fieldSx}
            />
            <Button
              type="button"
              variant="contained"
              onClick={handleVerifyOtp}
              disabled={submitting || verifyingOtp || otp.length < 4}
              sx={{
                mt: "22px",
                minWidth: 108,
                height: 40,
                textTransform: "none",
                fontWeight: 700,
                fontSize: 12,
                bgcolor: "#0056D2",
                "&:hover": { bgcolor: "#0041A8" },
              }}
            >
              {verifyingOtp ? leadForm.verifyingOtpLabel : leadForm.verifyOtpLabel}
            </Button>
          </Stack>
        ) : null}

        <TextField
          fullWidth
          required
          size="small"
          type="email"
          label={leadForm.fields.email}
          placeholder={placeholders.email}
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          error={Boolean(errors.email)}
          helperText={errors.email || " "}
          InputLabelProps={{ shrink: true }}
          disabled={submitting}
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
          disabled={submitting}
          SelectProps={{
            displayEmpty: true,
            renderValue: (selected) => {
              if (!selected) {
                return (
                  <Typography component="span" sx={{ color: "#9AA8BC", fontSize: 14 }}>
                    {placeholders.specialty}
                  </Typography>
                );
              }
              return specialties.find((item) => item.id === selected)?.name || String(selected);
            },
          }}
          sx={fieldSx}
        >
          <MenuItem value="" disabled>
            {placeholders.specialty}
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
          disabled={submitting}
          SelectProps={{
            displayEmpty: true,
            MenuProps: {
              PaperProps: {
                sx: { maxHeight: 320 },
              },
            },
            renderValue: (selected) => {
              if (!selected) {
                return (
                  <Typography component="span" sx={{ color: "#9AA8BC", fontSize: 14 }}>
                    {placeholders.city}
                  </Typography>
                );
              }
              return String(selected);
            },
          }}
          sx={fieldSx}
        >
          <MenuItem value="">
            {placeholders.city}
          </MenuItem>
          {leadForm.cities.map((city) => (
            <MenuItem
              key={city}
              value={city}
              sx={{ whiteSpace: "normal", lineHeight: 1.35, py: 1 }}
            >
              {city}
            </MenuItem>
          ))}
        </TextField>

        <Button
          type={isMobileVerified ? "submit" : "button"}
          variant="contained"
          fullWidth
          disabled={submitting || !isMobileVerified}
          onClick={() => {
            if (!isMobileVerified) {
              toast.error(messages.otpVerifyRequired);
            }
          }}
          endIcon={
            submitting ? undefined : <ArrowForwardIcon />
          }
          sx={{
            mt: 0.25,
            py: 1.35,
            fontSize: 15,
            fontWeight: 700,
            borderRadius: "10px",
            bgcolor: isMobileVerified ? "#0056D2" : "#A8B7CC",
            color: "#fff",
            boxShadow: "none",
            cursor: isMobileVerified ? "pointer" : "not-allowed",
            "&:hover": {
              bgcolor: isMobileVerified ? "#0041A8" : "#A8B7CC",
              boxShadow: "none",
            },
            "&.Mui-disabled": {
              bgcolor: "#C5D0E0",
              color: "#FFFFFF",
              opacity: 1,
            },
          }}
        >
          {submitting ? (
            <Stack direction="row" spacing={1.25} alignItems="center">
              <CircularProgress size={18} thickness={5} sx={{ color: "#fff" }} />
              <Box component="span">{leadForm.submittingLabel}</Box>
            </Stack>
          ) : (
            leadForm.submitLabel
          )}
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
