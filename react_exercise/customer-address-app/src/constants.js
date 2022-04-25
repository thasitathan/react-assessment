export const PROVINCES = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Northwest Territories",
  "Nova Scotia",
  "Nunavut",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Yukon",
];

export const EXCLUDED_PROPERTY_PROV = ["Quebec"];

export const EMPLOYMENT_TYPES = ["Employed", "Retired", "Student"];

export const EMPTY_ADDRESS = {
  streetNum: "",
  streetName: "",
  city: "",
  prov: "",
  code: "",
};

export const DATA_MAPPING = [
  { key: "streetNum", label: "Street Number" },
  { key: "streetName", label: "Street Name" },
  { key: "city", label: "City" },
  { key: "prov", label: "Province" },
  { key: "code", label: "Postal Code" },
];
