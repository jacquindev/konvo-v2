"use client";

import { useState } from "react";
import { usePaginatedQuery } from "convex/react";
import {
  FileTextIcon,
  FilterIcon,
  GlobeIcon,
  SearchIcon,
  Trash2Icon,
} from "lucide-react";

import { api } from "@repo/backend/_generated/api";
import { useInfiniteScroll } from "@repo/ui/hooks/use-infinite-scroll";
import type { PublicFile } from "@repo/backend/lib/convertEntryToPublicFile";

import { InfiniteScrollTrigger } from "@repo/ui/components/shared/infinite-scroll-trigger";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@repo/ui/components/ui/input-group";
import { Spinner } from "@repo/ui/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table";

import { KnowledgeRemoveModal } from "./knowledge-remove-modal";

const getSourceStatusBadge = (status: "ready" | "processing" | "error") => {
  switch (status) {
    case "ready":
      return (
        <Badge className="px-1.5 py-1 border border-emerald-500/50 bg-emerald-500/10 text-emerald-500">
          Ready
        </Badge>
      );
    case "processing":
      return (
        <Badge className="px-1.5 py-1 border border-sky-500/50 bg-sky-500/10 text-sky-500">
          <Spinner className="size-4 shrink-0" />
          <span>Processing</span>
        </Badge>
      );
    case "error":
      return (
        <Badge className="px-1.5 py-1 border border-destructive/50 bg-destructive/10 text-destructive">
          Error
        </Badge>
      );
    default:
      return (
        <Badge variant="secondary" className="px-1.5 py-1">
          Unknown
        </Badge>
      );
  }
};

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
      <Card className="p-0 gap-5">
        <CardHeader className="p-4 pb-0">
          <div className="flex items-center flex-row justify-between gap-4">
            <CardTitle className="text-lg">Sources</CardTitle>
            <div className="flex items-center gap-2">
              <InputGroup className="w-[200px] md:w-[300px] text-sm">
                <InputGroupInput placeholder="Search sources..." />
                <InputGroupAddon>
                  <SearchIcon />
                </InputGroupAddon>
              </InputGroup>
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                className="text-muted-foreground hover:text-foreground"
              >
                <FilterIcon />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-primary/10 hover:bg-primary/10">
                {["Name", "Type", "Size", "Status"].map((head) => (
                  <TableHead
                    key={head}
                    className="px-6 py-4 font-medium text-muted-foreground uppercase text-xs"
                  >
                    {head}
                  </TableHead>
                ))}
                {["Actions"].map((head) => (
                  <TableHead
                    key={head}
                    className="px-6 py-4 font-medium text-right text-muted-foreground uppercase text-xs"
                  >
                    {head}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {(() => {
                if (isLoadingFirstPage) {
                  return (
                    <TableRow>
                      <TableCell
                        className="h-24 text-center text-muted-foreground"
                        colSpan={5}
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
                        colSpan={5}
                      >
                        No knowledge sources found.
                      </TableCell>
                    </TableRow>
                  );
                }

                return files.results.map((file) => {
                  return (
                    <TableRow key={file.id}>
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center gap-2 font-medium">
                          {file.type === "web" ? (
                            <GlobeIcon className="size-4 shrink-0 text-muted-foreground" />
                          ) : (
                            <FileTextIcon className="size-4 shrink-0 text-muted-foreground" />
                          )}
                          {file.name}
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-muted-foreground uppercase">
                        {file.type}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-muted-foreground">
                        {file.size}
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        {getSourceStatusBadge(file.status)}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-right">
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon-xs"
                          onClick={() => handleDelete(file)}
                        >
                          <Trash2Icon />
                        </Button>
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
        </CardContent>
      </Card>
    </>
  );
}
