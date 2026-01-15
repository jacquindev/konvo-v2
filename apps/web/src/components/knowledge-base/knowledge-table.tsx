"use client";

import { useState } from "react";
import { usePaginatedQuery } from "convex/react";
import { MoreHorizontalIcon, Trash2Icon } from "lucide-react";

import { api } from "@repo/backend/_generated/api";
import { useInfiniteScroll } from "@repo/ui/hooks/use-infinite-scroll";
import type { PublicFile } from "@repo/backend/lib/convertEntryToPublicFile";

import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table";
import { InfiniteScrollTrigger } from "@repo/ui/components/shared/infinite-scroll-trigger";
import { KnowledgeRemoveModal } from "./knowledge-remove-modal";

export function KnowledgeTable() {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<PublicFile | null>(null);

  const files = usePaginatedQuery(
    api.private.files.list,
    {},
    { initialNumItems: 10 }
  );

  const {
    topElementRef,
    canLoadMore,
    handleLoadMore,
    isLoadingMore,
    isLoadingFirstPage,
  } = useInfiniteScroll({
    status: files.status,
    loadMore: files.loadMore,
    loadSize: 10,
  });

  const handleDelete = (file: PublicFile) => {
    setSelectedFile(file);
    setOpenDeleteModal(true);
  };

  return (
    <>
      <KnowledgeRemoveModal
        open={openDeleteModal}
        onOpenChange={setOpenDeleteModal}
        file={selectedFile}
        onDeleted={() => setSelectedFile(null)}
      />
      <div className="rounded-lg border bg-card shadow-xs overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-primary/10 hover:bg-primary/10">
              {["Name", "Type", "Size"].map((head) => (
                <TableHead key={head} className="px-6 py-4 font-medium">
                  {head}
                </TableHead>
              ))}
              <TableHead className="px-6 py-4 font-medium text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(() => {
              if (isLoadingFirstPage) {
                return (
                  <TableRow>
                    <TableCell
                      className="h-24 text-center text-muted-foreground"
                      colSpan={4}
                    >
                      Loading...
                    </TableCell>
                  </TableRow>
                );
              }

              if (files.results.length === 0) {
                return (
                  <TableRow>
                    <TableCell
                      className="h-24 text-center text-muted-foreground"
                      colSpan={4}
                    >
                      No files found.
                    </TableCell>
                  </TableRow>
                );
              }

              return files.results.map((file) => {
                return (
                  <TableRow key={file.id}>
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-3  font-medium">
                        {file.name}
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <Badge variant="outline" className="uppercase">
                        {file.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-muted-foreground">
                      {file.size}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon-xs"
                          >
                            <MoreHorizontalIcon />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => handleDelete(file)}
                          >
                            <Trash2Icon /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              });
            })()}
          </TableBody>
        </Table>
        {!isLoadingFirstPage && files.results.length > 0 && (
          <div className="border-t">
            <InfiniteScrollTrigger
              canLoadMore={canLoadMore}
              isLoadingMore={isLoadingMore}
              ref={topElementRef}
              onLoadMore={handleLoadMore}
            />
          </div>
        )}
      </div>
    </>
  );
}
