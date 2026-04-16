'use client'

interface UnsavedChangesBarProps {
  changeCount: number
  saving: boolean
  onCancel: () => void
  onSave: () => void
}

export default function UnsavedChangesBar({ changeCount, saving, onCancel, onSave }: UnsavedChangesBarProps) {
  return (
    <div className="admin-unsaved-bar">
      <div className="admin-unsaved-bar__text">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginRight: 8 }}>
          <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Có <strong>{changeCount}</strong> thay đổi chưa được lưu
      </div>
      <div className="admin-unsaved-bar__actions">
        <button
          className="admin-btn admin-btn--secondary"
          onClick={onCancel}
          disabled={saving}
          style={{ height: 34, fontSize: '.8125rem' }}
        >
          Huỷ
        </button>
        <button
          className="admin-btn admin-btn--primary"
          onClick={onSave}
          disabled={saving}
          style={{ height: 34, fontSize: '.8125rem' }}
        >
          {saving ? (
            <>
              <span
                style={{
                  width: 12,
                  height: 12,
                  border: '2px solid rgba(255,255,255,.4)',
                  borderTopColor: '#fff',
                  borderRadius: '50%',
                  animation: 'admin-spin .8s linear infinite',
                  display: 'inline-block',
                }}
              />{' '}
              Đang lưu...
            </>
          ) : (
            'Lưu thay đổi'
          )}
        </button>
      </div>
    </div>
  )
}
