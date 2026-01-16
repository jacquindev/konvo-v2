"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AudioWaveformIcon,
  BlocksIcon,
  DollarSignIcon,
  HomeIcon,
  InboxIcon,
  KeyRoundIcon,
  LibraryBigIcon,
  PaletteIcon,
  ZapIcon,
} from "lucide-react";
import { OrganizationSwitcher } from "@clerk/nextjs";

import { isRouteActive } from "@/lib/utils";
import { cn } from "@repo/ui/lib/utils";

import { Logo } from "@repo/ui/components/shared/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@repo/ui/components/ui/sidebar";

/* prettier-ignore */
export const routes = [
  {
    group: null,
    items: [{ label: "Dashboard", href: "/dashboard", icon: HomeIcon }],
  },
  {
    group: "Main",
    items: [
      { label: "Conversations", href: "/conversations", icon: InboxIcon },
      { label: "Credentials", href: "/credentials", icon: KeyRoundIcon },
      { label: "Knowledge Base", href: "/knowledge-base", icon: LibraryBigIcon },
      { label: "Plugins", href: "/plugins", icon: BlocksIcon },
    ],
  },
  {
    group: "Configuration",
    items: [
      { label: "Integrations", href: "/integrations", icon: ZapIcon },
      { label: "Widget Customization", href: "/customization", icon: PaletteIcon },
      { label: "Voice Assistant", href: "/plugins/vapi", icon: AudioWaveformIcon },
    ],
  },
  {
    group: "Account",
    items: [
      { label: "Plans & Billing", href: "/billing", icon: DollarSignIcon },
    ]
  }
];

export function AppSidebar() {
  const pathname = usePathname();

  const { open, openMobile } = useSidebar();

  const isOpen = open || openMobile;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <Logo
                size={isOpen ? "lg" : "default"}
                option={isOpen ? "full" : "image-only"}
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarSeparator className="mx-auto" />
      </SidebarHeader>

      <SidebarContent>
        {routes.map((route, index) => (
          <SidebarGroup key={index}>
            {route.group !== null && (
              <SidebarGroupLabel>{route.group}</SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {route.items.map((item) => {
                  const isActive = isRouteActive({ pathname, href: item.href });

                  return (
                    <SidebarMenuButton
                      asChild
                      key={item.label}
                      tooltip={item.label}
                      isActive={isActive}
                      className={cn(
                        "hover:scale-[1.02] hover:shadow-sm motion-safe:transition-all motion-safe:duration-300",
                        "hover:bg-linear-to-br/oklch from-sidebar from-5% via-[#7033ff] via-30% to-sidebar hover:text-white hover:text-shadow-black/30 hover:text-shadow-xs dark:via-[#8c5cff]",
                        isActive &&
                          "scale-[1.02] bg-linear-to-br/oklch text-white! shadow-sm text-shadow-black/30 text-shadow-xs"
                      )}
                    >
                      <Link href={item.href} prefetch>
                        <item.icon />
                        {item.label}
                      </Link>
                    </SidebarMenuButton>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarSeparator className="mx-auto" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <OrganizationSwitcher
                hidePersonal
                skipInvitationScreen
                appearance={{
                  elements: {
                    rootBox: "w-full! h-12! group-data-[collapsible=icon]:h-8!",
                    avatarBox: "group-data-[collapsible=icon]:size-6! size-8!",
                    organizationSwitcherTrigger:
                      "motion-safe:transition-all! motion-safe:duration-300! w-full! justify-start! group-data-[collapsible=icon]:size-8! hover:bg-sidebar-accent! group-data-[collapsible=icon]:p-2!",
                    organizationSwitcherTriggerIcon:
                      "group-data-[collapsible=icon]:hidden! ml-auto! text-muted-foreground!",
                    organizationPreview:
                      "group-data-[collapsible=icon]:justify-center! gap-3!",
                    organizationPreviewTextContainer:
                      "group-data-[collapsible=icon]:hidden! font-semibold! text-sidebar-foreground!",
                  },
                }}
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail className="hover:after:bg-transparent" />
    </Sidebar>
  );
}
