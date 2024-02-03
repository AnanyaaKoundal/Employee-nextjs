import React from "react"
export const metadata = {
  title: 'New Employee',
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