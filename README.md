## この課題の概要
Next.jsでTo doアプリの課題を行いました。<br>
CRUD機能を実装いたしました。

## フォルダ構成
多くのファイルやフォルダがございますが、その中でも実際に作成した部分のみのフォルダ構成を<br>
下記に示します。
```bash
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── prisma
│   ├── migrations
│   │   ├── 20260522153251_init
│   │   │   └── migration.sql
│   │   ├── 20260526135558
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema.prisma
├── prisma.config.ts
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── README.md
├── src
│   └── app
│       ├── api
│       │   └── todo
│       │       ├── [id]
│       │       │   └── route.ts
│       │       └── route.ts
│       ├── favicon.ico
│       ├── globals.css
│       ├── layout.tsx
│       ├── page.tsx
│       └── todos
│           ├── [id]
│           │   ├── edit
│           │   │   └── page.tsx
│           │   └── page.tsx
│           ├── create
│           │   └── page.tsx
│           └── page.tsx
└── tsconfig.json
```
