"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";
import { toast } from "sonner";

import { api } from "@repo/backend/_generated/api";
import type { PublicFile } from "@repo/backend/lib/convertEntryToPublicFile";

import { Button } from "@repo/ui/components/ui/button";
import { ResponsiveDialog } from "@repo/ui/components/shared/responsive-dialog";
import { Spinner } from "@repo/ui/components/ui/spinner";

interface KnowledgeRemoveModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  file: PublicFile | null;
  onDeleted?: () => void;
}

export function KnowledgeRemoveModal({
  open,
  onOpenChange,
  file,
  onDeleted,
}: KnowledgeRemoveModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteFile = useMutation(api.private.files.deleteFile);

  const handleDelete = async () => {
    if (!file) return;

    setIsDeleting(true);

    try {
      await deleteFile({ entryId: file.id });
      toast.success("File removed successfully!");
      onDeleted?.();
      onOpenChange(false);
    } catch (error) {
      const errorMessage =
        error instanceof ConvexError
          ? (error.data as { message: string }).message
          : "Unable to delete file. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete File"
      description="This action cannot be undone. This will completely remove this file from your data and our servers."
    >
      <div className="mt-4 space-y-6">
        {file && (
          <div className="rounded-lg p-4 border border-border bg-muted dark:bg-muted/60 flex flex-col gap-1">
            <p className="font-medium text-sm">{file.name}</p>
            <p className="text-xs text-muted-foreground">
              Type: {file.type.toUpperCase()} | Size: {file.size}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between gap-4">
          <Button
            type="button"
            variant="outline"
            disabled={isDeleting}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={isDeleting}
            onClick={handleDelete}
          >
            {isDeleting ? (
              <>
                <Spinner /> Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      </div>
    </ResponsiveDialog>
  );
}
