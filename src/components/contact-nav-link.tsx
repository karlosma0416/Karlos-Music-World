"use client";

import { usePathname } from "next/navigation";

export function ContactNavLink({ href, label }: { href: string; label: string }) {
    const pathname = usePathname();
    return (
        <a href={href} aria-current={pathname?.replace(/\/$/, "") === href ? "page" : undefined}>
            {label}
        </a>
    );
}