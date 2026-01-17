"use client";

import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";
import { UnplugIcon } from "lucide-react";
import { toast } from "sonner";

import { api } from "@repo/backend/_generated/api";

import { ResponsiveDialog } from "@repo/ui/components/shared/responsive-dialog";
import { Button } from "@repo/ui/components/ui/button";
import { useState } from "react";
import { Spinner } from "@repo/ui/components/ui/spinner";

interface VapiDisconnectModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function VapiDisconnectModal({
  open,
  setOpen,
}: VapiDisconnectModalProps) {
  const [isRemoving, setIsRemoving] = useState(false);

  const removePlugin = useMutation(api.private.plugins.remove);

  const handleRemove = async () => {
    setIsRemoving(true);

    try {
      await removePlugin({ service: "vapi" });
      setOpen(false);
      toast.success("Disconnected Vapi.");
    } catch (error) {
      const errorMessage =
        error instanceof ConvexError
          ? (error.data as { message: string }).message
          : "Failed to remove Vapi credentials. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={setOpen}
      title="Disconnect Vapi"
      description="Are you sure you want to disconnect Vapi plugin?"
    >
      <div className="mt-4 flex items-center justify-between gap-4">
        <Button variant="outline" type="button" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          type="button"
          variant="destructive"
          disabled={isRemoving}
          onClick={handleRemove}
        >
          {isRemoving ? (
            <>
              <Spinner /> Diconnecting...
            </>
          ) : (
            <>
              <UnplugIcon />
              Disconnect
            </>
          )}
        </Button>
      </div>
    </ResponsiveDialog>
  );
}
