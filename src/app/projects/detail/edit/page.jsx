"use client";

import * as React from "react";
import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/lib/components/ui/button";
import { IconArrowLeft, IconDeviceFloppy } from "@tabler/icons-react";
import data from "@/app/data.json";
import { ProjectDetailsForm } from "./components/project-details-form";
import { TimelineBudgetForm } from "./components/timeline-budget-form";
import { TeamResourcesForm } from "./components/team-resources-form";
import { DocumentsFilesForm } from "./components/documents-files-form";

function EditProjectContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const projectId = searchParams.get("id") || "1";
  const project = data.projects?.find((p) => p.id === parseInt(projectId)) || data.projects?.[0];

  const formatDateForState = (dateString) => {
    if (!dateString) return "2025-01-05";
    if (dateString.includes("-") && dateString.length === 10) return dateString;
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "2025-01-05";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Initialize team members with default roles if not present
  const initializeTeamMembers = () => {
    const roles = [
      "Project Lead",
      "Frontend Developer",
      "Backend Developer",
      "UX Designer",
      "QA Engineer",
    ];
    
    return (project?.teamMembers || []).map((member, index) => ({
      ...member,
      role: member.role || roles[index] || roles[0],
    }));
  };

  const [formData, setFormData] = React.useState({
    projectName: project?.name || "Customer Dashboard v2.0",
    status: project?.status || "In Development",
    priority: "High",
    description: "Complete redesign and development of the customer-facing dashboard with improved data visualization and user experience. The new version should include real-time analytics, customizable widgets, and a modern interface that aligns with our brand guidelines.",
    projectLead: project?.teamMembers?.[0]?.name || "Robert Chen",
    department: "Development",
    startDate: "2025-01-05",
    dueDate: formatDateForState(project?.dueDate) || "2025-01-30",
    budget: "85000",
    teamSize: project?.teamMembers?.length?.toString() || "5",
    completionPercentage: project?.progress?.toString() || "45",
  });

  const [teamMembers, setTeamMembers] = React.useState(initializeTeamMembers());
  const [projectFiles, setProjectFiles] = React.useState([]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTeamMembersChange = React.useCallback((members) => {
    setTeamMembers(members);
    setFormData((prev) => ({ ...prev, teamSize: members.length.toString() }));
  }, []);

  const handleFilesChange = React.useCallback((files) => {
    setProjectFiles(files);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    // Navigate back to project detail
    router.push(`/projects/detail?id=${projectId}`);
  };

  const handleCancel = () => {
    router.push(`/projects/detail?id=${projectId}`);
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    if (dateString.includes("-")) return dateString; // Already in YYYY-MM-DD format
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="flex flex-col gap-6 py-6 md:py-8">
        <div className="px-4 lg:px-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Left Column - Main Forms */}
              <div className="lg:col-span-2 space-y-8">
                <ProjectDetailsForm 
                  formData={formData} 
                  onInputChange={handleInputChange} 
                />

                <TimelineBudgetForm 
                  formData={formData} 
                  onInputChange={handleInputChange}
                  formatDateForInput={formatDateForInput}
                />

                <DocumentsFilesForm 
                  files={projectFiles}
                  onFilesChange={handleFilesChange}
                />
              </div>

              {/* Right Column - Team Resources */}
              <div className="lg:col-span-1">
                <div className="">
                  <TeamResourcesForm 
                    teamMembers={teamMembers}
                    onTeamMembersChange={handleTeamMembersChange}
                  />
                </div>
              </div>
            </div>

            {/* Sticky Action Buttons */}
            <div className="sticky bottom-0 z-10 -mx-4 lg:-mx-6 px-4 lg:px-6 py-4 bg-background/80 backdrop-blur-md border-t ">
              <div className="flex items-center justify-end gap-3 max-w-7xl mx-auto">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleCancel}
                  className="min-w-[100px]"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="min-w-[140px] gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
                >
                  <IconDeviceFloppy className="size-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function EditProjectPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <p>Loading...</p>
          </div>
        </div>
      }
    >
      <EditProjectContent />
    </Suspense>
  );
}

