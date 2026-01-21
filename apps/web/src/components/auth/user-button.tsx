"use client"

import { UserButton as ClerkUserButton } from "@clerk/nextjs"

export function UserButton() {
  return (
    <ClerkUserButton 
      userProfileMode="navigation"
      userProfileUrl="/profile"
      appearance={{
        elements: {
          userButtonAvatarBox: "size-9 border border-muted shadow-sm",
          userPreviewAvatarBox: "size-12 border border-muted",
        }
      }}
    />
  )
}
