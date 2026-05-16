"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { Customer, Opportunity, Task, User, Team, Contact, UserRole, OpportunityStage, ActivityLog } from "@/lib/types";
import { INITIAL_CUSTOMERS, INITIAL_OPPORTUNITIES, INITIAL_TASKS, INITIAL_USERS, INITIAL_TEAMS, INITIAL_CONTACTS } from "@/lib/mock-data";

interface AppContextValue {
  role: UserRole;
  currentUserId: string;
  setRole: (role: UserRole) => void;
  customers: Customer[];
  contacts: Contact[];
  opportunities: Opportunity[];
  tasks: Task[];
  users: User[];
  teams: Team[];
  // Customer CRUD
  addCustomer: (c: Omit<Customer, "id" | "createdAt">) => void;
  updateCustomer: (id: string, updates: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  // Contact CRUD
  addContact: (c: Omit<Contact, "id">) => void;
  deleteContact: (id: string) => void;
  // Opportunity CRUD
  addOpportunity: (o: Omit<Opportunity, "id" | "createdAt" | "activities">) => void;
  updateOpportunity: (id: string, updates: Partial<Opportunity>) => void;
  moveOpportunity: (id: string, stage: OpportunityStage) => void;
  deleteOpportunity: (id: string) => void;
  addActivity: (opportunityId: string, log: Omit<ActivityLog, "id">) => void;
  // Task CRUD
  addTask: (t: Omit<Task, "id" | "createdAt">) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  completeTask: (id: string) => void;
  // User CRUD
  approveUser: (id: string, role: UserRole, teamId: string) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deactivateUser: (id: string) => void;
  activateUser: (id: string) => void;
  // Team CRUD
  addTeam: (t: Omit<Team, "id" | "createdAt">) => void;
  updateTeam: (id: string, updates: Partial<Team>) => void;
  addTeamMember: (teamId: string, userId: string) => void;
  removeTeamMember: (teamId: string, userId: string) => void;
  // Helpers
  getUserById: (id: string) => User | undefined;
  getTeamById: (id: string) => Team | undefined;
  getCustomerById: (id: string) => Customer | undefined;
  visibleCustomers: Customer[];
  visibleOpportunities: Opportunity[];
  visibleTasks: Task[];
}

const AppContext = createContext<AppContextValue | null>(null);

const ROLE_USER_MAP: Record<UserRole, string> = {
  admin: "u1",
  team_lead: "u2",
  sales_staff: "u4",
};

let idCounter = 1000;
const uid = () => `gen-${++idCounter}-${Date.now()}`;

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole>("admin");
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(INITIAL_OPPORTUNITIES);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [teams, setTeams] = useState<Team[]>(INITIAL_TEAMS);

  const currentUserId = ROLE_USER_MAP[role];

  const setRole = useCallback((r: UserRole) => setRoleState(r), []);

  // Visibility filters based on role
  const visibleCustomers = customers.filter((c) => {
    if (role === "admin") return true;
    if (role === "team_lead") {
      const u = users.find((u) => u.id === currentUserId);
      return c.teamId === u?.teamId;
    }
    return c.ownerId === currentUserId;
  });

  const visibleOpportunities = opportunities.filter((o) => {
    if (role === "admin") return true;
    if (role === "team_lead") {
      const u = users.find((u) => u.id === currentUserId);
      return o.teamId === u?.teamId;
    }
    return o.ownerId === currentUserId;
  });

  const visibleTasks = tasks.filter((t) => {
    if (role === "admin") return true;
    if (role === "team_lead") {
      const u = users.find((u) => u.id === currentUserId);
      const teamMembers = teams.find((tm) => tm.id === u?.teamId)?.memberIds ?? [];
      return [...teamMembers, currentUserId].includes(t.assigneeId);
    }
    return t.assigneeId === currentUserId;
  });

  // Customer
  const addCustomer = useCallback((c: Omit<Customer, "id" | "createdAt">) => {
    setCustomers((prev) => [{ ...c, id: uid(), createdAt: new Date().toISOString().slice(0, 10) }, ...prev]);
  }, []);
  const updateCustomer = useCallback((id: string, updates: Partial<Customer>) => {
    setCustomers((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  }, []);
  const deleteCustomer = useCallback((id: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    setOpportunities((prev) => prev.filter((o) => o.customerId !== id));
    setTasks((prev) => prev.map((t) => (t.customerId === id ? { ...t, customerId: null, customerName: null } : t)));
  }, []);

  // Contact
  const addContact = useCallback((c: Omit<Contact, "id">) => {
    setContacts((prev) => [...prev, { ...c, id: uid() }]);
  }, []);
  const deleteContact = useCallback((id: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  }, []);

  // Opportunity
  const addOpportunity = useCallback((o: Omit<Opportunity, "id" | "createdAt" | "activities">) => {
    setOpportunities((prev) => [{ ...o, id: uid(), createdAt: new Date().toISOString().slice(0, 10), activities: [] }, ...prev]);
  }, []);
  const updateOpportunity = useCallback((id: string, updates: Partial<Opportunity>) => {
    setOpportunities((prev) => prev.map((o) => (o.id === id ? { ...o, ...updates } : o)));
  }, []);
  const moveOpportunity = useCallback((id: string, stage: OpportunityStage) => {
    setOpportunities((prev) => prev.map((o) => (o.id === id ? { ...o, stage } : o)));
  }, []);
  const deleteOpportunity = useCallback((id: string) => {
    setOpportunities((prev) => prev.filter((o) => o.id !== id));
  }, []);
  const addActivity = useCallback((opportunityId: string, log: Omit<ActivityLog, "id">) => {
    setOpportunities((prev) =>
      prev.map((o) =>
        o.id === opportunityId ? { ...o, activities: [{ ...log, id: uid() }, ...o.activities] } : o
      )
    );
  }, []);

  // Task
  const addTask = useCallback((t: Omit<Task, "id" | "createdAt">) => {
    setTasks((prev) => [{ ...t, id: uid(), createdAt: new Date().toISOString().slice(0, 10) }, ...prev]);
  }, []);
  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  }, []);
  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);
  const completeTask = useCallback((id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: "done" } : t)));
  }, []);

  // User
  const approveUser = useCallback((id: string, role: UserRole, teamId: string) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role, teamId, pendingApproval: false, isActive: true } : u)));
    setTeams((prev) => prev.map((t) => (t.id === teamId ? { ...t, memberIds: [...t.memberIds.filter((m) => m !== id), id] } : t)));
  }, []);
  const updateUser = useCallback((id: string, updates: Partial<User>) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...updates } : u)));
  }, []);
  const deactivateUser = useCallback((id: string) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, isActive: false } : u)));
  }, []);
  const activateUser = useCallback((id: string) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, isActive: true } : u)));
  }, []);

  // Team
  const addTeam = useCallback((t: Omit<Team, "id" | "createdAt">) => {
    setTeams((prev) => [...prev, { ...t, id: uid(), createdAt: new Date().toISOString().slice(0, 10) }]);
  }, []);
  const updateTeam = useCallback((id: string, updates: Partial<Team>) => {
    setTeams((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  }, []);
  const addTeamMember = useCallback((teamId: string, userId: string) => {
    setTeams((prev) => prev.map((t) => (t.id === teamId ? { ...t, memberIds: [...t.memberIds.filter((m) => m !== userId), userId] } : t)));
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, teamId } : u)));
  }, []);
  const removeTeamMember = useCallback((teamId: string, userId: string) => {
    setTeams((prev) => prev.map((t) => (t.id === teamId ? { ...t, memberIds: t.memberIds.filter((m) => m !== userId) } : t)));
    setUsers((prev) => prev.map((u) => (u.id === userId && u.teamId === teamId ? { ...u, teamId: null } : u)));
  }, []);

  const getUserById = useCallback((id: string) => users.find((u) => u.id === id), [users]);
  const getTeamById = useCallback((id: string) => teams.find((t) => t.id === id), [teams]);
  const getCustomerById = useCallback((id: string) => customers.find((c) => c.id === id), [customers]);

  return (
    <AppContext.Provider value={{ role, currentUserId, setRole, customers, contacts, opportunities, tasks, users, teams, addCustomer, updateCustomer, deleteCustomer, addContact, deleteContact, addOpportunity, updateOpportunity, moveOpportunity, deleteOpportunity, addActivity, addTask, updateTask, deleteTask, completeTask, approveUser, updateUser, deactivateUser, activateUser, addTeam, updateTeam, addTeamMember, removeTeamMember, getUserById, getTeamById, getCustomerById, visibleCustomers, visibleOpportunities, visibleTasks }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
