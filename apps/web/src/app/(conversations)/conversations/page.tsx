"use client";

import { redirect } from "next/navigation";
import { usePaginatedQuery } from "convex/react";

import { api } from "@repo/backend/_generated/api";

import { ConversationsView } from "@/components/conversations/conversations-view";

const Page = () => {
  const conversations = usePaginatedQuery(
    api.private.conversations.getMany,
    { status: undefined },
    { initialNumItems: 2 },
  );

  if (conversations && conversations.results?.length > 0) {
    redirect(`/conversations/${conversations.results[0]?._id}`)
  }

  return <ConversationsView />;
};

export default Page;
