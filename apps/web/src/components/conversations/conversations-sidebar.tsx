"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePaginatedQuery } from "convex/react";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import { CornerUpLeftIcon } from "lucide-react";
import { useAtomValue } from "jotai";

import { statusFilterAtom } from "@/lib/atoms";
import {
  getCountryFlagUrl,
  getCountryFromTimezone,
  isRouteActive,
} from "@/lib/utils";

import { api } from "@repo/backend/_generated/api";
import { cn } from "@repo/ui/lib/utils";
import { useInfiniteScroll } from "@repo/ui/hooks/use-infinite-scroll";

import { ConversationStatusIcon } from "@repo/ui/components/shared/conversation-status-icon";
import { Logo } from "@repo/ui/components/shared/logo";
import { InfiniteScrollTrigger } from "@repo/ui/components/shared/infinite-scroll-trigger";
import { GeneratedAvatar } from "@repo/ui/components/shared/generated-avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@repo/ui/components/ui/sidebar";
import { Skeleton } from "@repo/ui/components/ui/skeleton";

import { routes } from "../app-sidebar";
import { ConversationsFilter } from "./conversations-filter";

export function ConversationsSidebar() {
  const pathname = usePathname();

  const { openMobile } = useSidebar();

  const statusFilter = useAtomValue(statusFilterAtom);

  const conversations = usePaginatedQuery(
    api.private.conversations.getMany,
    { status: statusFilter === "all" ? undefined : statusFilter },
    { initialNumItems: 10 },
  );

  const {
    topElementRef,
    handleLoadMore,
    canLoadMore,
    isLoadingMore,
    isLoadingFirstPage,
  } = useInfiniteScroll({
    status: conversations.status,
    loadMore: conversations.loadMore,
    loadSize: 10,
  });

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
    >
      <Sidebar
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild size="lg" className="md:h-10">
                <Logo option={openMobile ? "full" : "image-only"} />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarSeparator className="mx-auto" />
        </SidebarHeader>
        <SidebarContent>
          {routes.map((route, index) => (
            <SidebarGroup key={index}>
              <SidebarGroupContent>
                <SidebarMenu>
                  {route.items.map((item) => {
                    const isActive = isRouteActive({
                      pathname,
                      href: item.href,
                    });

                    return (
                      <SidebarMenuItem key={item.label}>
                        <SidebarMenuButton
                          asChild
                          tooltip={{ children: item.label, hidden: false }}
                          className={cn(
                            "hover:scale-[1.02] hover:shadow-sm motion-safe:transition-all motion-safe:duration-300",
                            "hover:bg-linear-to-br/oklch from-sidebar from-5% via-[#7033ff] via-30% to-sidebar hover:text-white hover:text-shadow-black/30 hover:text-shadow-xs dark:via-[#8c5cff]",
                            isActive &&
                              "scale-[1.02] bg-linear-to-br/oklch text-white! shadow-sm text-shadow-black/30 text-shadow-xs",
                          )}
                        >
                          <Link href={item.href} prefetch>
                            <item.icon />
                            {item.label}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarFooter>
          <SidebarSeparator className="mx-auto my-2" />
          <OrganizationSwitcher
            hidePersonal
            skipInvitationScreen
            afterCreateOrganizationUrl="/conversations"
            afterSelectOrganizationUrl="/conversations"
            organizationProfileMode="navigation"
            organizationProfileUrl="/settings"
            appearance={{
              elements: {
                rootBox: "h-12! w-full!",
                avatarBox: "size-8! rounded-lg!",
                organizationSwitcherTrigger: cn(
                  "w-full! justify-start! hover:bg-sidebar-accent!",
                  !openMobile && "p-0! size-8!",
                ),
                organizationSwitcherTriggerIcon: cn(
                  "ml-auto! text-muted-foreground!",
                  !openMobile && "hidden!",
                ),
                organizationPreviewTextContainer: "font-semibold!",
              },
            }}
          />
        </SidebarFooter>
      </Sidebar>

      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="h-10 flex w-full items-center justify-between gap-4 px-2">
                <p className="font-medium text-sm">Inbox</p>
                <ConversationsFilter />
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarSeparator className="mx-auto" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              {isLoadingFirstPage ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-start p-4 gap-2.5 border-b"
                  >
                    <Skeleton className="size-10 rounded-full" />
                    <div className="flex-1 min-w-0">
                      <div className="flex w-full items-center gap-2">
                        <Skeleton className="h-5 w-20" />
                        <Skeleton className="ml-auto h-4 w-16" />
                      </div>
                      <div className="mt-2">
                        <Skeleton className="h-4 w-10/12" />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  {conversations.results.map((conversation) => {
                    const isActive =
                      pathname === `/conversations/${conversation._id}`;

                    const isLastMessageFromOperator =
                      conversation.lastMessage?.message?.role !== "user";

                    const country = getCountryFromTimezone(
                      conversation.contactSession?.metadata?.timezone,
                    );

                    const countryFlagUrl = country?.code
                      ? getCountryFlagUrl(country.code)
                      : undefined;

                    return (
                      <Link
                        href={`/conversations/${conversation._id}`}
                        key={conversation._id}
                        className={cn(
                          "group/item relative flex items-start p-4 gap-2.5 border-b motion-safe:transition-all motion-safe:duration-300 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          isActive &&
                            "bg-sidebar-accent text-sidebar-accent-foreground",
                        )}
                      >
                        <div
                          className={cn(
                            "absolute -translate-y-1/2 top-1/2 left-0 w-1 h-[64%] rounded-r-full bg-primary opacity-0 group-hover/item:opacity-100 transition-opacity",
                            isActive && "opacity-100",
                          )}
                        />
                        <GeneratedAvatar
                          seed={conversation.contactSession._id}
                          size={40}
                          badgeImageUrl={countryFlagUrl}
                          badgeClassName={cn(
                            "group-hover/item:border-sidebar-accent group-hover/item:bg-sidebar-accent",
                            isActive &&
                              "border-sidebar-accent bg-sidebar-accent",
                          )}
                        />
                        <div className="flex-1">
                          <div className="flex w-full items-center gap-2">
                            <span className="truncate font-medium">
                              {conversation.contactSession.name}
                            </span>
                            <span className="ml-auto shrink-0 text-muted-foreground text-xs">
                              {formatDistanceToNow(
                                conversation.contactSession._creationTime,
                                { addSuffix: true },
                              )}
                            </span>
                          </div>
                          <div className="mt-1 flex items-center justify-between gap-2">
                            <div className="flex w-0 grow items-center gap-1">
                              {isLastMessageFromOperator && (
                                <CornerUpLeftIcon className="size-3 shrink-0 text-muted-foreground" />
                              )}
                              <p
                                className={cn(
                                  "line-clamp-1 text-pretty text-xs text-muted-foreground",
                                  !isLastMessageFromOperator &&
                                    "font-semibold text-foreground",
                                )}
                              >
                                {conversation.lastMessage?.text}
                              </p>
                            </div>
                            <ConversationStatusIcon
                              status={conversation.status}
                              className={cn(
                                "scale-80 opacity-80 group-hover/item:opacity-100",
                                isActive && "opacity-100",
                              )}
                            />
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                  <InfiniteScrollTrigger
                    canLoadMore={canLoadMore}
                    isLoadingMore={isLoadingMore}
                    ref={topElementRef}
                    onLoadMore={handleLoadMore}
                  />
                </>
              )}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
        <SidebarRail />
      </Sidebar>
    </Sidebar>
  );
}
