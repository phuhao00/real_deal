# Component Patterns (组件模式)

## Interactive Components (交互组件)

### Button Variants (按钮变体)

#### Primary Button
```tsx
<button className="btn btn-primary">
  Primary Action
</button>

<style>
.btn-primary {
  background: rgb(var(--primary));
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 200ms;
}

.btn-primary:hover {
  background: rgb(var(--primary-hover));
  transform: translateY(-1px);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}
</style>
```

#### Secondary Button
```tsx
<button className="btn btn-secondary">
  Secondary Action
</button>

<style>
.btn-secondary {
  background: transparent;
  color: rgb(var(--fg));
  border: 1px solid rgb(var(--border));
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 200ms;
}

.btn-secondary:hover {
  background: rgb(var(--border) / 0.5);
}
</style>
```

#### Ghost Button
```tsx
<button className="btn btn-ghost">
  Ghost Action
</button>

<style>
.btn-ghost {
  background: transparent;
  color: rgb(var(--fg-secondary));
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 200ms;
}

.btn-ghost:hover {
  background: rgb(var(--border) / 0.5);
  color: rgb(var(--fg));
}
</style>
```

### Input Components (输入组件)

#### Text Input with Label
```tsx
<div className="form-group">
  <label htmlFor="email" className="form-label">
    Email Address
  </label>
  <input
    type="email"
    id="email"
    className="form-input"
    placeholder="you@example.com"
  />
  <p className="form-hint">
    We'll never share your email with anyone else.
  </p>
</div>

<style>
.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 6px;
  color: rgb(var(--fg));
}

.form-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid rgb(var(--border));
  border-radius: 8px;
  font-size: 15px;
  transition: border-color 200ms, box-shadow 200ms;
}

.form-input:focus {
  outline: none;
  border-color: rgb(var(--primary));
  box-shadow: 0 0 0 3px rgb(var(--primary) / 0.1);
}

.form-input::placeholder {
  color: rgb(var(--fg-muted));
}

.form-hint {
  font-size: 13px;
  color: rgb(var(--fg-tertiary));
  margin-top: 4px;
}
</style>
```

#### Search Input
```tsx
<div className="search-wrapper">
  <svg className="search-icon" /* search icon */ />
  <input
    type="search"
    className="search-input"
    placeholder="Search..."
  />
  {hasValue && (
    <button className="search-clear" /* clear button */ />
  )}
</div>

<style>
.search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  width: 18px;
  height: 18px;
  color: rgb(var(--fg-tertiary));
}

.search-input {
  width: 100%;
  padding: 8px 12px 8px 40px;
  border: 1px solid rgb(var(--border));
  border-radius: 8px;
  font-size: 15px;
}

.search-clear {
  position: absolute;
  right: 8px;
}
</style>
```

### Card Components (卡片组件)

#### Content Card
```tsx
<article className="card">
  <div className="card-header">
    <h3 className="card-title">Card Title</h3>
    <span className="card-badge">New</span>
  </div>
  <p className="card-content">
    Card description goes here...
  </p>
  <div className="card-footer">
    <button className="btn-ghost-sm">Action</button>
  </div>
</article>

<style>
.card {
  background: rgb(var(--bg));
  border: 1px solid rgb(var(--border));
  border-radius: 12px;
  padding: 16px;
  transition: box-shadow 200ms, border-color 200ms;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: rgb(var(--fg));
}

.card-content {
  font-size: 14px;
  color: rgb(var(--fg-secondary));
  line-height: 1.6;
  margin-bottom: 16px;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
```

#### Interactive Card
```tsx
<button className="card-interactive">
  <div className="card-icon">🚀</div>
  <h3 className="card-title">Feature Name</h3>
  <p className="card-description">
    Brief description of the feature...
  </p>
  <div className="card-arrow">→</div>
</button>

<style>
.card-interactive {
  background: rgb(var(--bg));
  border: 1px solid rgb(var(--border));
  border-radius: 12px;
  padding: 20px;
  text-align: left;
  transition: all 200ms;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.card-interactive:hover {
  border-color: rgb(var(--primary));
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.card-interactive:active {
  transform: translateY(0);
}

.card-icon {
  font-size: 32px;
  margin-bottom: 12px;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 6px;
}

.card-description {
  font-size: 14px;
  color: rgb(var(--fg-secondary));
}

.card-arrow {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 18px;
  color: rgb(var(--fg-tertiary));
  transition: transform 200ms;
}

.card-interactive:hover .card-arrow {
  transform: translateX(4px);
}
</style>
```

### Display Components (展示组件)

#### Avatar
```tsx
<div className="avatar avatar-md">
  {image ? (
    <img src={image} alt={name} />
  ) : (
    <span className="avatar-fallback">
      {name.charAt(0).toUpperCase()}
    </span>
  )}
  {isOnline && <span className="avatar-indicator" />}
</div>

<style>
.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  overflow: hidden;
  background: rgb(var(--bg-subtle));
  color: rgb(var(--fg));
  font-weight: 600;
  position: relative;
}

.avatar-xs { width: 24px; height: 24px; font-size: 12px; }
.avatar-sm { width: 32px; height: 32px; font-size: 14px; }
.avatar-md { width: 40px; height: 40px; font-size: 16px; }
.avatar-lg { width: 48px; height: 48px; font-size: 18px; }
.avatar-xl { width: 64px; height: 64px; font-size: 24px; }

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-fallback {
  text-transform: uppercase;
}

.avatar-indicator {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  background: #22C55E;
  border: 2px solid rgb(var(--bg));
  border-radius: 9999px;
}
</style>
```

#### Badge
```tsx
<span className={`badge badge-${variant}`}>
  {icon && <span className="badge-icon">{icon}</span>}
  {text}
</span>

<style>
.badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 500;
  white-space: nowrap;
}

.badge-default {
  background: rgb(var(--bg-subtle));
  color: rgb(var(--fg-secondary));
}

.badge-primary {
  background: rgb(var(--primary-light));
  color: rgb(var(--primary));
}

.badge-success {
  background: rgb(var(--success-bg));
  color: rgb(var(--success));
}

.badge-warning {
  background: rgb(var(--warning-bg));
  color: rgb(var(--warning));
}

.badge-error {
  background: rgb(var(--error-bg));
  color: rgb(var(--error));
}

.badge-icon {
  display: flex;
}
</style>
```

### Feedback Components (反馈组件)

#### Toast Notification
```tsx
<div className={`toast toast-${type}`}>
  <div className="toast-icon">{icon}</div>
  <div className="toast-content">
    <h4 className="toast-title">{title}</h4>
    {message && <p className="toast-message">{message}</p>}
  </div>
  <button className="toast-close" aria-label="Close">×</button>
</div>

<style>
.toast {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: slideIn 200ms ease-out;
  max-width: 400px;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.toast-icon {
  display: flex;
  align-items: flex-start;
  padding-top: 2px;
}

.toast-content {
  flex: 1;
}

.toast-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
}

.toast-message {
  font-size: 13px;
  color: rgb(var(--fg-secondary));
}

.toast-close {
  background: none;
  border: none;
  font-size: 18px;
  color: rgb(var(--fg-tertiary));
  cursor: pointer;
  padding: 0;
  line-height: 1;
}
</style>
```

#### Modal
```tsx
<div className="modal-backdrop">
  <div className="modal">
    <div className="modal-header">
      <h2 className="modal-title">Modal Title</h2>
      <button className="modal-close">×</button>
    </div>
    <div className="modal-body">
      Modal content goes here...
    </div>
    <div className="modal-footer">
      <button className="btn btn-ghost">Cancel</button>
      <button className="btn btn-primary">Confirm</button>
    </div>
  </div>
</div>

<style>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
  animation: fadeIn 200ms;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal {
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  animation: scaleIn 200ms;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid rgb(var(--border));
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
}

.modal-close {
  background: none;
  border: none;
  font-size: 24px;
  color: rgb(var(--fg-tertiary));
  cursor: pointer;
  padding: 0;
  line-height: 1;
}

.modal-body {
  padding: 24px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 16px 24px;
  border-top: 1px solid rgb(var(--border));
}
</style>
```

### Navigation Components (导航组件)

#### Tabs
```tsx
<div className="tabs">
  {tabs.map(tab => (
    <button
      key={tab.id}
      className={`tab ${activeTab === tab.id ? 'tab-active' : ''}`}
      onClick={() => setActiveTab(tab.id)}
    >
      {tab.label}
    </button>
  ))}
</div>
<div className="tab-content">
  {activeTab === 'tab1' && <div>Content for tab 1</div>}
  {activeTab === 'tab2' && <div>Content for tab 2</div>}
</div>

<style>
.tabs {
  display: flex;
  border-bottom: 1px solid rgb(var(--border));
  gap: 24px;
}

.tab {
  padding: 12px 0;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: rgb(var(--fg-secondary));
  cursor: pointer;
  position: relative;
  transition: color 200ms;
}

.tab:hover {
  color: rgb(var(--fg));
}

.tab-active {
  color: rgb(var(--primary));
}

.tab-active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: rgb(var(--primary));
}

.tab-content {
  padding: 24px 0;
}
</style>
```

## Best Practices (最佳实践)

1. **Consistency**: Use consistent spacing, colors, and typography
2. **Accessibility**: Ensure keyboard navigation and screen reader support
3. **Performance**: Optimize animations and transitions
4. **Responsive**: Design for all screen sizes
5. **Semantic**: Use proper HTML elements
