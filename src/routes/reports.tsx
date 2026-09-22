import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo,useState } from "react";
import { Card,CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DemoLabel,PageHeader } from "@/components/dr-assist/ui";
import { RecordsTable } from "@/components/dr-assist/records-table";
import { screenings } from "@/lib/dr-assist/sample-data";
export const Route=createFileRoute("/reports")({head:()=>({meta:[{title:"Reports — DR-Assist"},{name:"description",content:"Prototype DR-Assist report history."},{property:"og:title",content:"Reports — DR-Assist"},{property:"og:description",content:"Demo screening report history."},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary_large_image"}]}),component:Reports});
function Reports(){const[q,setQ]=useState("");const rows=useMemo(()=>screenings.filter(r=>r.id.toLowerCase().includes(q.toLowerCase())||r.patientId.toLowerCase().includes(q.toLowerCase())),[q]);return <><PageHeader eyebrow="Documentation" title="Screening reports" description="Review fictional report records. PDF export remains a Phase 1 placeholder." action={<DemoLabel/>}/><Card className="clinical-card"><CardContent className="p-0"><div className="border-b border-border p-4"><label className="relative block max-w-md"><span className="sr-only">Search reports</span><Search className="absolute left-3 top-2.5 size-4 text-muted-foreground"/><Input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search screening or patient ID" className="pl-9"/></label></div><RecordsTable records={rows} reportAction/></CardContent></Card></>}
