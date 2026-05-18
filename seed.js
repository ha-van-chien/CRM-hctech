const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRole) {
  console.error('Missing env vars');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRole);

// Helper to convert mock ID (u1, c1) to valid UUID (deterministic)
const toUUID = (prefix, id) => {
  const hex = id.replace(prefix, '').padStart(12, '0');
  return `00000000-0000-0000-0000-${hex}`;
};

const users = [
  { id: toUUID('u', 'u1'), email: "quan.nguyen@hctech.vn", fullName: "Nguyễn Văn Quân", role: "admin" },
  { id: toUUID('u', 'u2'), email: "huong.tran@hctech.vn", fullName: "Trần Thị Hương", role: "team_lead" },
  { id: toUUID('u', 'u3'), email: "anh.le@hctech.vn", fullName: "Lê Quốc Anh", role: "team_lead" },
  { id: toUUID('u', 'u4'), email: "hung.pham@hctech.vn", fullName: "Phạm Văn Hùng", role: "sales_staff" },
  { id: toUUID('u', 'u5'), email: "mai.hoang@hctech.vn", fullName: "Hoàng Thị Mai", role: "sales_staff" },
  { id: toUUID('u', 'u6'), email: "tuan.vu@hctech.vn", fullName: "Vũ Minh Tuấn", role: "sales_staff" },
  { id: toUUID('u', 'u7'), email: "lan.dang@hctech.vn", fullName: "Lê Quốc Anh", role: "sales_staff" }
];

const teams = [
  { id: toUUID('t', 't1'), name: "Nhóm KD Miền Nam", region: "Miền Nam" },
  { id: toUUID('t', 't2'), name: "Nhóm KD Miền Bắc", region: "Miền Bắc" }
];

const customers = [
  { id: toUUID('c', 'c1'), name: "Nhà máy Dệt may Phương Đông", segment: "manufacturing", phone: "028 3456 7890", email: "contact@phuongdong.com.vn", address: "KCN Tân Bình, TP.HCM", owner_id: toUUID('u', 'u4'), team_id: toUUID('t', 't1'), status: "active" },
  { id: toUUID('c', 'c2'), name: "Công ty CP Thực phẩm VISSAN", segment: "food_processing", phone: "028 3566 1234", email: "kinhdoanh@vissan.com.vn", address: "Quận Bình Thạnh, TP.HCM", owner_id: toUUID('u', 'u4'), team_id: toUUID('t', 't1'), status: "active" },
  { id: toUUID('c', 'c3'), name: "Nhà máy Dược phẩm Imexpharm", segment: "pharmaceutical", phone: "0292 381 6000", email: "info@imexpharm.com", address: "TP. Sa Đéc, Đồng Tháp", owner_id: toUUID('u', 'u5'), team_id: toUUID('t', 't1'), status: "active" },
  { id: toUUID('c', 'c4'), name: "Bệnh viện Chợ Rẫy", segment: "hospital", phone: "028 3855 4137", email: "bvchory@choray.vn", address: "201B Nguyễn Chí Thanh, Q5, TP.HCM", owner_id: toUUID('u', 'u6'), team_id: toUUID('t', 't2'), status: "active" }
];

async function seed() {
  console.log('Seeding teams...');
  const { error: te } = await supabase.from('teams').upsert(teams);
  if (te) console.error('Teams error:', te);

  console.log('Seeding profiles and auth users...');
  for (const user of users) {
    // 1. Create Auth User
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      id: user.id,
      email: user.email,
      password: 'Password123!',
      email_confirm: true,
      user_metadata: { full_name: user.fullName }
    });

    if (authError && authError.message !== 'User already exists') {
      console.warn(`Auth error for ${user.email}:`, authError.message);
    }

    // 2. Insert/Update Profile
    const { error: ue } = await supabase.from('profiles').upsert({
      id: user.id,
      email: user.email,
      full_name: user.fullName,
      role: user.role,
      is_active: true,
      pending_approval: false
    });
    if (ue) console.warn(`Profile error for ${user.email}:`, ue.message);
  }

  console.log('Seeding customers...');
  const { error: ce } = await supabase.from('customers').upsert(customers);
  if (ce) console.error('Customers error:', ce);

  console.log('Seeding tasks...');
  const tasks = [
    { id: toUUID('tk', 'tk1'), title: "Gọi điện xác nhận lịch khảo sát Imexpharm", type: "call", status: "pending", priority: "high", customer_id: toUUID('c', 'c3'), assignee_id: toUUID('u', 'u5'), due_date: "2024-06-05" }
  ];
  const { error: tke } = await supabase.from('tasks').upsert(tasks);
  if (tke) console.error('Tasks error:', tke);

  console.log('Seed finished.');
}

seed();
