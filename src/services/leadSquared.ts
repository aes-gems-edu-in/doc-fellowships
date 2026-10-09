import axios from "axios";
import { leadSquaredConfig } from "../config";

const HOST = leadSquaredConfig.host.replace(/\/+$/, "");
const ACCESS_KEY = leadSquaredConfig.accessKey;
const SECRET_KEY = leadSquaredConfig.secretKey;
const ACTIVITY_EVENT = leadSquaredConfig.activityEvent;

export type FellowshipLead = {
  fullName: string;
  phone: string;
  email: string;
  specialty: string;
  city: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
};

type LeadSquaredResponse = {
  Status?: string;
  ExceptionMessage?: string;
  Message?: unknown;
};

type ActivityField = {
  SchemaName: string;
  Value: string;
};

function asLeadSquaredResponse(data: unknown): LeadSquaredResponse | undefined {
  if (!data) return undefined;

  if (typeof data === "string") {
    try {
      return asLeadSquaredResponse(JSON.parse(data));
    } catch {
      return undefined;
    }
  }

  if (typeof data === "object") return data as LeadSquaredResponse;
  return undefined;
}

function leadSquaredErrorMessage(data: unknown, fallback: string) {
  const body = asLeadSquaredResponse(data);
  const exceptionMessage = body?.ExceptionMessage?.trim();
  if (exceptionMessage) return exceptionMessage;

  if (typeof body?.Message === "string" && body.Message.trim()) {
    return body.Message.trim();
  }

  return fallback;
}

function formatUtcDateTime(date = new Date()) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return [
    `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`,
    `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}`,
  ].join(" ");
}

function authParams() {
  return {
    accessKey: ACCESS_KEY,
    secretKey: SECRET_KEY,
  };
}

/**
 * Capture fellowship lead via LeadSquared activity 293
 * using the provided mx_Custom_* activity field schema.
 */
export async function captureLead(lead: FellowshipLead) {
  if (!ACCESS_KEY || !SECRET_KEY) {
    throw new Error("LeadSquared keys are missing.");
  }

  const fullName = lead.fullName.trim();
  const email = lead.email.trim();
  const phoneDigits = lead.phone.trim();
  const mobile = phoneDigits.startsWith("+") ? phoneDigits : `+91${phoneDigits}`;
  const specialty = lead.specialty.trim();
  const location = lead.city.trim();

  const fields: ActivityField[] = [
    { SchemaName: "mx_Custom_1", Value: mobile },
    { SchemaName: "mx_Custom_2", Value: fullName },
    { SchemaName: "mx_Custom_3", Value: email },
    { SchemaName: "mx_Custom_12", Value: specialty },
    { SchemaName: "mx_Custom_5", Value: location },
    { SchemaName: "mx_Custom_6", Value: lead.utm_source?.trim() || "" },
    { SchemaName: "mx_Custom_7", Value: lead.utm_medium?.trim() || "" },
    { SchemaName: "mx_Custom_8", Value: lead.utm_campaign?.trim() || "" },
    { SchemaName: "mx_Custom_9", Value: lead.utm_term?.trim() || "" },
    { SchemaName: "mx_Custom_10", Value: lead.utm_content?.trim() || "" },
  ];

  const body = {
    EmailAddress: email,
    FirstName: fullName,
    Phone: mobile,
    ActivityEvent: ACTIVITY_EVENT,
    ActivityNote: "DocTutorials Fellowship website lead form",
    ActivityDateTime: formatUtcDateTime(),
    Fields: fields,
  };

  try {
    const { data } = await axios.post<LeadSquaredResponse>(
      `${HOST}/ProspectActivity.svc/Create`,
      body,
      {
        params: authParams(),
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
    if (axios.isAxiosError<LeadSquaredResponse>(error)) {
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
