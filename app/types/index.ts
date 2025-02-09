export interface LeadData {
  id: string;
  name: string;
  companyName: string;
  position: string;
  linkedinUrl: string;
  email: string;
  [key: string]: string; // Allow for dynamic fields
}

export interface SavedProfile {
  id: string;
  savedAt: string;
  profile: LeadData;
}