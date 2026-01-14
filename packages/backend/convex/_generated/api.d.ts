/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as lib_clerkClient from "../lib/clerkClient.js";
import type * as lib_constants from "../lib/constants.js";
import type * as public_contactSessions from "../public/contactSessions.js";
import type * as public_conversations from "../public/conversations.js";
import type * as public_organizations from "../public/organizations.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  "lib/clerkClient": typeof lib_clerkClient;
  "lib/constants": typeof lib_constants;
  "public/contactSessions": typeof public_contactSessions;
  "public/conversations": typeof public_conversations;
  "public/organizations": typeof public_organizations;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
