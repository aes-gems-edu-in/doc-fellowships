import api from "./api";

type OtpResponse = {
  success?: boolean;
  message?: string;
  verified?: boolean;
  recordId?: number | string;
};

export async function sendFellowshipOtp(mobile: string, countryCode = "+91") {
  return api.post<OtpResponse>("/new-otp/send", {
    mobile,
    countryCode,
  });
}

export async function verifyFellowshipOtp(
  mobile: string,
  otp: string,
  countryCode = "+91"
) {
  return api.post<OtpResponse>("/new-otp/verify", {
    mobile,
    otp,
    countryCode,
  });
}
