import { ConvexError, v } from "convex/values";

import { internal } from "../_generated/api";
import { mutation } from "../_generated/server";

export const upsert = mutation({
  args: {
    service: v.union(v.literal("vapi")),
    value: v.any(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (identity === null) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Unauthenticated.",
      });
    }

    const orgId = identity.organization_id as string;

    if (!orgId) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Organization not found.",
      });
    }

    // TODO: Check for subscription

    await ctx.scheduler.runAfter(0, internal.shared.secrets.upsert, {
      service: args.service,
      organizationId: orgId,
      value: args.value,
    });
  },
});
