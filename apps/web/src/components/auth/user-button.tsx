"use client"

import { UserButton as ClerkUserButton } from "@clerk/nextjs"

export function UserButton() {
  return (
    <ClerkUserButton 
      userProfileMode="navigation"
      userProfileUrl="/profile"
      appearance={{
        elements: {
          avatarBox: "size-8 border border-muted shadow-sm"
        }
      }}
    />
  )
}
