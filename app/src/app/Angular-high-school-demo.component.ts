import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-angular-high-school-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page" [class.dark]="darkMode()">
      <div class="bg-grid"></div>

      <header class="hero card">
        <div>
          <p class="eyebrow">ANGULAR LIVE DEMO</p>
          <h1>Build a Web App in Front of the Class</h1>
          <p class="subtitle">
            This mini app shows what frontend, backend, interactivity, and
            deployment feel like — in one fun demo.
          </p>
        </div>

        <div class="hero-actions">
          <button class="btn primary" (click)="toggleDarkMode()">
            {{ darkMode() ? '☀️ Light Mode' : '🌙 Dark Mode' }}
          </button>
          <button class="btn" (click)="addHype()">+ Hype</button>
        </div>
      </header>

      <section class="stats-grid">
        <article class="card stat">
          <span class="label">Live Reactions</span>
          <strong>{{ hypeLevel() }}</strong>
          <small>Every click updates instantly with Angular</small>
        </article>

        <article class="card stat">
          <span class="label">Frontend Score</span>
          <strong>{{ score().frontend }}</strong>
          <small>UI, colors, animations, buttons</small>
        </article>

        <article class="card stat">
          <span class="label">Backend Score</span>
          <strong>{{ score().backend }}</strong>
          <small>Databases, logins, APIs, servers</small>
        </article>
      </section>

      <section class="two-col">
        <article class="card">
          <div class="section-title-row">
            <h2>🎮 Frontend vs Backend Game</h2>
            <button class="link-btn" (click)="resetGame()">Reset</button>
          </div>
          <p class="muted">Ask the class to guess before you click.</p>

          <div class="challenge-list">
            <button
              *ngFor="let item of challenges"
              class="challenge"
              [class.answered]="item.revealed"
              (click)="reveal(item.id)"
            >
              <div>
                <strong>{{ item.prompt }}</strong>
                <span *ngIf="item.revealed">→ {{ item.answer }}</span>
                <span *ngIf="!item.revealed">→ Click to reveal</span>
              </div>
            </button>
          </div>
        </article>

        <article class="card">
          <h2>⚡ Fake API Demo</h2>
          <p class="muted">
            Type a username to simulate a backend check. This is a great way to
            explain what an API does.
          </p>

          <label class="input-label" for="username">Choose a gamer tag</label>
          <input
            id="username"
            class="input"
            [value]="username()"
            (input)="onUsernameInput($any($event.target).value)"
            placeholder="type something like angular_ninja"
          />

          <div class="api-box" [class.loading]="checking()">
            <ng-container *ngIf="checking(); else apiResult">
              <div class="spinner"></div>
              <span>Checking server...</span>
            </ng-container>

            <ng-template #apiResult>
              <strong>{{ availabilityTitle() }}</strong>
              <p>{{ availabilityMessage() }}</p>
            </ng-template>
          </div>

          <div class="talk-track">
            <strong>What to say:</strong>
            <p>
              “The frontend sends the username. The backend checks if it exists.
              Then the UI updates.”
            </p>
          </div>
        </article>
      </section>

      <section class="two-col">
        <article class="card">
          <h2>🎨 Theme + Style = Frontend Power</h2>
          <p class="muted">
            Angular updates the page immediately when state changes.
          </p>

          <div class="swatches">
            <button class="swatch cyan" (click)="setAccent('cyan')">
              Cyan
            </button>
            <button class="swatch purple" (click)="setAccent('purple')">
              Purple
            </button>
            <button class="swatch orange" (click)="setAccent('orange')">
              Orange
            </button>
          </div>

          <div class="preview" [attr.data-accent]="accent()">
            <div class="preview-card">
              <span class="dot"></span>
              <strong>Student App Preview</strong>
              <p>Your style choices are code too.</p>
            </div>
          </div>
        </article>

        <article class="card">
          <h2>🚀 Deploy Button Moment</h2>
          <p class="muted">
            Use this to explain that writing code is only part of the job.
          </p>

          <button
            class="btn primary big"
            (click)="deploy()"
            [disabled]="deploying()"
          >
            {{ deploying() ? 'Deploying...' : 'Deploy App' }}
          </button>

          <div class="deploy-status" *ngIf="deployMessage()">
            {{ deployMessage() }}
          </div>

          <ul class="mini-list">
            <li>GitHub stores the code</li>
            <li>Docker packages the app</li>
            <li>Deployment puts it on the internet</li>
          </ul>
        </article>
      </section>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        font-family: Inter, Arial, Helvetica, sans-serif;
        color: #e5eefb;
      }

      * {
        box-sizing: border-box;
      }

      .page {
        --bg: linear-gradient(135deg, #eaeaea 0%, #b0b0b0 100%);
        --card: rgb(140, 14, 128);
        --border: rgba(140, 180, 255, 0.16);
        --accent: #4de2ff;
        --accent-2: #8b5cf6;
        --text: #e5eefb;
        --muted: #9fb3d9;
        min-height: 100vh;
        background: var(--bg);
        color: var(--text);
        padding: 32px;
        position: relative;
        overflow: hidden;
      }

      .page.dark {
        --bg: linear-gradient(135deg, #08111f 0%, #0f1f3a 100%);
        --card: rgba(7, 12, 24, 0.88);
      }

      .bg-grid {
        position: fixed;
        inset: 0;
        background-image:
          linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
        background-size: 32px 32px;
        mask-image: radial-gradient(
          circle at center,
          black 35%,
          transparent 85%
        );
        pointer-events: none;
      }

      .hero,
      .card {
        position: relative;
        z-index: 1;
      }

      .card {
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: 24px;
        padding: 24px;
        backdrop-filter: blur(12px);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.28);
      }

      .hero {
        display: flex;
        justify-content: space-between;
        gap: 24px;
        align-items: center;
        margin-bottom: 24px;
      }

      .eyebrow {
        color: var(--accent);
        font-weight: 800;
        letter-spacing: 0.16em;
        font-size: 12px;
        margin: 0 0 8px;
      }

      h1 {
        margin: 0;
        font-size: clamp(32px, 5vw, 56px);
        line-height: 1;
      }

      h2 {
        margin: 0 0 8px;
        font-size: 24px;
      }

      .subtitle,
      .muted,
      .talk-track p,
      .deploy-status,
      .mini-list,
      .stat small {
        color: var(--muted);
      }

      .subtitle {
        max-width: 680px;
        font-size: 18px;
        margin-top: 12px;
      }

      .hero-actions {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
      }

      .btn,
      .challenge,
      .swatch,
      .link-btn {
        border: none;
        cursor: pointer;
        transition:
          transform 0.18s ease,
          box-shadow 0.18s ease,
          opacity 0.18s ease;
      }

      .btn:hover,
      .challenge:hover,
      .swatch:hover,
      .link-btn:hover {
        transform: translateY(-2px);
      }

      .btn {
        border-radius: 14px;
        padding: 12px 18px;
        font-weight: 700;
        background: rgba(255, 255, 255, 0.08);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.08);
      }

      .btn.primary {
        background: linear-gradient(135deg, var(--accent), var(--accent-2));
        color: #08111f;
        box-shadow: 0 12px 28px rgba(77, 226, 255, 0.22);
      }

      .btn.big {
        width: 100%;
        padding: 16px 22px;
        font-size: 18px;
      }

      .btn:disabled {
        opacity: 0.7;
        cursor: wait;
      }

      .stats-grid,
      .two-col {
        display: grid;
        gap: 20px;
        margin-bottom: 20px;
      }

      .stats-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      .two-col {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .stat {
        min-height: 150px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .stat strong {
        font-size: 42px;
        margin: 8px 0;
      }

      .label {
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-size: 12px;
        color: var(--accent);
        font-weight: 800;
      }

      .section-title-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }

      .link-btn {
        background: transparent;
        color: var(--accent);
        font-weight: 700;
      }

      .challenge-list {
        display: grid;
        gap: 12px;
        margin-top: 18px;
      }

      .challenge {
        width: 100%;
        text-align: left;
        border-radius: 18px;
        padding: 16px;
        background: rgba(255, 255, 255, 0.05);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.06);
      }

      .challenge div {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        flex-wrap: wrap;
      }

      .challenge span {
        color: var(--muted);
      }

      .challenge.answered {
        outline: 1px solid rgba(77, 226, 255, 0.35);
        background: rgba(77, 226, 255, 0.08);
      }

      .input-label {
        display: block;
        margin: 18px 0 8px;
        font-size: 14px;
        color: var(--muted);
      }

      .input {
        width: 100%;
        border-radius: 14px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(255, 255, 255, 0.04);
        color: white;
        padding: 14px 16px;
        font-size: 16px;
        outline: none;
      }

      .input:focus {
        border-color: var(--accent);
        box-shadow: 0 0 0 4px rgba(77, 226, 255, 0.12);
      }

      .api-box {
        margin-top: 16px;
        border-radius: 18px;
        min-height: 110px;
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 18px;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.06);
      }

      .api-box strong {
        display: block;
        margin-bottom: 6px;
        font-size: 18px;
      }

      .spinner {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        border: 3px solid rgba(255, 255, 255, 0.2);
        border-top-color: var(--accent);
        animation: spin 0.8s linear infinite;
      }

      .talk-track {
        margin-top: 18px;
        border-left: 3px solid var(--accent);
        padding-left: 14px;
      }

      .swatches {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
        margin: 18px 0;
      }

      .swatch {
        color: white;
        border-radius: 999px;
        padding: 10px 16px;
        font-weight: 700;
      }

      .swatch.cyan {
        background: #06b6d4;
      }
      .swatch.purple {
        background: #8b5cf6;
      }
      .swatch.orange {
        background: #f97316;
      }

      .preview {
        padding: 18px;
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.06);
      }

      .preview[data-accent='cyan'] .preview-card {
        --preview-accent: #06b6d4;
      }
      .preview[data-accent='purple'] .preview-card {
        --preview-accent: #8b5cf6;
      }
      .preview[data-accent='orange'] .preview-card {
        --preview-accent: #f97316;
      }

      .preview-card {
        --preview-accent: #06b6d4;
        border-radius: 18px;
        padding: 20px;
        background: linear-gradient(
          135deg,
          color-mix(in srgb, var(--preview-accent) 22%, #09111f),
          #0d1729
        );
        border: 1px solid
          color-mix(
            in srgb,
            var(--preview-accent) 45%,
            rgba(255, 255, 255, 0.08)
          );
      }

      .dot {
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: var(--preview-accent);
        box-shadow: 0 0 20px var(--preview-accent);
        margin-right: 8px;
        vertical-align: middle;
      }

      .mini-list {
        margin: 18px 0 0;
        padding-left: 18px;
        line-height: 1.7;
      }

      .deploy-status {
        margin-top: 14px;
        min-height: 24px;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      @media (max-width: 900px) {
        .hero,
        .stats-grid,
        .two-col {
          grid-template-columns: 1fr;
        }

        .hero {
          align-items: flex-start;
        }
      }
    `,
  ],
})
export class AngularHighSchoolDemoComponent {
  darkMode = signal(true);
  hypeLevel = signal(0);
  accent = signal<'cyan' | 'purple' | 'orange'>('cyan');
  username = signal('');
  checking = signal(false);
  usernameAvailable = signal<boolean | null>(null);
  deploying = signal(false);
  deployMessage = signal('');

  challenges = [
    {
      id: 1,
      prompt: 'Changing a button color',
      answer: 'Frontend',
      revealed: false,
    },
    {
      id: 2,
      prompt: 'Saving a password securely',
      answer: 'Backend',
      revealed: false,
    },
    { id: 3, prompt: 'Animating a menu', answer: 'Frontend', revealed: false },
    {
      id: 4,
      prompt: 'Checking if a username exists',
      answer: 'Backend',
      revealed: false,
    },
    {
      id: 5,
      prompt: 'Showing notifications on screen',
      answer: 'Frontend',
      revealed: false,
    },
  ];

  score = computed(() => {
    const frontend = this.challenges.filter(
      (x) => x.revealed && x.answer === 'Frontend',
    ).length;
    const backend = this.challenges.filter(
      (x) => x.revealed && x.answer === 'Backend',
    ).length;
    return { frontend, backend };
  });

  availabilityTitle = computed(() => {
    if (!this.username()) return 'Waiting for input';
    if (this.usernameAvailable() === null) return 'Type a username';
    return this.usernameAvailable() ? '✅ Available' : '❌ Already taken';
  });

  availabilityMessage = computed(() => {
    if (!this.username())
      return 'Try typing a username to simulate a backend request.';
    if (this.usernameAvailable() === null)
      return 'The server response will appear here.';
    return this.usernameAvailable()
      ? 'The backend says this username can be used.'
      : 'The backend found a match, so the user must choose another name.';
  });

  toggleDarkMode() {
    this.darkMode.update((v) => !v);
  }

  addHype() {
    this.hypeLevel.update((v) => v + 1);
  }

  reveal(id: number) {
    const item = this.challenges.find((x) => x.id === id);
    if (item && !item.revealed) {
      item.revealed = true;
      this.hypeLevel.update((v) => v + 3);
    }
  }

  resetGame() {
    this.challenges = this.challenges.map((item) => ({
      ...item,
      revealed: false,
    }));
  }

  setAccent(accent: 'cyan' | 'purple' | 'orange') {
    this.accent.set(accent);
  }

  onUsernameInput(value: string) {
    this.username.set(value);
    this.usernameAvailable.set(null);

    if (!value.trim()) {
      this.checking.set(false);
      return;
    }

    this.checking.set(true);

    const takenNames = ['admin', 'tiktokboss', 'angular', 'keith', 'root'];
    setTimeout(() => {
      const isAvailable =
        !takenNames.includes(value.trim().toLowerCase()) &&
        value.trim().length >= 4;
      this.usernameAvailable.set(isAvailable);
      this.checking.set(false);
    }, 900);
  }

  deploy() {
    this.deploying.set(true);
    this.deployMessage.set('Packaging app... sending to the cloud...');

    setTimeout(() => {
      this.deploying.set(false);
      this.deployMessage.set('✅ Deployment complete. Your app is live.');
      this.hypeLevel.update((v) => v + 5);
    }, 1400);
  }
}
