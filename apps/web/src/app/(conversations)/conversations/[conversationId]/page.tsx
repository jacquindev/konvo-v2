import type { Id } from "@repo/backend/_generated/dataModel";

import { ConversationView } from "@/components/conversations/conversation-view";

type Props = {
  params: Promise<{ conversationId: string }>;
};

const Page = async ({ params }: Props) => {
  const { conversationId } = await params;

  return (
    <ConversationView conversationId={conversationId as Id<"conversations">} />
  );
};

export default Page;
