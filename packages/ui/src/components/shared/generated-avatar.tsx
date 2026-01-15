"use client";

import { useMemo } from "react";
import { createAvatar } from "@dicebear/core";
import { glass } from "@dicebear/collection";

import { cn } from "@repo/ui/lib/utils";

import { Avatar, AvatarImage } from "@repo/ui/components/ui/avatar";
import Image from "next/image";

interface GeneratedAvatarProps {
  seed: string;
  size?: number;
  className?: string;
  badgeClassName?: string;
  imageUrl?: string;
  badgeImageUrl?: string;
}

export function GeneratedAvatar({
  seed,
  size = 32,
  className,
  imageUrl,
  badgeClassName,
  badgeImageUrl,
}: GeneratedAvatarProps) {
  const avatarSrc = useMemo(() => {
    if (imageUrl) return imageUrl;

    const avatar = createAvatar(glass, {
      seed: seed.toLowerCase().trim(),
      size,
    });

    return avatar.toDataUri();
  }, [seed, size, imageUrl]);

  const badgeSize = Math.round(size * 0.5);

  return (
    <div
      className={cn("relative inline-block rounded-full shadow-xs")}
      style={{ width: size, height: size }}
    >
      <Avatar
        className={cn("border", className)}
        style={{ width: size, height: size }}
      >
        <AvatarImage src={avatarSrc} alt="image" />
      </Avatar>
      {badgeImageUrl && (
        <div
          className={cn(
            "shadow-xs absolute right-0 bottom-0 flex items-center justify-center overflow-hidden rounded-full border-[1.5px] border-background bg-background",
            badgeClassName
          )}
          style={{
            width: badgeSize,
            height: badgeSize,
            transform: "translate(15%, 15%)",
          }}
        >
          <Image
            src={badgeImageUrl}
            alt="badge"
            className="h-full w-full object-cover"
            height={badgeSize}
            width={badgeSize}
          />
        </div>
      )}
    </div>
  );
}
