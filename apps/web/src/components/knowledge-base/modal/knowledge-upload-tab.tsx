"use client";

import { useState } from "react";
import { useAction } from "convex/react";
import { ConvexError } from "convex/values";
import { toast } from "sonner";

import { api } from "@repo/backend/_generated/api";

import { Button } from "@repo/ui/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@repo/ui/components/ui/field";
import { Input } from "@repo/ui/components/ui/input";
import { Spinner } from "@repo/ui/components/ui/spinner";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@repo/ui/components/shared/dropzone";
import { UploadIcon } from "lucide-react";

interface KnowledgeUploadTabProps {
  onOpenChange?: (open: boolean) => void;
  onFileUploaded?: () => void;
}

export function KnowledgeUploadTab({
  onOpenChange,
  onFileUploaded,
}: KnowledgeUploadTabProps) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadForm, setUploadForm] = useState({ category: "", filename: "" });

  const addFile = useAction(api.private.files.addFile);

  const handleFileDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (file) {
      setUploadedFiles([file]);
      if (!uploadForm.filename) {
        setUploadForm((prev) => ({ ...prev, filename: file.name }));
      }
    }
  };

  const handleUpload = async () => {
    setIsUploading(true);

    try {
      const blob = uploadedFiles[0];
      if (!blob) return;

      const filename = uploadForm.filename || blob.name;

      await addFile({
        bytes: await blob.arrayBuffer(),
        filename,
        mimeType: blob.type || "text/plain",
        category: uploadForm.category,
      });
      onFileUploaded?.();

      toast.success("Content added to knowledge base.");
    } catch (error) {
      const errorMessage =
        error instanceof ConvexError
          ? (error.data as { message: string }).message
          : "Failed to add your content to knowledge base. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    onOpenChange?.(false);
    setUploadedFiles([]);
    setUploadForm({ category: "", filename: "" });
  };

  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="category">Category</FieldLabel>
        <Input
          id="category"
          type="text"
          placeholder="e.g., Documentation, Support,..."
          value={uploadForm.category}
          onChange={(e) =>
            setUploadForm((prev) => ({ ...prev, category: e.target.value }))
          }
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="filename">
          File Name{" "}
          <span className="text-xs text-muted-foreground">(optional)</span>
        </FieldLabel>
        <Input
          id="filename"
          type="text"
          placeholder="Override your default filename"
          value={uploadForm.filename}
          onChange={(e) =>
            setUploadForm((prev) => ({ ...prev, filename: e.target.value }))
          }
        />
      </Field>

      <Field>
        <FieldLabel>Choose File</FieldLabel>
        <Dropzone
          accept={{
            "application/pdf": [".pdf"],
            "text/csv": [".csv"],
            "text/plain": [".txt"],
            "image/*": [".jpg", ".jpeg", ".png", ".gif"],
          }}
          maxFiles={1}
          disabled={isUploading}
          src={uploadedFiles}
          onDrop={handleFileDrop}
        >
          <DropzoneEmptyState />
          <DropzoneContent />
        </Dropzone>
      </Field>

      <div className="flex items-center justify-between gap-4">
        <Button
          type="button"
          variant="outline"
          disabled={isUploading}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          type="button"
          disabled={
            isUploading || uploadedFiles.length === 0 || !uploadForm.category
          }
          onClick={handleUpload}
        >
          {isUploading ? (
            <>
              <Spinner /> Uploading...
            </>
          ) : (
            <>
              <UploadIcon /> Upload
            </>
          )}
        </Button>
      </div>
    </FieldGroup>
  );
}
