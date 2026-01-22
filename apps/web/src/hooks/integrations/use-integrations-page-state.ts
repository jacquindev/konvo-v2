export function useIntegrationsPageState(organizationId?: string | null) {
  const markIntegrationsOpened = () => {
    if (!organizationId) return;
    localStorage.setItem(`konvo:integrations-opened:${organizationId}`, "true");
  }

  const hasOpenedIntegrations = () => {
    if (!organizationId) return false;
    return (localStorage.getItem(`konvo:integrations-opened:${organizationId}`)) === "true"
  }

  return {
    markIntegrationsOpened,
    hasOpenedIntegrations,
  }
}
