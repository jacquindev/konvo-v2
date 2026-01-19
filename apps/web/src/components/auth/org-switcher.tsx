"use client"

import { OrganizationSwitcher } from "@clerk/nextjs";

interface OrgSwitcherProps {
  redirectUrl: string
}

export function OrgSwitcher({ redirectUrl }: OrgSwitcherProps) {
  return (
    <OrganizationSwitcher
      hidePersonal
      skipInvitationScreen
      afterCreateOrganizationUrl={redirectUrl}
      afterSelectOrganizationUrl={redirectUrl}
      organizationProfileMode="navigation"
      organizationProfileUrl="/settings"
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
  )
}
