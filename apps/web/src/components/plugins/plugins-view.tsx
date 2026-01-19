"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BlocksIcon, LinkIcon, SearchIcon } from "lucide-react";

import { cn } from "@repo/ui/lib/utils";

import { Button } from "@repo/ui/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@repo/ui/components/ui/input-group";
import { 
  Item, 
  ItemActions, 
  ItemContent, 
  ItemDescription, 
  ItemMedia, 
  ItemTitle 
} from "@repo/ui/components/ui/item";

import { PageContainer } from "../page-container";
import { PageHeader } from "../page-header";


const plugins = [
  { 
    id: "vapi", 
    title: "Vapi", 
    icon: "/vapi.jpg", 
    iconClassName: "dark:invert", 
    description: "Connect Vapi to power real-time voice and AI interactions." 
  }
]

export function PluginsView() {
  const [query, setQuery] = useState("");

  const filteredPlugins = useMemo(() => {
    if (!query) return plugins;

    return plugins.filter((plugin) => plugin.title.toLowerCase().includes(query.toLowerCase()));
  }, [query])

  return (
    <PageContainer
      header={
        <PageHeader 
          icon={BlocksIcon} 
          title="Plugins" 
          description="Extend your workspace by connecting third-party tools and services."
        />
      }
    >
      <div className="flex items-center justify-end">
        <InputGroup className="max-w-[200px] lg:max-w-[300px]">
          <InputGroupInput 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search plugins..." 
            className="truncate" 
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
        {filteredPlugins?.map((plugin) => (
          <Item key={plugin.title} variant="outline" className="bg-card shadow-sm border hover:border-primary hover:scale-[1.02] motion-safe:transition-all motion-safe:duration-300">
            <ItemMedia className={cn("rounded-md overflow-hidden", plugin.iconClassName)}>
              <Image 
                src={plugin.icon}
                alt={plugin.title}
                width={40}
                height={40}
                className="object-cover object-center"
              />
            </ItemMedia>
            <ItemContent>
              <ItemTitle className="leading-tight">{plugin.title}</ItemTitle>
              <ItemDescription>{plugin.description || "No description provided."}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button type="button" asChild>
                <Link href={`/plugins/${plugin.id}`}>
                  <LinkIcon />
                  Connect
                </Link>
              </Button>
            </ItemActions>
          </Item>
        ))}  

        {filteredPlugins.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No plugins found for “{query}”.
          </div>
        )}
      </div>      
    </PageContainer>
  );
}
