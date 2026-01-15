import { atomWithStorage } from "jotai/utils";

import type { Doc } from "@repo/backend/_generated/dataModel";
import { CONVERSATION_STATUS_FILTER_KEY } from "./constants";

export const statusFilterAtom = atomWithStorage<
  Doc<"conversations">["status"] | "all"
>(CONVERSATION_STATUS_FILTER_KEY, "all");
