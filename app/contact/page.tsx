import React from "react";
import Button from "@/components/common/Button";

export default function ContactPage() {
  return (
    <div className="max-w-xl mx-auto my-8 p-8 rounded-3xl bg-surface-container-low border border-outline-variant/30 space-y-4">
      <h1 className="font-headline font-bold text-2xl text-on-surface">Contact Intelligence Engineering</h1>
      <p className="text-xs font-mono-data text-outline">
        For institutional API access, custom predictive models, or technical inquiries.
      </p>
      <div className="space-y-3">
        <input type="text" placeholder="Your Name" className="w-full p-3 bg-surface-container-high border border-outline-variant/40 rounded-xl text-xs font-mono-data text-on-surface" />
        <input type="email" placeholder="Your Email" className="w-full p-3 bg-surface-container-high border border-outline-variant/40 rounded-xl text-xs font-mono-data text-on-surface" />
        <textarea rows={4} placeholder="Your Message..." className="w-full p-3 bg-surface-container-high border border-outline-variant/40 rounded-xl text-xs font-mono-data text-on-surface" />
        <Button variant="primary" className="w-full">Submit Inquiry</Button>
      </div>
    </div>
  );
}
