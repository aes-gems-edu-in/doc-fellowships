import axios from "axios";
import { leadSquaredConfig } from "../config";

const HOST = leadSquaredConfig.host.replace(/\/+$/, "");
const ACCESS_KEY = leadSquaredConfig.accessKey;
const SECRET_KEY = leadSquaredConfig.secretKey;

export type FellowshipLead = {
  fullName: string;
  phone: string;
  email: string;
  specialty: string;
  city: string;
};

type LeadAttribute = {
  Attribute: string;
  Value: string;
};

type LeadCaptureResponse = {
  Status?: string;
  ExceptionMessage?: string;
  Message?: unknown;
};

function asLeadCaptureResponse(data: unknown): LeadCaptureResponse | undefined {
  if (!data) return undefined;

  if (typeof data === "string") {
    try {
      return asLeadCaptureResponse(JSON.parse(data));
    } catch {
      return undefined;
    }
  }

  if (typeof data === "object") return data as LeadCaptureResponse;
  return undefined;
}

function leadSquaredErrorMessage(data: unknown, fallback: string) {
  const body = asLeadCaptureResponse(data);
  const exceptionMessage = body?.ExceptionMessage?.trim();
  if (exceptionMessage) return exceptionMessage;

  if (typeof body?.Message === "string" && body.Message.trim()) {
    return body.Message.trim();
  }

  return fallback;
}

export async function captureLead(lead: FellowshipLead) {
  if (!ACCESS_KEY || !SECRET_KEY) {
    throw new Error("LeadSquared keys are missing.");
  }

  const mobile = lead.phone.startsWith("+") ? lead.phone : `+91${lead.phone}`;

  const body: LeadAttribute[] = [
    { Attribute: "FirstName", Value: lead.fullName.trim() },
    { Attribute: "EmailAddress", Value: lead.email },
    { Attribute: "Mobile", Value: mobile },
    { Attribute: "Specialty", Value: lead.specialty },
    { Attribute: "City", Value: lead.city },
    { Attribute: "Source", Value: "Website" },
  ];

  try {
    const { data } = await axios.post<LeadCaptureResponse>(
      `${HOST}/LeadManagement.svc/Lead.Capture`,
      body,
      {
        params: {
          accessKey: ACCESS_KEY,
          secretKey: SECRET_KEY,
        },
        headers: { "Content-Type": "application/json" },
        timeout: 20000,
        validateStatus: () => true,
      }
    );

    if (data && String(data.Status || "").toLowerCase() === "error") {
      throw new Error(
        leadSquaredErrorMessage(data, "Could not save your details. Please try again.")
      );
    }

    return data;
  } catch (error) {
    if (axios.isAxiosError<LeadCaptureResponse>(error)) {
      throw new Error(
        leadSquaredErrorMessage(
          error.response?.data,
          "Could not save your details. Please try again."
        )
      );
    }

    throw error;
  }
}
