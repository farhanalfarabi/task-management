"use client";

import * as React from "react";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/lib/components/ui/button";
import { PageHeader } from "@/lib/components/page-header";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { ProjectDetailsForm } from "../detail/edit/components/project-details-form";
import { TimelineBudgetForm } from "../detail/edit/components/timeline-budget-form";
import { TeamResourcesForm } from "../detail/edit/components/team-resources-form";
import { DocumentsFilesForm } from "../detail/edit/components/documents-files-form";

function AddProjectContent() {
  const router = useRouter();

  // Initialize with empty/default values for new project
  const [formData, setFormData] = React.useState({
    projectName: "",
    status: "In Development",
    priority: "High",
    description: "",
    projectLead: "",
    department: "Development",
    startDate: "",
    dueDate: "",
    budget: "",
    teamSize: "0",
    completionPercentage: "0",
  });

  const [teamMembers, setTeamMembers] = React.useState([]);
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
    console.log("Team members:", teamMembers);
    console.log("Files:", projectFiles);
    
    // TODO: Create project via API
    // After successful creation, navigate to projects list or new project detail
    router.push("/projects");
  };

  const handleCancel = () => {
    router.push("/projects");
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
    <>
      <PageHeader 
        title="Add New Project"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: "Add New Project" }
        ]} 
      />
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
                  Create Project
                </Button>
              </div>
            </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default function AddProjectPage() {
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
      <AddProjectContent />
    </Suspense>
  );
}

