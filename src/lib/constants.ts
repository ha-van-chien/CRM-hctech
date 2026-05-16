import type { CustomerSegment, OpportunityStage, ProductInterest, TaskType, UserRole } from "./types";

export const SEGMENTS: { id: CustomerSegment; label: string; color: string; bg: string }[] = [
  { id: "manufacturing", label: "Nhà máy sản xuất", color: "#475569", bg: "#f1f5f9" },
  { id: "food_processing", label: "Chế biến thực phẩm", color: "#065f46", bg: "#d1fae5" },
  { id: "pharmaceutical", label: "Dược phẩm", color: "#1e40af", bg: "#dbeafe" },
  { id: "hospital", label: "Bệnh viện", color: "#991b1b", bg: "#fee2e2" },
  { id: "clinic", label: "Phòng khám", color: "#5b21b6", bg: "#ede9fe" },
];

export const STAGES: {
  id: OpportunityStage;
  label: string;
  color: string;
  bg: string;
  icon: string;
}[] = [
  { id: "approach", label: "Tiếp cận", color: "#1e40af", bg: "#dbeafe", icon: "handshake" },
  { id: "survey", label: "Khảo sát & tư vấn", color: "#5b21b6", bg: "#ede9fe", icon: "search" },
  { id: "quote", label: "Báo giá", color: "#92400e", bg: "#fef3c7", icon: "request_quote" },
  { id: "negotiation", label: "Đàm phán", color: "#9a3412", bg: "#ffedd5", icon: "gavel" },
  { id: "won", label: "Chốt thành công", color: "#065f46", bg: "#d1fae5", icon: "check_circle" },
  { id: "lost", label: "Không thành công", color: "#991b1b", bg: "#fee2e2", icon: "cancel" },
];

export const PRODUCTS: { id: ProductInterest; label: string; short: string }[] = [
  { id: "oil_ring", label: "Bơm hút chân không vòng dầu", short: "Vòng dầu" },
  { id: "water_ring", label: "Bơm chân không vòng nước", short: "Vòng nước" },
  { id: "dry", label: "Bơm chân không khô", short: "Bơm khô" },
  { id: "repair", label: "Sửa chữa bơm chân không", short: "Sửa chữa" },
  { id: "maintenance", label: "Bảo dưỡng định kỳ", short: "Bảo dưỡng" },
];

export const TASK_TYPES: { id: TaskType; label: string; icon: string }[] = [
  { id: "call", label: "Gọi điện", icon: "phone" },
  { id: "meeting", label: "Họp / Gặp mặt", icon: "groups" },
  { id: "email", label: "Email", icon: "email" },
  { id: "visit", label: "Thăm khách hàng", icon: "location_on" },
  { id: "task", label: "Công việc khác", icon: "assignment" },
];

export const ROLES: { id: UserRole; label: string; color: string; bg: string }[] = [
  { id: "admin", label: "Quản trị viên", color: "#991b1b", bg: "#fee2e2" },
  { id: "team_lead", label: "Trưởng nhóm", color: "#1e40af", bg: "#dbeafe" },
  { id: "sales_staff", label: "Nhân viên KD", color: "#374151", bg: "#f3f4f6" },
];

export const ROLE_LABELS: Record<UserRole, string> = {
  admin: "Quản trị viên",
  team_lead: "Trưởng nhóm",
  sales_staff: "Nhân viên KD",
};

export const STAGE_PROBABILITY: Record<OpportunityStage, number> = {
  approach: 10,
  survey: 25,
  quote: 50,
  negotiation: 75,
  won: 100,
  lost: 0,
};

export const formatCurrency = (value: number): string => {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)} tỷ`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(0)} triệu`;
  return value.toLocaleString("vi-VN") + " đ";
};

export const formatDate = (dateStr: string): string => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
};

export const isOverdue = (dateStr: string, status?: string): boolean => {
  if (status === "done") return false;
  return new Date(dateStr) < new Date();
};
