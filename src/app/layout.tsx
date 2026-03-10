import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
    title: "CareerPitch - AI Hiring Process Simulator",
    description:
        "CareerPitch lets students and early-career candidates simulate CV screening, interviews, coding challenges, and a final hiring analysis.",
}

export const viewport = {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="de">
            <body className="antialiased">{children}</body>
        </html>
    )
}
