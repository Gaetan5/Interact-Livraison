import './styles.css';

export default function App() {
  return (
    <main className="app-shell">
      <div className="status-badge">Environment ready</div>
      <h1 className="heading">Your dev server is live</h1>
      <p className="subtext">This minimal app runs on port 3000. You can now add your framework of choice later.</p>
      <div className="action-row">
        <a className="primary-link" href="/">Refresh</a>
      </div>
    </main>
  );
}
