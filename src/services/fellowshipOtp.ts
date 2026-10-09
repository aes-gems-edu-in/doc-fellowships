import axios, { AxiosError } from "axios";

const STRAPI_URL = (process.env.REACT_APP_STRAPI_URL || "http://localhost:1337/api").replace(
  /\/+$/,
  ""
);

export type OtpApiResponse = {
  success?: boolean;
  code?: string;
  message?: string;
  verified?: boolean;
  recordId?: number | string;
  retryAfter?: number;
  remainingHourAttempts?: number;
  remainingTodayAttempts?: number;
};

export class OtpApiError extends Error {
  code?: string;
  retryAfter?: number;
  status?: number;

  constructor(
    message: string,
    options?: { code?: string; retryAfter?: number; status?: number }
  ) {
    super(message);
    this.name = "OtpApiError";
    this.code = options?.code;
    this.retryAfter = options?.retryAfter;
    this.status = options?.status;
  }
}

async function postOtp(path: string, body: Record<string, string>) {
  try {
    const { data, status } = await axios.post<OtpApiResponse>(
      `${STRAPI_URL}${path}`,
      body,
      {
        headers: { "Content-Type": "application/json" },
        timeout: 20000,
        validateStatus: () => true,
      }
    );

    if (status >= 200 && status < 300 && data?.success !== false) {
      return data;
    }

    throw new OtpApiError(data?.message || "Request failed", {
      code: data?.code,
      retryAfter: data?.retryAfter,
      status,
    });
  } catch (error) {
    if (error instanceof OtpApiError) throw error;

    if (axios.isAxiosError(error)) {
      const ax = error as AxiosError<OtpApiResponse>;
      throw new OtpApiError(
        ax.response?.data?.message || ax.message || "Request failed",
        {
          code: ax.response?.data?.code,
          retryAfter: ax.response?.data?.retryAfter,
          status: ax.response?.status,
        }
      );
    }

    throw new OtpApiError("Request failed");
  }
}

export async function sendFellowshipOtp(mobile: string, countryCode = "+91") {
  return postOtp("/new-otp/send", { mobile, countryCode });
}

export async function verifyFellowshipOtp(
  mobile: string,
  otp: string,
  countryCode = "+91"
) {
  return postOtp("/new-otp/verify", { mobile, otp, countryCode });
}
