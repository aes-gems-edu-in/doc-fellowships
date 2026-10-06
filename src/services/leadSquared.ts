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
    }
  );

  if (data && String(data.Status || "").toLowerCase() === "error") {
    throw new Error(data.ExceptionMessage || "LeadSquared rejected the lead.");
  }

  return data;
}
