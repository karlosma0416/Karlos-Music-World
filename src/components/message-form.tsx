"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { ExternalLinkArrow } from "./external-link-arrow";
import { site } from "@/data/site";

// Public form endpoint, NOT an Outlook password or private API key.
const configuredEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? site.messageEndpoint;
const endpoint = /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(configuredEndpoint)
    ? configuredEndpoint : "";

export function MessageForm({ labels: d }: { labels: Dictionary["message"] }) {
    const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [anonymous, setAnonymous] = useState(false);

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!endpoint || state === "sending") return;
        const form = event.currentTarget;
        const data = new FormData(form);
        if (data.get("_gotcha")) return;
        if (anonymous) {
            data.delete("name");
            data.delete("email");
        }
        setState("sending");
        try {
            const response = await fetch(endpoint, {
                method: "POST", body: data, headers: { Accept: "application/json" },
                signal: AbortSignal.timeout(20000),
            });
            const result = await response.json();
            if (!response.ok || result.ok !== true) throw new Error("Submission not confirmed");
            form.reset();
            setAnonymous(false);
            setState("success");
        } catch {
            setState("error");
        }
    }

    return <section className="message-section" aria-labelledby="message-title">
        <h2 id="message-title">{d.title}</h2>
        {!endpoint && <p className="message-preview" id="message-preview">{d.preview}</p>}
        <form className="message-form" onSubmit={submit} aria-describedby={endpoint ? undefined : "message-preview"}>
            <label className="message-consent">
                <input type="checkbox" name="anonymous" value="yes" checked={anonymous}
                    disabled={state === "sending"}
                    onChange={(event) => setAnonymous(event.target.checked)} />{d.anonymous}
            </label>
            <div className="message-row" hidden={anonymous}>
                <label htmlFor="message-name">{d.name}
                    <input id="message-name" name="name" autoComplete="name" required={!anonymous} disabled={anonymous} maxLength={100} />
                </label>
                <label htmlFor="message-email">{d.email}
                    <input id="message-email" name="email" type="email" autoComplete="email" disabled={anonymous} maxLength={254} />
                </label>
            </div>
            <label htmlFor="message-body">{d.body}
                <textarea id="message-body" name="message" rows={5} required maxLength={5000} />
            </label>
            <div className="message-trap" aria-hidden="true">
                <label htmlFor="message-website">{d.website}</label>
                <input id="message-website" name="_gotcha" tabIndex={-1} autoComplete="off" />
            </div>
            <label className="message-consent"><input type="checkbox" name="consent" value="yes" required />{d.consent}</label>
            <button type="submit" disabled={!endpoint || state === "sending"}>
                {state === "sending" ? d.sending : d.send}<ExternalLinkArrow />
            </button>
            <p className="message-status" role="status" aria-live="polite" aria-atomic="true">
                {state === "success" ? d.success : state === "error" ? d.error : ""}
            </p>
        </form>
    </section>;
}