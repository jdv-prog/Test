import { labels } from './lib/labels'

// Step 1 starter screen. Real screens (login, dashboard, etc.) come in later steps.
export default function App() {
  return (
    <main className="starter">
      <div className="logo" aria-hidden="true">FaH</div>
      <h1>{labels.appName}</h1>
      <p className="tagline">{labels.tagline}</p>

      <div className="buttons">
        <button type="button" className="btn btn-in" disabled>
          + {labels.moneyIn}
        </button>
        <button type="button" className="btn btn-out" disabled>
          − {labels.moneyOut}
        </button>
      </div>

      <p className="note">Setting up. Login and the ledger are coming next.</p>
    </main>
  )
}
