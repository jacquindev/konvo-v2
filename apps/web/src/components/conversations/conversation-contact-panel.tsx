"use client";

import { type ReactNode, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { useSetAtom } from "jotai";
import {
  ClockIcon,
  GlobeIcon,
  type LucideIcon,
  MailIcon,
  MonitorIcon,
  XIcon,
} from "lucide-react";
import Bowser from "bowser";

import { api } from "@repo/backend/_generated/api";
import type { Id } from "@repo/backend/_generated/dataModel";

import { openContactPanelAtom } from "@/lib/atoms";
import { getCountryFlagUrl, getCountryFromTimezone } from "@/lib/utils";

import { GeneratedAvatar } from "@repo/ui/components/shared/generated-avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/ui/accordion";
import { Button } from "@repo/ui/components/ui/button";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@repo/ui/components/ui/item";
import { Separator } from "@repo/ui/components/ui/separator";
import { Spinner } from "@repo/ui/components/ui/spinner";
import { cn } from "@repo/ui/lib/utils";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";

interface ContactInfoItem {
  label: string;
  value: ReactNode;
  className?: string;
}

interface ContactInfoSection {
  id: string;
  icon: LucideIcon;
  title: string;
  items: ContactInfoItem[];
}

export function ConversationContactPanel() {
  const setOpenPanel = useSetAtom(openContactPanelAtom);

  const { conversationId } = useParams<{
    conversationId: Id<"conversations">;
  }>();

  const contactSession = useQuery(
    api.private.contactSessions.getOneByConversationId,
    conversationId ? { conversationId } : "skip"
  );

  const parseUserAgent = useMemo(() => {
    return (userAgent?: string) => {
      if (!userAgent) {
        return { browser: "Unknown", os: "Unknown", device: "Unknown" };
      }
      const browser = Bowser.getParser(userAgent);
      const result = browser.getResult();

      return {
        browser: result.browser.name || "Unknown",
        browserVersion: result.browser.version || "",
        os: result.os.name || "Unknown",
        osVersion: result.os.version || "",
        device: result.platform.type || "desktop",
        deviceVendor: result.platform.vendor || "",
        deviceModel: result.platform.model || "",
      };
    };
  }, []);

  const userAgentInfo = useMemo(
    () => parseUserAgent(contactSession?.metadata?.userAgent),
    [contactSession?.metadata?.userAgent, parseUserAgent]
  );

  const countryInfo = useMemo(() => {
    return getCountryFromTimezone(contactSession?.metadata?.timezone);
  }, [contactSession?.metadata?.timezone]);

  const infoSections = useMemo<ContactInfoSection[]>(() => {
    if (!contactSession?.metadata) return [];

    /* prettier-ignore */
    return [
      {
        id: "device-info",
        icon: MonitorIcon,
        title: "Device Information",
        items: [
          {
            label: "Browser",
            value: userAgentInfo.browser + (userAgentInfo.browserVersion ? ` ${userAgentInfo.browserVersion}` : ""),
          },
          {
            label: "OS",
            value: userAgentInfo.os + (userAgentInfo.osVersion ? ` ${userAgentInfo.osVersion}` : "")
          },
          {
            label: "Device",
            value: userAgentInfo.device + (userAgentInfo.deviceModel ? ` - ${userAgentInfo.deviceModel}` : ""),
            className: "capitalize"
          },
          {
            label: "Screen",
            value: contactSession.metadata.screenResolution
          },
          {
            label: "Viewport",
            value: contactSession.metadata.viewportSize
          },
          {
            label: "Cookies",
            value: contactSession.metadata.cookieEnabled ? "Enabled" : "Disabled"
          }
        ]
      },
      {
        id: "location-info",
        icon: GlobeIcon,
        title: "Location & Language",
        items: [
          ...(countryInfo ? [
            {
              label: "Country",
              value: countryInfo.name
            },
            {
              label: "Language",
              value: contactSession.metadata.language
            },
            {
              label: "Timezone",
              value: contactSession.metadata.timezone
            },
            {
              label: "UTC Offset",
              value: contactSession.metadata.timezoneOffset ? `${-contactSession.metadata.timezoneOffset / 60} hours` : ""
            }
          ] : [])
        ]
      },
      {
        id: "section-detail",
        title: "Section Details",
        icon: ClockIcon,
        items: [
          {
            label: "Session Started",
            value: new Date(contactSession._creationTime).toLocaleString()
          }
        ]
      }
    ]
  }, [
    contactSession?.metadata,
    contactSession?._creationTime,
    userAgentInfo.browser,
    userAgentInfo.browserVersion,
    userAgentInfo.os,
    userAgentInfo.osVersion,
    userAgentInfo.device,
    userAgentInfo.deviceModel,
    countryInfo,
  ]);

  if (contactSession === null) {
    return null;
  }

  if (contactSession === undefined) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center h-full w-full">
        <Spinner className="size-6 shrink-0 text-primary" />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col h-full w-full bg-muted dark:bg-muted/50">
      <Button
        type="button"
        variant="outline"
        size="icon-xs"
        onClick={() => setOpenPanel(false)}
        className="absolute top-2.5 right-2"
      >
        <XIcon />
      </Button>
      <div className="p-2">
        <Item>
          <ItemMedia>
            <GeneratedAvatar
              size={42}
              seed={contactSession._id}
              badgeImageUrl={
                countryInfo?.code
                  ? getCountryFlagUrl(countryInfo.code)
                  : undefined
              }
            />
          </ItemMedia>
          <ItemContent>
            <ItemTitle className="leading-none">
              {contactSession.name}
            </ItemTitle>
            <ItemDescription className="text-sm leading-tight">
              {contactSession.email}
            </ItemDescription>
          </ItemContent>
        </Item>
      </div>
      <div className="flex flex-col flex-1 p-2 w-full gap-4">
        <div className="w-full px-4 flex flex-col gap-4">
          <Button
            asChild
            size="lg"
            className="w-full motion-safe:transition-all motion-safe:duration-300 shadow-xs hover:shadow-sm hover:-translate-y-0.5"
          >
            <Link href={`mailto:${contactSession.email}`}>
              <MailIcon /> Send Email
            </Link>
          </Button>
          <Separator className="mx-auto mt-2" />
        </div>
        <ScrollArea className="max-h-[calc(100dvh-200px)] px-4 -mt-4">
          {contactSession.metadata && (
            <Accordion
              type="multiple"
              defaultValue={["device-info", "location-info", "section-detail"]}
            >
              {infoSections.map((section) => (
                <AccordionItem key={section.id} value={section.id}>
                  <AccordionTrigger className="hover:no-underline text-muted-foreground hover:text-foreground transition">
                    <div className="flex items-center gap-2">
                      <section.icon className="size-4 shrink-0" />
                      <span>{section.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {section.items.map((item) => (
                        <div
                          key={`${section.id}-${item.label}`}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-muted-foreground font-medium">
                            {item.label}
                          </span>
                          <span className={cn(item.className)}>
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
