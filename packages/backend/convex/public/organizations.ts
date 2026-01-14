import { v } from "convex/values";

import { action } from "../_generated/server";
import { clerkClient } from "../lib/clerkClient";

export const validate = action({
  args: {
    organizationId: v.string(),
  },
  handler: async (ctx, args) => {
    const organization = await clerkClient.organizations.getOrganization({
      organizationId: args.organizationId,
    });

    if (organization) {
      return { valid: true };
    } else {
      return { valid: false, reason: "Organization not valid." };
    }
  },
});
