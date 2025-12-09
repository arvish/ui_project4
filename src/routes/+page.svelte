<script lang="ts">
  import type { CheckInLog, Neighbor, RiskLevel, SupportNeed, SupportSummaryItem } from '$lib/types';

  const supportLabels: Record<SupportNeed, string> = {
    cooling: 'Cooling supplies',
    water: 'Water delivery',
    ride: 'Ride to center',
    visit: 'In-person visit',
    medical: 'Medical follow-up'
  };

  const riskLabels: Record<RiskLevel, string> = {
    high: 'High risk',
    medium: 'Medium risk',
    low: 'Lower risk'
  };

  let neighbors: Neighbor[] = [
    {
      id: 1,
      name: 'Alicia Chen',
      age: 78,
      location: '12th & Spruce',
      phone: '215-555-1922',
      livingAlone: true,
      risk: 'high',
      needs: ['cooling', 'water', 'visit'],
      notes: 'Prefers phone calls. Fan broke last week.',
      lastCheckIn: '2025-07-19T09:15:00',
      lastNote: 'Answered phone, still needs fan.',
      nextCheckIn: '2025-07-19T18:00:00'
    },
    {
      id: 2,
      name: 'Ramon Ortiz',
      age: 66,
      location: '13th & Pine',
      phone: '215-555-1182',
      livingAlone: false,
      risk: 'medium',
      needs: ['water', 'ride'],
      notes: 'Lives with grandson. Needs ride if warnings escalate.',
      lastCheckIn: '2025-07-18T20:30:00',
      lastNote: 'Dropped off case of water.',
      nextCheckIn: '2025-07-20T10:00:00'
    },
    {
      id: 3,
      name: 'Daria Kline',
      age: 54,
      location: '11th & Pine',
      phone: '215-555-2240',
      livingAlone: true,
      risk: 'high',
      needs: ['cooling', 'medical'],
      notes: 'COPD; prefers text. Apartment AC flickers.',
      lastCheckIn: '2025-07-18T21:45:00',
      lastNote: 'Breathing ok; waiting on spare AC.',
      nextCheckIn: '2025-07-19T14:00:00'
    },
    {
      id: 4,
      name: 'Nia McBride',
      age: 31,
      location: '10th & South',
      phone: '215-555-1022',
      livingAlone: false,
      risk: 'medium',
      needs: ['visit'],
      notes: 'Single parent with toddler. Requests evening check-in.',
      lastCheckIn: '2025-07-19T08:10:00',
      lastNote: 'Doing ok; asked for reminder tonight.',
      nextCheckIn: '2025-07-19T19:30:00'
    },
    {
      id: 5,
      name: 'Andre Miller',
      age: 83,
      location: '9th & Catherine',
      phone: '215-555-3302',
      livingAlone: true,
      risk: 'low',
      needs: ['water'],
      notes: 'Has AC but avoids going outside; check if alerts spike.',
      lastCheckIn: '2025-07-17T17:00:00',
      lastNote: 'Left message; no callback yet.',
      nextCheckIn: '2025-07-20T12:00:00'
    }
  ];

  let checkIns: CheckInLog[] = [
    {
      id: 1,
      neighborId: 1,
      note: 'Answered phone; promised to stay near fan.',
      timestamp: '2025-07-19T09:15:00'
    },
    {
      id: 2,
      neighborId: 3,
      note: 'Delivered electrolyte mix. AC still flickering.',
      timestamp: '2025-07-18T21:45:00'
    },
    {
      id: 3,
      neighborId: 2,
      note: 'Dropped off water case; set reminder for cooling center ride.',
      timestamp: '2025-07-18T20:30:00'
    }
  ];

  let filters: { risk: RiskLevel | 'all'; support: SupportNeed | 'all'; query: string } = {
    risk: 'all',
    support: 'all',
    query: ''
  };

  let newNeighbor: Omit<Neighbor, 'id'> = {
    name: '',
    age: 65,
    location: '',
    phone: '',
    livingAlone: false,
    risk: 'medium',
    needs: ['visit'],
    notes: '',
    nextCheckIn: '',
    lastCheckIn: undefined,
    lastNote: ''
  };

  const needOptions: { value: SupportNeed; label: string }[] = (
    Object.keys(supportLabels) as SupportNeed[]
  ).map((need) => ({ value: need, label: supportLabels[need] }));

  const riskOrder: RiskLevel[] = ['high', 'medium', 'low'];

  const formatDate = (input?: string) =>
    input ? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(input)) : 'Not set';

  const supportSummary = (): SupportSummaryItem[] => {
    const summary = new Map<SupportNeed, number>();

    neighbors.forEach((neighbor) => {
      neighbor.needs.forEach((need) => {
        summary.set(need, (summary.get(need) ?? 0) + 1);
      });
    });

    return needOptions
      .map(({ value, label }) => ({
        need: value,
        label,
        count: summary.get(value) ?? 0
      }))
      .filter((item) => item.count > 0)
      .sort((a, b) => b.count - a.count);
  };

  const filteredNeighbors = () => {
    return neighbors
      .filter((neighbor) => filters.risk === 'all' || neighbor.risk === filters.risk)
      .filter(
        (neighbor) => filters.support === 'all' || neighbor.needs.some((need) => need === filters.support)
      )
      .filter((neighbor) => {
        if (!filters.query.trim()) return true;
        const term = filters.query.toLowerCase();
        return (
          neighbor.name.toLowerCase().includes(term) ||
          neighbor.location.toLowerCase().includes(term) ||
          neighbor.notes.toLowerCase().includes(term)
        );
      })
      .sort((a, b) => riskOrder.indexOf(a.risk) - riskOrder.indexOf(b.risk));
  };

  const riskTagClass = (risk: RiskLevel) => {
    if (risk === 'high') return 'pill danger';
    if (risk === 'medium') return 'pill warning';
    return 'pill success';
  };

  const neighborNeedBadges = (needs: SupportNeed[]) =>
    needs.map((need) => `${supportLabels[need]}`).join(', ');

  const addNeighbor = () => {
    if (!newNeighbor.name.trim() || !newNeighbor.location.trim()) {
      alert('Please add a name and block/location.');
      return;
    }

    const id = Math.max(0, ...neighbors.map((neighbor) => neighbor.id)) + 1;
    const created: Neighbor = { id, ...newNeighbor };
    neighbors = [...neighbors, created];
    checkIns = [
      {
        id: Math.max(0, ...checkIns.map((log) => log.id)) + 1,
        neighborId: id,
        note: 'Added to roster',
        timestamp: new Date().toISOString()
      },
      ...checkIns
    ];

    newNeighbor = {
      name: '',
      age: 65,
      location: '',
      phone: '',
      livingAlone: false,
      risk: 'medium',
      needs: ['visit'],
      notes: '',
      lastCheckIn: undefined,
      lastNote: '',
      nextCheckIn: ''
    };
  };

  const toggleNeed = (need: SupportNeed) => {
    if (newNeighbor.needs.includes(need)) {
      newNeighbor = { ...newNeighbor, needs: newNeighbor.needs.filter((item) => item !== need) };
    } else {
      newNeighbor = { ...newNeighbor, needs: [...newNeighbor.needs, need] };
    }
  };

  const logCheckIn = (neighborId: number, note: string) => {
    const trimmed = note.trim();
    const timestamp = new Date().toISOString();
    const log: CheckInLog = {
      id: Math.max(0, ...checkIns.map((entry) => entry.id)) + 1,
      neighborId,
      note: trimmed || 'Check-in logged',
      timestamp
    };

    checkIns = [log, ...checkIns];
    neighbors = neighbors.map((neighbor) =>
      neighbor.id === neighborId
        ? { ...neighbor, lastCheckIn: timestamp, lastNote: trimmed || neighbor.lastNote }
        : neighbor
    );
  };
</script>

<svelte:head>
  <title>HeatSafe Check-In Dashboard</title>
  <meta
    name="description"
    content="SvelteKit prototype to coordinate neighbor well-being during extreme heat events"
  />
</svelte:head>

<main class="page">
  <header class="hero">
    <div>
      <p class="eyebrow">HeatSafe mutual-aid</p>
      <h1>Block check-ins during heat alerts</h1>
      <p class="lede">
        Track at-risk neighbors, log check-ins, and keep resource requests in one lightweight
        dashboard.
      </p>
      <div class="tag-row">
        <span class="pill danger">High heat alert today</span>
        <span class="pill">Goal: all high-risk neighbors checked by 6pm</span>
      </div>
    </div>
    <section class="summary">
      <div>
        <p class="label">High-risk neighbors</p>
        <p class="metric">{neighbors.filter((neighbor) => neighbor.risk === 'high').length}</p>
      </div>
      <div>
        <p class="label">Check-ins today</p>
        <p class="metric">{checkIns.filter((log) => new Date(log.timestamp).getDate() === new Date().getDate()).length}</p>
      </div>
      <div>
        <p class="label">Outstanding needs</p>
        <p class="metric">{supportSummary().reduce((total, item) => total + item.count, 0)}</p>
      </div>
    </section>
  </header>

  <section class="layout">
    <div class="panel">
      <div class="panel-header">
        <div>
          <p class="label">Roster</p>
          <h2>Neighbors to check today</h2>
        </div>
        <div class="filters">
          <label>
            Risk
            <select bind:value={filters.risk}>
              <option value="all">All</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </label>
          <label>
            Need
            <select bind:value={filters.support}>
              <option value="all">All</option>
              {#each needOptions as need}
                <option value={need.value}>{need.label}</option>
              {/each}
            </select>
          </label>
          <label>
            Search
            <input
              type="search"
              placeholder="Name, block, or notes"
              bind:value={filters.query}
              aria-label="Search neighbors"
            />
          </label>
        </div>
      </div>

      <div class="neighbor-list">
        {#if filteredNeighbors().length === 0}
          <p class="muted">No neighbors match the current filters.</p>
        {:else}
          {#each filteredNeighbors() as neighbor}
            <article class="neighbor-card">
              <div class="neighbor-main">
                <div>
                  <p class="name">{neighbor.name}</p>
                  <p class="meta">{neighbor.age} • {neighbor.location}</p>
                  <p class="notes">{neighbor.notes}</p>
                  <div class="tag-row">
                    <span class={riskTagClass(neighbor.risk)}>{riskLabels[neighbor.risk]}</span>
                    <span class="pill subtle">{neighborNeedBadges(neighbor.needs)}</span>
                    {#if neighbor.livingAlone}
                      <span class="pill outline">Lives alone</span>
                    {/if}
                  </div>
                </div>
                <div class="actions">
                  <p class="label">Last contact</p>
                  <p class="meta">{neighbor.lastCheckIn ? formatDate(neighbor.lastCheckIn) : 'No check-in logged'}</p>
                  <p class="meta small">{neighbor.lastNote || '—'}</p>
                  <button class="primary" on:click={() => logCheckIn(neighbor.id, 'Checked in; no issues')}>Log check-in</button>
                </div>
              </div>
              <div class="footer-row">
                <p class="meta">Next follow-up: {formatDate(neighbor.nextCheckIn)}</p>
                <p class="meta">Contact: {neighbor.phone}</p>
              </div>
            </article>
          {/each}
        {/if}
      </div>
    </div>

    <aside class="sidebar">
      <section class="side-card">
        <div class="side-card-header">
          <div>
            <p class="label">Action queue</p>
            <h3>Support needs</h3>
          </div>
        </div>
        <ul class="summary-list">
          {#if supportSummary().length === 0}
            <li class="muted">No outstanding needs.</li>
          {:else}
            {#each supportSummary() as item}
              <li class="summary-row">
                <div>
                  <p class="summary-title">{item.label}</p>
                  <p class="meta">Requested by {neighbors.filter((neighbor) => neighbor.needs.includes(item.need)).length} neighbors</p>
                </div>
                <span class="pill subtle">{item.count}</span>
              </li>
            {/each}
          {/if}
        </ul>
      </section>

      <section class="side-card">
        <div class="side-card-header">
          <div>
            <p class="label">Log</p>
            <h3>Recent check-ins</h3>
          </div>
        </div>
        <ul class="timeline">
          {#each checkIns.slice(0, 6) as log}
            {#if neighbors.find((neighbor) => neighbor.id === log.neighborId) as match}
              <li>
                <p class="summary-title">{match.name}</p>
                <p class="meta">{formatDate(log.timestamp)}</p>
                <p class="meta small">{log.note}</p>
              </li>
            {/if}
          {/each}
        </ul>
      </section>

      <section class="side-card">
        <div class="side-card-header">
          <div>
            <p class="label">Add neighbor</p>
            <h3>Quick intake</h3>
          </div>
        </div>
        <form class="intake" on:submit|preventDefault={addNeighbor}>
          <label>
            Name
            <input type="text" bind:value={newNeighbor.name} placeholder="Full name" required />
          </label>
          <div class="split">
            <label>
              Age
              <input type="number" min="1" bind:value={newNeighbor.age} />
            </label>
            <label>
              Risk level
              <select bind:value={newNeighbor.risk}>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </label>
          </div>
          <label>
            Block / building
            <input type="text" bind:value={newNeighbor.location} placeholder="e.g., 12th & Spruce" required />
          </label>
          <label>
            Phone
            <input type="tel" bind:value={newNeighbor.phone} placeholder="Contact for follow-ups" />
          </label>
          <fieldset>
            <legend>Requested help</legend>
            <div class="checkbox-grid">
              {#each needOptions as need}
                <label class="checkbox">
                  <input
                    type="checkbox"
                    checked={newNeighbor.needs.includes(need.value)}
                    on:change={() => toggleNeed(need.value)}
                  />
                  <span>{need.label}</span>
                </label>
              {/each}
            </div>
          </fieldset>
          <label class="checkbox inline">
            <input type="checkbox" bind:checked={newNeighbor.livingAlone} />
            <span>Lives alone</span>
          </label>
          <label>
            Notes
            <textarea rows="3" bind:value={newNeighbor.notes} placeholder="Communication preferences, health notes"></textarea>
          </label>
          <label>
            Next check-in
            <input type="datetime-local" bind:value={newNeighbor.nextCheckIn} />
          </label>
          <button class="primary" type="submit">Add to roster</button>
        </form>
      </section>
    </aside>
  </section>
</main>

<style>
  :global(body) {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    background: #0c1117;
    color: #e9eef5;
    margin: 0;
  }

  :global(*) {
    box-sizing: border-box;
  }

  main.page {
    padding: 1.5rem clamp(1rem, 3vw, 2.5rem) 3rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .hero {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1rem;
    padding: 1.5rem;
    border: 1px solid #1f2a3a;
    border-radius: 14px;
    background: radial-gradient(120% 120% at 10% 10%, rgba(255, 134, 86, 0.12), transparent),
      linear-gradient(135deg, rgba(28, 58, 94, 0.7), rgba(12, 17, 23, 0.9));
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.35);
  }

  .eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-size: 0.75rem;
    color: #8fb3ff;
    margin: 0 0 0.35rem;
  }

  h1 {
    margin: 0 0 0.5rem;
    font-size: clamp(1.5rem, 3vw, 2.1rem);
  }

  .lede {
    color: #c4d0dd;
    margin: 0 0 0.75rem;
    line-height: 1.5;
  }

  .summary {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.75rem;
    align-self: center;
  }

  .summary .metric {
    font-size: 2rem;
    font-weight: 700;
    margin: 0.1rem 0 0;
  }

  .layout {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1rem;
    margin-top: 1.25rem;
  }

  .panel {
    background: #0f1621;
    border: 1px solid #1f2a3a;
    border-radius: 14px;
    padding: 1rem 1.2rem;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.25);
  }

  .panel-header {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
    align-items: flex-start;
    margin-bottom: 0.75rem;
  }

  .label {
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 0.72rem;
    color: #8ea0b5;
    margin: 0;
  }

  .filters {
    display: flex;
    gap: 0.5rem;
    align-items: flex-end;
    flex-wrap: wrap;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    font-size: 0.9rem;
    color: #d4deea;
  }

  input,
  select,
  textarea {
    background: #101827;
    color: #e9eef5;
    border: 1px solid #223249;
    border-radius: 10px;
    padding: 0.55rem 0.7rem;
    font-size: 0.95rem;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  input:focus,
  select:focus,
  textarea:focus {
    outline: none;
    border-color: #5ea1ff;
    box-shadow: 0 0 0 3px rgba(94, 161, 255, 0.2);
  }

  .neighbor-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .neighbor-card {
    border: 1px solid #1f2a3a;
    background: #0c1117;
    border-radius: 14px;
    padding: 0.9rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
  }

  .neighbor-main {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: flex-start;
  }

  .name {
    margin: 0;
    font-weight: 700;
    font-size: 1.05rem;
  }

  .meta {
    color: #9eb0c5;
    margin: 0.2rem 0 0;
  }

  .meta.small {
    font-size: 0.85rem;
  }

  .notes {
    color: #d4deea;
    margin: 0.35rem 0;
    line-height: 1.4;
  }

  .tag-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    align-items: center;
  }

  .pill {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.35rem 0.6rem;
    border-radius: 999px;
    border: 1px solid #223249;
    background: rgba(255, 255, 255, 0.04);
    color: #d4deea;
    font-size: 0.85rem;
  }

  .pill.subtle {
    border-color: #263549;
    color: #a9b9cf;
  }

  .pill.outline {
    border-style: dashed;
  }

  .pill.danger {
    border-color: rgba(255, 99, 71, 0.6);
    background: rgba(255, 99, 71, 0.15);
    color: #ffb4a3;
  }

  .pill.warning {
    border-color: rgba(255, 186, 85, 0.6);
    background: rgba(255, 186, 85, 0.15);
    color: #ffd197;
  }

  .pill.success {
    border-color: rgba(82, 196, 139, 0.6);
    background: rgba(82, 196, 139, 0.12);
    color: #b9f6d3;
  }

  .actions {
    min-width: 240px;
    text-align: right;
  }

  button.primary {
    background: linear-gradient(135deg, #5393ff, #3dd6ed);
    color: #0c1117;
    font-weight: 700;
    border: none;
    border-radius: 12px;
    padding: 0.55rem 0.85rem;
    cursor: pointer;
    box-shadow: 0 12px 35px rgba(68, 149, 255, 0.3);
    transition: transform 0.15s ease, box-shadow 0.2s ease;
    width: 100%;
  }

  button.primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 15px 40px rgba(68, 149, 255, 0.4);
  }

  .footer-row {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .side-card {
    background: #0f1621;
    border: 1px solid #1f2a3a;
    border-radius: 14px;
    padding: 0.9rem 1rem;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.22);
  }

  .side-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.65rem;
  }

  .summary-list,
  .timeline {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    align-items: center;
    padding: 0.6rem 0.5rem;
    border-radius: 10px;
    border: 1px solid #1f2a3a;
    background: #0c1117;
  }

  .summary-title {
    margin: 0;
    font-weight: 600;
  }

  .timeline li {
    padding: 0.65rem;
    border-radius: 10px;
    background: #0c1117;
    border: 1px solid #1f2a3a;
  }

  .intake {
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
  }

  fieldset {
    border: 1px dashed #1f2a3a;
    border-radius: 12px;
    padding: 0.6rem 0.8rem 0.7rem;
  }

  legend {
    padding: 0 0.35rem;
    color: #9eb0c5;
    font-size: 0.85rem;
  }

  .checkbox-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.4rem;
    margin-top: 0.35rem;
  }

  .checkbox {
    flex-direction: row;
    align-items: center;
    gap: 0.4rem;
    cursor: pointer;
  }

  .checkbox input {
    width: 1.05rem;
    height: 1.05rem;
  }

  .checkbox.inline {
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }

  .split {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.6rem;
  }

  .muted {
    color: #8ea0b5;
    margin: 0.4rem 0;
  }

  @media (max-width: 1000px) {
    .layout,
    .hero {
      grid-template-columns: 1fr;
    }

    .neighbor-main {
      flex-direction: column;
    }

    .actions {
      width: 100%;
      text-align: left;
    }

    .summary {
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    }
  }
</style>
