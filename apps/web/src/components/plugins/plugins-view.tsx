"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BlocksIcon, ExternalLinkIcon, LinkIcon, SearchIcon } from "lucide-react";

import { cn } from "@repo/ui/lib/utils";

import { Button } from "@repo/ui/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@repo/ui/components/ui/input-group";

import { PageContainer } from "../page-container";
import { PageHeader } from "../page-header";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card";


const plugins = [
  { 
    id: "vapi", 
    title: "Vapi", 
    icon: "/vapi.jpg", 
    iconClassName: "dark:invert", 
    description: "Connect Vapi to power real-time voice and AI interactions.",
    learnMoreUrl: "https://dashboard.vapi.ai"
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

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
        {filteredPlugins?.map((plugin) => (
          <Card key={plugin.title} className="hover:border-primary hover:scale-[1.02] motion-safe:duration-300 motion-safe:transition-all">
            <CardHeader>
              <CardTitle className="text-lg">{plugin.title}</CardTitle>
              <CardDescription>{plugin.description}</CardDescription>
              <CardAction>
                <div className={cn("relative rounded-md overflow-hidden size-10", plugin.iconClassName)}>
                  <Image 
                    src={plugin.icon}
                    alt={plugin.title}
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </CardAction>
            </CardHeader>
            <CardFooter className="w-full flex items-center justify-between">
            <Button type="button" variant="outline" asChild>
                <Link href={plugin.learnMoreUrl} target="_blank">
                  <ExternalLinkIcon /> Learn More
                </Link>
              </Button>
              <Button type="button" asChild>
                <Link href={`/plugins/${plugin.id}`}>
                  <LinkIcon /> Connect
                </Link>
              </Button>
            </CardFooter>
          </Card>
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
