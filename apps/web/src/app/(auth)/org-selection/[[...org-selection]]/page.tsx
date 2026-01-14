import { OrganizationList } from "@clerk/nextjs";

export default function Page() {
  return (
    <OrganizationList
      hidePersonal
      skipInvitationScreen
      afterCreateOrganizationUrl="/dashboard"
      afterSelectOrganizationUrl="/dashboard"
    />
  );
}
