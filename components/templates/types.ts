import { ReactNode } from "react";

/**
 * Semua data yang dibutuhkan oleh sebuah template.
 * Template tidak mengambil data sendiri.
 * Semua data dikirim dari InvitationPage.
 */
export interface TemplateProps {
  // Invitation memiliki field berbeda untuk setiap template.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  invitation: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  guest?: any;

  sections?: Record<string, boolean>;
}

/**
 * Struktur satu template.
 * Semua template wajib memiliki komponen yang sama.
 */
export interface InvitationTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail?: string;

  Cover: (props: TemplateProps) => ReactNode;
Hero: (props: TemplateProps) => ReactNode;
Couple: (props: TemplateProps) => ReactNode;
  Story: (props: TemplateProps) => ReactNode;
  Event: (props: TemplateProps) => ReactNode;
  LiveStream?: (props: TemplateProps) => ReactNode;  
  Gallery: (props: TemplateProps) => ReactNode;
  RSVP: (props: TemplateProps) => ReactNode;
  Gift: (props: TemplateProps) => ReactNode;
  Footer: (props: TemplateProps) => ReactNode;
}