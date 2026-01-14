import { PageContainer } from "@/components/page-container";
import { PageHeader } from "@/components/page-header";

const Page = () => {
  return (
    <PageContainer header={<PageHeader title="Dashboard" />}>
      Dashboard page
    </PageContainer>
  );
};

export default Page;
