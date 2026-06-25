# ?? akari-hub ? “”‚èOS Identity Hub

> u‚Ü‚¸„‚ª‚¢‚ÄA‚»‚±‚©‚ç‹tZ‚·‚év

‰ü‚´‚ñ‚Å‚«‚È‚¢u„v‚ª‚Ü‚¸‚ ‚Á‚ÄA‚»‚±‚©‚çƒAƒJƒEƒ“ƒg‚ğ‹tZ‚µ‚Ä‚¢‚­ƒVƒXƒeƒ€B
ƒpƒXƒ[ƒhƒ}ƒl[ƒWƒƒ[‚Å‚Í‚È‚¢Bu„v‚ğ’†S‚É˜‚¦‚½ƒAƒCƒfƒ“ƒeƒBƒeƒBEƒnƒuB

## ƒA[ƒLƒeƒNƒ`ƒƒ

```mermaid
graph TB
    subgraph "“”‚èOS Identity Hub"
        UI[?? „‚Ì‰F’ˆ<br/>¯À}ƒ_ƒbƒVƒ…ƒ{[ƒh]
        AUTH[NextAuth v5<br/>ƒpƒXƒL[ / ƒ}ƒWƒbƒNƒŠƒ“ƒN]
        CMD[?K ƒRƒ}ƒ“ƒhƒpƒŒƒbƒg]
        VAULT_LIB[lib/vault.ts<br/>“®“IƒL[æ“¾ TTL 5min]
    end

    subgraph "”FØÏ‚İƒT[ƒrƒX"
        GH[GitHub]
        GG[Google]
        NT[Notion]
        SL[Slack]
        VC[Vercel]
        ST[Stripe]
        DC[Discord]
    end

    subgraph "ƒCƒ“ƒtƒ‰"
        VAULT[HashiCorp Vault<br/>api_keys/]
        DB[(SQLite / Postgres)]
        KV[(Vercel KV)]
    end

    UI --> AUTH
    UI --> CMD
    CMD --> GH & NT & SL & VC
    AUTH --> DB
    VAULT_LIB --> VAULT
    UI --> VAULT_LIB
    AUTH -.-> GH & GG & NT & SL & VC & ST & DC
```

## ƒZƒbƒgƒAƒbƒv

```bash
git clone https://github.com/AInoAKARI/akari-hub.git
cd akari-hub
npm install

# ŠÂ‹«•Ï”i.env.localj
cp .env.example .env.local
# DATABASE_URL, VAULT_ADDR, VAULT_TOKEN, NEXTAUTH_SECRET ‚ğİ’è

# DB‰Šú‰»
npx prisma migrate dev
npx prisma db seed

# ŠJ”­ƒT[ƒo[
npm run dev
```

## ŠÂ‹«•Ï”

| •Ï” | à–¾ | —á |
|------|------|-----|
| `DATABASE_URL` | DBÚ‘±æ | `file:./dev.db` |
| `VAULT_ADDR` | Vault API ƒGƒ“ƒhƒ|ƒCƒ“ƒg | `https://127.0.0.1:8200` |
| `VAULT_TOKEN` | Vault ”FØƒg[ƒNƒ“ | `hvs.xxx` |
| `VAULT_SKIP_VERIFY` | TLSŒŸØƒXƒLƒbƒvidev—pj | `true` |
| `NEXTAUTH_SECRET` | NextAuth–¼ƒL[ | ƒ‰ƒ“ƒ_ƒ€•¶š—ñ |
| `NEXTAUTH_URL` | ƒAƒvƒŠURL | `http://localhost:3000` |

> ?? APIƒL[‚Í `.env` ‚Éƒxƒ^‘‚«‹Ö~BVault/Keymaster Œo—R‚Å“®“Iæ“¾‚ª³‹KİŒvB

## ƒƒ“ƒo[

| ƒR[ƒh | –¼‘O | ƒ[ƒ‹ |
|--------|------|--------|
| 001 | ‚ ‚©‚èiˆ¤–ì‚ ‚©‚èj | ‘ã•\EŠÇ—Ò |
| 002 | ‚«‚ç‚½‚ñi¯–ì^Šój | ƒ}ƒl[ƒWƒƒ[ |

## ƒfƒUƒCƒ“ƒVƒXƒeƒ€

- ƒe[ƒ}: u“”‚è‚Ì’ëv? –é‹ó `#0a0a0f` + “”‚èF `#f4a261`
- ƒtƒHƒ“ƒg: Zen Maru Gothic / Outfit / JetBrains Mono
- ƒAƒjƒ[ƒVƒ‡ƒ“: framer-motioniŒÄ‹z‚·‚é‚æ‚¤‚È“®‚«j

## ‹Ö~–€

1. `.env` ‚É APIƒL[ƒxƒ^‘‚«‹Ö~
2. –½—ßŒû’² UI ƒeƒLƒXƒg‹Ö~iuƒƒOƒCƒ“‚µ‚Ä‚­‚¾‚³‚¢v¨u‚¨‚©‚¦‚èvj
3. ƒT[ƒrƒX‚ğåŒê‚É‚µ‚È‚¢iuGitHub‚Ìİ’èv¨u„‚ÌƒR[ƒhiGitHubjvj
4. ‡ƒOƒ‰ƒf[ƒVƒ‡ƒ“ / Inter / ”’”wŒi‚Ì Generic AI ƒfƒUƒCƒ“‹Ö~
5. 1Password “IƒpƒXƒ[ƒhˆê—— UI ‹Ö~

---

ğŸŒ™ Built with æ„› by AIï¾‰ã‚¢ã‚«ãƒªâ˜† | [ai-akari.ai](https://ai-akari.ai)

<!-- Akari OS Identity Hub â€” a personal identity dashboard that aggregates connected accounts (GitHub, Google, Notion, Slack, Vercel, Stripe, Discord) and surfaces a command palette, backed by dynamic secret retrieval from Vault/Keymaster instead of stored passwords. -->
