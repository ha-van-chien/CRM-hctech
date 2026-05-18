export type UserRole = "admin" | "team_lead" | "sales_staff";

export type CustomerSegment =
  | "manufacturing"
  | "food_processing"
  | "pharmaceutical"
  | "hospital"
  | "clinic";

export type ProductInterest =
  | "oil_ring"
  | "water_ring"
  | "dry"
  | "repair"
  | "maintenance";

export type OpportunityStage =
  | "approach"
  | "survey"
  | "quote"
  | "negotiation"
  | "won"
  | "lost";

export type TaskStatus = "pending" | "in_progress" | "done" | "overdue";
export type TaskType = "call" | "meeting" | "email" | "task" | "visit";

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  teamId: string | null;
  isActive: boolean;
  pendingApproval: boolean;
  avatarInitials: string;
  createdAt: string;
}

export interface Team {
  id: string;
  name: string;
  leadId: string;
  region: string;
  memberIds: string[];
  createdAt: string;
}

export interface Contact {
  id: string;
  customerId: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  isPrimary: boolean;
}

export interface Customer {
  id: string;
  name: string;
  segment: CustomerSegment;
  products: ProductInterest[];
  phone: string;
  email: string;
  address: string;
  ownerId: string;
  teamId: string;
  status: "active" | "inactive";
  notes: string;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  type: TaskType;
  content: string;
  userId: string;
  createdAt: string;
}

export interface Opportunity {
  id: string;
  title: string;
  customerId: string;
  customerName: string;
  product: ProductInterest;
  value: number;
  stage: OpportunityStage;
  probability: number;
  ownerId: string;
  teamId: string;
  dueDate: string;
  notes: string;
  activities: ActivityLog[];
  createdAt: string;
}

export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  type: TaskType;
  status: TaskStatus;
  priority: TaskPriority;
  customerId: string | null;
  customerName: string | null;
  opportunityId: string | null;
  opportunityTitle: string | null;
  assigneeId: string;
  dueDate: string;
  notes: string;
  createdAt: string;
}

export interface CustomerList {
  id: string;
  name: string;
  description: string;
  customerIds: string[];
  ownerId: string;
  createdAt: string;
}
