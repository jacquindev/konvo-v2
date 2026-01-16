import * as ct from "countries-and-timezones";
import { toast } from "sonner";

export function getCountryFromTimezone(timezone?: string) {
  if (!timezone) return null;

  const timezoneInfo = ct.getTimezone(timezone);

  if (!timezoneInfo?.countries?.length) return null;

  const countryCode = timezoneInfo.countries[0];
  const countryName = ct.getCountry(countryCode as string)?.name;

  return {
    code: countryCode,
    name: countryName || countryCode,
  };
}

export function getCountryFlagUrl(countryCode: string) {
  return `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
}

export function isRouteActive({
  pathname,
  href,
  match = "exact",
  slug,
}: {
  pathname: string;
  href: string;
  match?: "exact" | "dynamic";
  slug?: string;
}) {
  if (match === "exact") {
    return pathname === href;
  }

  if (match === "dynamic") {
    const base = href.replace(`/[${slug}]`, "");
    return pathname.startsWith(`${base}/`) && pathname.split("/").length >= 3;
  }

  return false;
}

export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  } catch {
    toast.error("Failed to copy to clipboard. Please try again");
  }
}
