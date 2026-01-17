import { VapiView } from "@/components/plugins/vapi/vapi-view";
import { SubscriptionsProtection } from "@/components/subscriptions/subscriptions-protection";

const Page = () => {
  return (
    <SubscriptionsProtection>
      <VapiView />
    </SubscriptionsProtection>
  );
};

export default Page;
