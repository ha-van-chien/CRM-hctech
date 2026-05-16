export interface Customer {
  id: string;
  name: string;
  contact_person: string;
  email: string;
  phone: string;
  segment: string;
  interests: string[];
}

export interface Lead {
  id: string;
  title: string;
  customer_id: string;
  value: number;
  stage: string;
}

export const SEGMENTS = [
  'Nhà máy sản xuất',
  'Chế biến thực phẩm',
  'Dược phẩm',
  'Bệnh viện',
  'Phòng khám'
];

export const INTERESTS = [
  'Bơm hút chân không vòng dầu',
  'Bơm chân không vòng nước',
  'Bơm chân không khô',
  'Sửa chữa bơm chân không',
  'Bảo dưỡng định kỳ'
];

export const PIPELINE_STAGES = [
  { id: 'tiếp cận', name: 'Tiếp cận' },
  { id: 'khảo sát và tư vấn', name: 'Khảo sát và tư vấn' },
  { id: 'báo giá', name: 'Báo giá' },
  { id: 'đàm phán', name: 'Đàm phán' },
  { id: 'chốt thành công', name: 'Chốt thành công' },
  { id: 'không thành công', name: 'Không thành công' }
];

// Dữ liệu giả Khách hàng
export const initialCustomers: Customer[] = [
  {
    id: 'c1',
    name: 'Công ty Cổ phần Sữa Việt Nam (Vinamilk)',
    contact_person: 'Nguyễn Văn A',
    email: 'nva@vinamilk.com.vn',
    phone: '0901234567',
    segment: 'Chế biến thực phẩm',
    interests: ['Bơm hút chân không vòng dầu', 'Bảo dưỡng định kỳ']
  },
  {
    id: 'c2',
    name: 'Công ty Cổ phần Dược Hậu Giang',
    contact_person: 'Trần Thị B',
    email: 'ttb@dhgpharma.com.vn',
    phone: '0912345678',
    segment: 'Dược phẩm',
    interests: ['Bơm chân không khô']
  },
  {
    id: 'c3',
    name: 'Bệnh viện Đa khoa Quốc tế Vinmec',
    contact_person: 'Lê Văn C',
    email: 'lvc@vinmec.com',
    phone: '0987654321',
    segment: 'Bệnh viện',
    interests: ['Bơm hút chân không vòng dầu', 'Sửa chữa bơm chân không']
  },
  {
    id: 'c4',
    name: 'Công ty TNHH Samsung Electronics Việt Nam',
    contact_person: 'Phạm Thị D',
    email: 'ptd@samsung.com',
    phone: '0976543210',
    segment: 'Nhà máy sản xuất',
    interests: ['Bơm chân không vòng nước']
  }
];

// Dữ liệu giả Cơ hội bán hàng
export const initialLeads: Lead[] = [
  { id: 'l1', title: 'Hệ thống bơm vòng dầu xưởng sữa', customer_id: 'c1', value: 150000000, stage: 'đàm phán' },
  { id: 'l2', title: 'Bơm khô phòng sạch', customer_id: 'c2', value: 320000000, stage: 'báo giá' },
  { id: 'l3', title: 'Bảo dưỡng hệ thống chân không TT', customer_id: 'c3', value: 45000000, stage: 'khảo sát và tư vấn' },
  { id: 'l4', title: 'Bơm vòng nước xử lý khí thải', customer_id: 'c4', value: 210000000, stage: 'tiếp cận' },
  { id: 'l5', title: 'Sửa chữa cụm bơm trung tâm', customer_id: 'c3', value: 85000000, stage: 'chốt thành công' }
];

// Các hàm thao tác (Mock Server Actions)
let customers = [...initialCustomers];
let leads = [...initialLeads];

export async function getCustomers() {
  return customers;
}

export async function getLeads() {
  return leads;
}
