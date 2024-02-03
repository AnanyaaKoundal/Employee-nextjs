import Navbar from "@/components/navbar/navbar"
import React from "react"
export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  )
}
