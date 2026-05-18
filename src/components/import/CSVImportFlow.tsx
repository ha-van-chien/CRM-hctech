"use client";
import { useState, useRef } from "react";
import Papa from "papaparse";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icons } from "@/components/icons";
import { Select } from "@/components/ui/Select";
import { useToast } from "@/components/ui/Toast";

type Step = 'upload' | 'mapping' | 'preview' | 'executing' | 'result';

export default function CSVImportFlow() {
  const { toast } = useToast();
  const [step, setStep] = useState<Step>('upload');
  const [csvData, setCsvData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [importResults, setImportResults] = useState({ success: 0, failed: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const targetFields = [
    { value: 'name', label: 'Tên khách hàng (Bắt buộc)' },
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Số điện thoại' },
    { value: 'address', label: 'Địa chỉ' },
    { value: 'segment', label: 'Phân khúc' },
    { value: 'notes', label: 'Ghi chú' }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setCsvData(results.data);
        setHeaders(results.meta.fields || []);
        
        // Auto-mapping logic
        const initialMapping: Record<string, string> = {};
        results.meta.fields?.forEach(header => {
          const lower = header.toLowerCase();
          if (lower.includes('tên') || lower.includes('name')) initialMapping[header] = 'name';
          if (lower.includes('mail')) initialMapping[header] = 'email';
          if (lower.includes('phone') || lower.includes('điện thoại')) initialMapping[header] = 'phone';
          if (lower.includes('địa chỉ') || lower.includes('address')) initialMapping[header] = 'address';
        });
        setMapping(initialMapping);
        setStep('mapping');
      },
      error: (err) => {
        toast("Lỗi khi đọc file CSV: " + err.message, "error");
      }
    });
  };

  const handleStartImport = () => {
    if (!Object.values(mapping).includes('name')) {
      toast("Bạn phải chọn cột tương ứng với 'Tên khách hàng'", "error");
      return;
    }

    setStep('executing');
    
    // Simulate process
    let successCount = 0;
    let failedCount = 0;

    csvData.forEach(row => {
      const name = row[Object.keys(mapping).find(k => mapping[k] === 'name') || ""];
      if (name) successCount++;
      else failedCount++;
    });

    setTimeout(() => {
      setImportResults({ success: successCount, failed: failedCount });
      setStep('result');
      toast(`Đã import xong ${successCount} khách hàng`, "success");
    }, 1500);
  };

  const renderUpload = () => (
    <div 
      onClick={() => fileInputRef.current?.click()}
      style={{
        border: '2px dashed var(--c-outline-variant)',
        borderRadius: 'var(--radius-lg)',
        padding: '4rem 2rem',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s',
        backgroundColor: 'var(--c-surface-low)'
      }}
      onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--c-primary)'}
      onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--c-outline-variant)'}
    >
      <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".csv" style={{ display: 'none' }} />
      <Icons.upload size={48} style={{ color: 'var(--c-on-variant)', marginBottom: '1rem', opacity: 0.5 }} />
      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>Tải lên file CSV</h3>
      <p style={{ color: 'var(--c-on-variant)', fontSize: '0.875rem' }}>
        Kéo thả hoặc nhấn để chọn file. Chỉ chấp nhận định dạng .csv
      </p>
    </div>
  );

  const renderMapping = () => (
    <Card style={{ padding: '1.5rem' }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem' }}>Ghép cột dữ liệu (Field Mapping)</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {headers.map(header => (
          <div key={header} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 500, backgroundColor: 'var(--c-surface-low)', padding: '0.75rem', borderRadius: '4px' }}>
              {header}
            </div>
            <Select 
              value={mapping[header] || ""}
              onChange={(e) => setMapping({ ...mapping, [header]: e.target.value })}
              options={[
                { value: "", label: "-- Bỏ qua --" },
                ...targetFields
              ]}
            />
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
        <Button variant="ghost" onClick={() => setStep('upload')}>Quay lại</Button>
        <Button onClick={() => setStep('preview')}>Xem trước</Button>
      </div>
    </Card>
  );

  const renderPreview = () => (
    <Card style={{ padding: '0', overflow: 'hidden' }}>
      <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--c-outline-variant)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Xem trước (5 dòng đầu)</h3>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button variant="ghost" onClick={() => setStep('mapping')}>Quay lại sửa</Button>
          <Button onClick={handleStartImport}>Bắt đầu Import</Button>
        </div>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--c-surface-low)' }}>
              {Object.keys(mapping).filter(k => mapping[k]).map(k => (
                <th key={k} style={{ padding: '1rem', borderBottom: '1px solid var(--c-outline-variant)' }}>{mapping[k].toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {csvData.slice(0, 5).map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--c-outline-variant)' }}>
                {Object.keys(mapping).filter(k => mapping[k]).map(k => (
                  <td key={k} style={{ padding: '1rem' }}>{row[k]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );

  const renderExecuting = () => (
    <div style={{ textAlign: 'center', padding: '4rem' }}>
      <div className="spinner-premium" style={{ marginBottom: '2rem' }} />
      <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Đang xử lý dữ liệu...</h3>
      <p style={{ color: 'var(--c-on-variant)' }}>Vui lòng không đóng trình duyệt.</p>
    </div>
  );

  const renderResult = () => (
    <Card style={{ padding: '3rem', textAlign: 'center' }}>
      <div style={{ 
        width: '64px', height: '64px', backgroundColor: 'var(--c-success-bg)', 
        color: 'var(--c-success)', borderRadius: '50%', display: 'flex', 
        alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' 
      }}>
        <Icons.check size={32} />
      </div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Hoàn thành Import</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '2.5rem' }}>
        <div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--c-success)' }}>{importResults.success}</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--c-on-variant)' }}>Thành công</div>
        </div>
        <div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--c-error)' }}>{importResults.failed}</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--c-on-variant)' }}>Lỗi/Bỏ qua</div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <Button onClick={() => window.location.reload()}>Về danh sách khách hàng</Button>
        <Button variant="ghost" onClick={() => setStep('upload')}>Import tiếp</Button>
      </div>
    </Card>
  );

  return (
    <div className="import-flow">
      {step === 'upload' && renderUpload()}
      {step === 'mapping' && renderMapping()}
      {step === 'preview' && renderPreview()}
      {step === 'executing' && renderExecuting()}
      {step === 'result' && renderResult()}

      <style jsx>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .spinner-premium {
          width: 50px; height: 50px; border: 3px solid var(--c-outline-variant);
          border-top-color: var(--c-primary); border-radius: 50%;
          margin: 0 auto; animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}
