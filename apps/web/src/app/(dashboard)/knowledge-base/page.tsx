import { KnowledgeBaseView } from "@/components/knowledge-base/knowledge-base-view";
import { SubscriptionsProtection } from "@/components/subscriptions/subscriptions-protection";

const Page = () => {
  return (
    <SubscriptionsProtection>
      <KnowledgeBaseView />
    </SubscriptionsProtection>
  );
};

export default Page;
