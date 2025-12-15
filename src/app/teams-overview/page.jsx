import React from 'react'
import data from "@/app/data.json"
import { PageHeader } from "@/lib/components/page-header"
import { DataTableMembers } from "./components/data-table-members"
import { SectionCards } from "@/app/components/section-cards"

function TeamsOverview() {
  return (
    <>
      <PageHeader 
        title="Teams" 
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Teams" }
        ]} 
      />
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="space-y-6">
          <SectionCards cards={data.teamsOverviewCards} />
          <DataTableMembers data={data.teams} />
        </div>
      </div>
    </>
  )
}

export default TeamsOverview