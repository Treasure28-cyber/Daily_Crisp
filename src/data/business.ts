export const business = {
  name: "Daily Crisps",
  siteUrl: "https://dailycrisps.ng",
  phoneDisplay: "+234 904 611 6130",
  phoneE164: "+2349046116130",
  whatsappNumber: "2349046116130",
  email: "hello@dailycrisps.ng",
  streetAddress: "No. 36 Inyang Street",
  locality: "Calabar",
  region: "Cross River State",
  country: "NG",
} as const;

export const businessHours = [
  { label: "Monday - Friday", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "11:00", closes: "22:30", display: "11:00 AM - 10:30 PM" },
  { label: "Saturday", days: ["Saturday"], opens: "11:00", closes: "23:00", display: "11:00 AM - 11:00 PM" },
  { label: "Sunday", days: ["Sunday"], opens: "12:30", closes: "22:00", display: "12:30 PM - 10:00 PM" },
] as const;
