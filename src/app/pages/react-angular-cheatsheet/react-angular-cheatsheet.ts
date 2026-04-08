import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { RouterLink } from '@angular/router';

interface Mapping {
  from: string;
  to: string;
}

interface Section {
  id: string;
  icon: string;
  title: string;
  react: string;
  angular: string;
  mappings: Mapping[];
}

interface Row {
  react: string;
  angular: string;
}

@Component({
  selector: 'app-react-angular-cheatsheet',
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './react-angular-cheatsheet.html',
  styleUrl: './react-angular-cheatsheet.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactAngularCheatsheet {
  readonly philosophy: Row[] = [
    { react: 'JS-first (JSX)', angular: 'HTML-first (templates)' },
    { react: 'Everything is a component', angular: 'Clear separation of concerns' },
    { react: 'Hooks for logic', angular: 'Services + DI' },
    { react: 'Props / state', angular: 'Inputs + signals' },
  ];

  readonly quickRef: Row[] = [
    { react: 'useState', angular: 'signal()' },
    { react: 'useMemo', angular: 'computed()' },
    { react: 'useEffect', angular: 'effect()' },
    { react: 'custom hook', angular: 'service' },
    { react: 'DOM hook', angular: 'directive' },
    { react: 'helper fn', angular: 'pipe' },
    { react: 'useContext', angular: 'inject()' },
    { react: 'onClick', angular: '(click)' },
    { react: '{expr &&}', angular: '@if' },
    { react: '.map()', angular: '@for' },
  ];

  readonly sections: Section[] = [
    {
      id: 'components',
      icon: '🧩',
      title: 'Components',
      react: `function UserCard({ user }) {\n  return <div>{user.name}</div>;\n}`,
      angular: `@Component({\n  selector: 'app-user-card',\n  template: \`<div>{{ user().name }}</div>\`\n})\nexport class UserCard {\n  user = input.required<User>();\n}`,
      mappings: [
        { from: 'props', to: 'input()' },
        { from: 'JSX', to: 'HTML template' },
      ],
    },
    {
      id: 'state',
      icon: '🔄',
      title: 'State Management',
      react: `const [count, setCount] = useState(0);`,
      angular: `count = signal(0);\n\nincrement() {\n  this.count.update(v => v + 1);\n}`,
      mappings: [{ from: 'useState', to: 'signal()' }],
    },
    {
      id: 'derived',
      icon: '📐',
      title: 'Derived State',
      react: `const filtered = useMemo(() =>\n  users.filter(u => u.active)\n, [users]);`,
      angular: `filtered = computed(() =>\n  this.users().filter(u => u.active)\n);`,
      mappings: [{ from: 'useMemo', to: 'computed()' }],
    },
    {
      id: 'effects',
      icon: '⚡',
      title: 'Side Effects',
      react: `useEffect(() => {\n  console.log(count);\n}, [count]);`,
      angular: `effect(() => {\n  console.log(this.count());\n});`,
      mappings: [{ from: 'useEffect', to: 'effect()' }],
    },
    {
      id: 'fetching',
      icon: '🌐',
      title: 'Data Fetching',
      react: `useEffect(() => {\n  fetch('/api').then(setData);\n}, []);`,
      angular: `private api = inject(ApiService);\n\nngOnInit() {\n  this.api.getData().subscribe(d => {\n    this.data.set(d);\n  });\n}`,
      mappings: [
        { from: 'fetch', to: 'service method' },
        { from: 'useEffect([], [])', to: 'ngOnInit / effect()' },
      ],
    },
    {
      id: 'logic-reuse',
      icon: '🧠',
      title: 'Logic Reuse',
      react: `function useAuth() {\n  return { user, login };\n}`,
      angular: `@Injectable({ providedIn: 'root' })\nexport class AuthService {\n  user = signal<User | null>(null);\n  login() {}\n}`,
      mappings: [{ from: 'custom hook', to: 'service (DI-powered)' }],
    },
    {
      id: 'conditionals',
      icon: '🔀',
      title: 'Conditional Rendering',
      react: `{isLoggedIn && <Dashboard />}`,
      angular: `@if (isLoggedIn) {\n  <app-dashboard />\n}`,
      mappings: [{ from: '{expr &&}', to: '@if' }],
    },
    {
      id: 'lists',
      icon: '📋',
      title: 'Lists',
      react: `{users.map(u => (\n  <User key={u.id} user={u} />\n))}`,
      angular: `@for (user of users; track user.id) {\n  <app-user [user]="user" />\n}`,
      mappings: [{ from: '.map() + key', to: '@for ... track' }],
    },
    {
      id: 'events',
      icon: '🎯',
      title: 'Events',
      react: `<button onClick={handleClick}>Click</button>`,
      angular: `<button (click)="handleClick()">Click</button>`,
      mappings: [{ from: 'onClick', to: '(click)' }],
    },
    {
      id: 'two-way',
      icon: '🔗',
      title: 'Two-way Binding',
      react: `<input\n  value={value}\n  onChange={e => setValue(e.target.value)}\n/>`,
      angular: `<input [(ngModel)]="value" />`,
      mappings: [{ from: 'controlled input', to: '[(ngModel)]' }],
    },
    {
      id: 'directives',
      icon: '🧱',
      title: 'DOM Behavior Reuse',
      react: `const { bind } = useHover();\n<div {...bind} />`,
      angular: `<div appHighlight></div>`,
      mappings: [{ from: 'DOM hook', to: 'directive' }],
    },
    {
      id: 'pipes',
      icon: '🎨',
      title: 'Formatting',
      react: `{formatCurrency(price)}`,
      angular: `{{ price | currency }}`,
      mappings: [{ from: 'helper function', to: 'pipe' }],
    },
    {
      id: 'di',
      icon: '💉',
      title: 'Dependency Injection',
      react: `const auth = useContext(AuthContext);`,
      angular: `private auth = inject(AuthService);`,
      mappings: [{ from: 'useContext', to: 'inject() — stronger & tree-shakeable' }],
    },
  ];

  readonly realWorldReact = `const { canAccess } = useAuth();`;

  readonly realWorldAngular =
    `private auth = inject(AuthService);\n\n` +
    `@if (auth.canAccess('ADMIN')) {\n` +
    `  <button>Delete</button>\n` +
    `}\n\n` +
    `// or even better with a directive:\n` +
    `<button *appHasRole="'ADMIN'">Delete</button>`;

  readonly jumpLinks = [
    { id: 'philosophy', label: '🧠 Philosophy' },
    { id: 'quick-ref', label: '⚡ Quick Ref' },
    ...this.sections.map((s) => ({ id: s.id, label: `${s.icon} ${s.title}` })),
    { id: 'architecture', label: '🏗️ Architecture' },
    { id: 'realworld', label: '🚀 Real-world' },
  ];
}
