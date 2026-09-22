import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, Menu, ShieldAlert, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { APP_NAME, APP_SUBTITLE, navigation, prototypeLabels } from "@/lib/dr-assist/config";

function Brand() {
  return <Link to="/" className="flex items-center gap-3" aria-label="DR-Assist dashboard"><span className="grid size-9 place-items-center rounded-md border border-primary/30 bg-primary/15 text-sm font-bold text-primary">DR</span><span><strong className="block text-sm tracking-wide text-foreground">{APP_NAME}</strong><span className="block text-[10px] text-muted-foreground">{APP_SUBTITLE}</span></span></Link>;
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  return <div className="min-h-screen bg-background text-foreground">
    {open && <button className="fixed inset-0 z-30 bg-overlay lg:hidden" aria-label="Close navigation" onClick={() => setOpen(false)} />}
    <aside className={cn("fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-border bg-sidebar transition-transform lg:translate-x-0", open ? "translate-x-0" : "-translate-x-full")}>
      <div className="flex h-20 items-center justify-between border-b border-border px-5"><Brand/><Button variant="ghost" size="icon" className="lg:hidden" aria-label="Close navigation" onClick={() => setOpen(false)}><X/></Button></div>
      <div className="px-4 pt-5"><span className="inline-flex items-center gap-2 rounded-sm border border-warning/25 bg-warning/10 px-2.5 py-1 text-[10px] font-semibold text-warning"><span className="size-1.5 rounded-full bg-warning" />{prototypeLabels.mode}</span></div>
      <nav className="mt-5 flex-1 space-y-1 px-3" aria-label="Main navigation">{navigation.map(({ label, to, icon: Icon }) => { const active = to === "/" ? path === "/" : path.startsWith(to); return <Link key={to} to={to} onClick={() => setOpen(false)} className={cn("flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors", active ? "bg-primary/12 text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground")}><Icon className="size-4" />{label}{active && <span className="ml-auto h-4 w-0.5 rounded-full bg-primary" />}</Link>; })}</nav>
      <div className="m-4 border-t border-border pt-4"><div className="flex items-start gap-3 rounded-md bg-destructive/8 p-3"><ShieldAlert className="mt-0.5 size-4 shrink-0 text-destructive"/><div><p className="text-[10px] font-bold text-destructive">{prototypeLabels.ai}</p><p className="mt-1 text-[10px] leading-4 text-muted-foreground">No clinical inference is being performed.</p></div></div></div>
    </aside>
    <div className="lg:pl-64"><header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur-md sm:px-6 lg:px-8"><div className="flex items-center gap-3"><Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation" onClick={() => setOpen(true)}><Menu/></Button><div className="lg:hidden"><Brand/></div><div className="hidden items-center gap-2 text-xs text-muted-foreground lg:flex"><span className="size-1.5 rounded-full bg-destructive" /> AI services offline</div></div><div className="flex items-center gap-2"><span className="hidden rounded-sm border border-primary/25 bg-primary/8 px-2 py-1 text-[10px] font-semibold text-primary sm:inline-flex">{prototypeLabels.data}</span><Button variant="ghost" size="icon" aria-label="Notifications"><Bell/></Button><div className="grid size-8 place-items-center rounded-full bg-secondary text-xs font-semibold">PHC</div></div></header><main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">{children}</main></div>
  </div>;
}
