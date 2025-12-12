import React from 'react'
import data from "@/app/data.json"
import { DataTableMembers } from "./components/data-table-members"
import { SectionCards } from "@/app/components/section-cards"

function TeamsOverview() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards cards={data.teamsOverviewCards} />
      <DataTableMembers data={data.teams} />
    </div>
  )
}

export default TeamsOverview