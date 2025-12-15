"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/lib/components/ui/card";
import { Button } from "@/lib/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/lib/components/ui/avatar";
import { IconTrash, IconUserPlus } from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/lib/components/ui/dialog";
import { Input } from "@/lib/components/ui/input";
import { Label } from "@/lib/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/components/ui/select";

const roles = [
  "Project Lead",
  "Frontend Developer",
  "Backend Developer",
  "UX Designer",
  "QA Engineer",
  "DevOps Engineer",
  "Product Manager",
  "Designer",
  "Full Stack Developer",
];

export function TeamResourcesForm({ teamMembers = [], onTeamMembersChange }) {
  // Initialize members from props only once using lazy initializer
  const [members, setMembers] = React.useState(() => {
    return teamMembers.map((member, index) => ({
      id: member.id || index,
      name: member.name || "",
      avatar: member.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name || index}`,
      role: member.role || roles[index] || roles[0],
    }));
  });

  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [newMember, setNewMember] = React.useState({
    name: "",
    role: roles[0],
  });

  // Update parent when members change, but only call callback directly
  const updateMembers = React.useCallback((newMembers) => {
    setMembers(newMembers);
    if (onTeamMembersChange) {
      onTeamMembersChange(newMembers);
    }
  }, [onTeamMembersChange]);

  const handleAddMember = () => {
    if (!newMember.name.trim()) return;

    const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(newMember.name)}`;
    const member = {
      id: Date.now(),
      name: newMember.name,
      avatar: avatarUrl,
      role: newMember.role,
    };

    const updatedMembers = [...members, member];
    updateMembers(updatedMembers);
    setNewMember({ name: "", role: roles[0] });
    setIsAddDialogOpen(false);
  };

  const handleDeleteMember = (id) => {
    const updatedMembers = members.filter((member) => member.id !== id);
    updateMembers(updatedMembers);
  };

  return (
    <Card>
      <CardHeader className="border-b bg-gradient-to-r from-muted/50 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <IconUserPlus className="size-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold">Team & Resources</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {members.length} {members.length === 1 ? 'member' : 'members'}
              </p>
            </div>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2 shadow-md hover:shadow-lg transition-all">
                <IconUserPlus className="size-4" />
                Add Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Team Member</DialogTitle>
                <DialogDescription>
                  Add a new team member to this project.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="memberName">Name</Label>
                  <Input
                    id="memberName"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    placeholder="Enter member name"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddMember();
                      }
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="memberRole">Role</Label>
                  <Select
                    value={newMember.role}
                    onValueChange={(value) => setNewMember({ ...newMember, role: value })}
                  >
                    <SelectTrigger id="memberRole" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddMember}>Add Member</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {members.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground px-6">
              No team members added yet. Click "Add Member" to get started.
            </div>
          ) : (
            members.map((member, index) => (
              <div
                key={member.id}
                className={`flex items-center gap-4 px-6 py-4 bg-muted/30 hover:bg-muted/50 transition-all duration-200 ${
                  index === 0 ? 'rounded-t-lg' : ''
                } ${index === members.length - 1 ? 'rounded-b-lg' : ''}`}
              >
                <Avatar className="size-10">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0"
                  onClick={() => handleDeleteMember(member.id)}
                >
                  <IconTrash className="size-4" />
                  <span className="sr-only">Delete member</span>
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

