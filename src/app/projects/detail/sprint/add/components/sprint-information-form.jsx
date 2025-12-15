"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/lib/components/ui/button";
import { SprintBasicInfoForm } from "./sprint-basic-info-form";
import { SprintAcceptanceCriteriaForm } from "./sprint-acceptance-criteria-form";
import { SprintDependenciesForm } from "./sprint-dependencies-form";
import { SprintCustomFieldsForm } from "./sprint-custom-fields-form";
import { SprintProgressCard } from "./sprint-progress-card";

export function SprintInformationForm({ projectId }) {
  const router = useRouter();

  const [formData, setFormData] = React.useState({
    sprintName: "",
    sprintGoal: "",
    duration: "2",
    sprintNumber: "1",
    startDate: "",
    endDate: "",
    status: "Pending",
    tasksCompleted: 0,
    tasksTotal: 0,
  });

  const [acceptanceCriteria, setAcceptanceCriteria] = React.useState([
    { id: 1, text: "" },
    { id: 2, text: "" },
  ]);

  const [dependencies, setDependencies] = React.useState([
    { id: 1, sprintId: "" },
  ]);

  const [customFields, setCustomFields] = React.useState([
    { id: 1, name: "", value: "" },
  ]);

  // Calculate end date based on start date and duration
  React.useEffect(() => {
    if (formData.startDate && formData.duration) {
      const start = new Date(formData.startDate);
      const weeks = parseInt(formData.duration) || 0;
      const end = new Date(start);
      end.setDate(end.getDate() + weeks * 7);

      const year = end.getFullYear();
      const month = String(end.getMonth() + 1).padStart(2, "0");
      const day = String(end.getDate()).padStart(2, "0");

      setFormData((prev) => ({
        ...prev,
        endDate: `${year}-${month}-${day}`,
      }));
    }
  }, [formData.startDate, formData.duration]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddAcceptanceCriteria = () => {
    const newId = Math.max(...acceptanceCriteria.map((c) => c.id), 0) + 1;
    setAcceptanceCriteria([...acceptanceCriteria, { id: newId, text: "" }]);
  };

  const handleRemoveAcceptanceCriteria = (id) => {
    if (acceptanceCriteria.length > 1) {
      setAcceptanceCriteria(acceptanceCriteria.filter((c) => c.id !== id));
    }
  };

  const handleAcceptanceCriteriaChange = (id, text) => {
    setAcceptanceCriteria(
      acceptanceCriteria.map((c) => (c.id === id ? { ...c, text } : c))
    );
  };

  const handleAddDependency = () => {
    const newId = Math.max(...dependencies.map((d) => d.id), 0) + 1;
    setDependencies([...dependencies, { id: newId, sprintId: "" }]);
  };

  const handleRemoveDependency = (id) => {
    if (dependencies.length > 1) {
      setDependencies(dependencies.filter((d) => d.id !== id));
    }
  };

  const handleDependencyChange = (id, sprintId) => {
    setDependencies(
      dependencies.map((d) => (d.id === id ? { ...d, sprintId } : d))
    );
  };

  const handleAddCustomField = () => {
    const newId = Math.max(...customFields.map((f) => f.id), 0) + 1;
    setCustomFields([...customFields, { id: newId, name: "", value: "" }]);
  };

  const handleRemoveCustomField = (id) => {
    if (customFields.length > 1) {
      setCustomFields(customFields.filter((f) => f.id !== id));
    }
  };

  const handleCustomFieldChange = (id, field, value) => {
    setCustomFields(
      customFields.map((f) => (f.id === id ? { ...f, [field]: value } : f))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Sprint form submitted:", {
      ...formData,
      acceptanceCriteria,
      dependencies,
      customFields,
    });
    // Navigate back to project detail
    router.push(`/projects/detail?id=${projectId}`);
  };

  const handleCancel = () => {
    router.push(`/projects/detail?id=${projectId}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <SprintBasicInfoForm
        formData={formData}
        onInputChange={handleInputChange}
      />

      {/* Dependencies and Custom Fields in 2 columns */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <SprintDependenciesForm
          dependencies={dependencies}
          onAdd={handleAddDependency}
          onRemove={handleRemoveDependency}
          onChange={handleDependencyChange}
        />

        <SprintCustomFieldsForm
          customFields={customFields}
          onAdd={handleAddCustomField}
          onRemove={handleRemoveCustomField}
          onChange={handleCustomFieldChange}
        />
      </div>

      {/* Acceptance Criteria and Progress in 2 columns */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <SprintAcceptanceCriteriaForm
          criteria={acceptanceCriteria}
          onAdd={handleAddAcceptanceCriteria}
          onRemove={handleRemoveAcceptanceCriteria}
          onChange={handleAcceptanceCriteriaChange}
        />

        <SprintProgressCard
          tasksCompleted={formData.tasksCompleted}
          tasksTotal={formData.tasksTotal}
        />
      </div>

      {/* Action Buttons */}
      <div className="sticky bottom-0 z-10 -mx-4 lg:-mx-6 px-4 lg:px-6 py-4 bg-background/80 backdrop-blur-md border-t">
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
            Create Sprint
          </Button>
        </div>
      </div>
    </form>
  );
}
