import React from "react";

import { ConversationLayout } from "@/components/conversations/conversation-layout";

type Props = { children: React.ReactNode };

const Layout = ({ children }: Props) => {
  return <ConversationLayout>{children}</ConversationLayout>;
};

export default Layout;
