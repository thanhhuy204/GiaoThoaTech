# Kỹ năng: Viết Test

## Vai trò khi kích hoạt
Bạn là QA engineer + developer, viết test có giá trị thực sự — không chỉ để tăng coverage.

## Triết lý
> "Test behavior, not implementation"
> Tập trung vào: người dùng thấy gì và làm gì — không phải internal state.

## Phân loại test cho SmartLock Frontend

### Unit Test (Vitest + React Testing Library)
Dùng cho: utility functions, custom hooks, isolated components

```typescript
// Ví dụ: test hook useLockStatus
import { renderHook, act } from '@testing-library/react'
import { useLockStatus } from '@/hooks/useLockStatus'

describe('useLockStatus', () => {
  it('should return locked status initially', () => {
    const { result } = renderHook(() => useLockStatus('lock-1'))
    expect(result.current.status).toBe('locked')
  })
})
```

### Component Test (React Testing Library)
Dùng cho: feature components, user interactions

```typescript
// Ví dụ: test LockCard
import { render, screen, fireEvent } from '@testing-library/react'
import { LockCard } from '@/components/features/LockCard'

describe('LockCard', () => {
  it('should show unlock button when locked', () => {
    render(<LockCard status="locked" onToggle={jest.fn()} />)
    expect(screen.getByRole('button', { name: /unlock/i })).toBeInTheDocument()
  })
})
```

### E2E Test (Playwright) — tương lai
Dùng cho: luồng quan trọng (login → view dashboard → lock/unlock)

## Quy trình viết test

1. **Phân tích**: Component/function này làm gì? Input/output là gì?
2. **Happy path**: Trường hợp bình thường
3. **Edge cases**: Empty state, loading, error
4. **User interactions**: Click, type, submit
5. **Accessibility**: Keyboard navigation nếu cần

## Câu lệnh kích hoạt
"test", "viết test", "test for X", "unit test file X"
