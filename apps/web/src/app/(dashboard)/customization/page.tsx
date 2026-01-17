import { CustomizationView } from "@/components/customization/customization-view";
import { SubscriptionsProtection } from "@/components/subscriptions/subscriptions-protection";

const Page = () => {
  return (
    <SubscriptionsProtection>
      <CustomizationView />
    </SubscriptionsProtection>
  );
};

export default Page;
