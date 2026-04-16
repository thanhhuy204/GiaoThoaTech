'use client'

export default function AdminMembershipsPage() {
  return (
    <>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Thẻ thành viên</h1>
        <p className="admin-page-subtitle">Quản lý gói dịch vụ và thành viên</p>
      </div>
      <div className="admin-card">
        <div style={{ padding: '60px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🪪</div>
          <div style={{ fontSize: '1rem', fontWeight: 600, color: '#6b7280' }}>Tính năng đang được phát triển</div>
          <div style={{ fontSize: '.875rem', color: '#9ca3af', marginTop: 6 }}>Quản lý gói Basic &amp; Premium sẽ sớm ra mắt</div>
        </div>
      </div>
    </>
  )
}
