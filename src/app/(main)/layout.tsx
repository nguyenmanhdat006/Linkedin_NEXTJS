// src/app/(main)/layout.tsx
import { Navbar } from "@/components/layout/navbar"
import { ReactNode } from "react"

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-linkedin-bg">
      <Navbar />
      
        <div className="max-w-7xl mx-auto px-4">
          {children}
      </div>
    </div>
  )
}