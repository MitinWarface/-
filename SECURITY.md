# Security Policy — TitanBot

We take security seriously. If you discover a vulnerability, please follow the policy below so we can triage and address it safely.

## Summary / Self-hosting clarity

TitanBot is distributed as open-source software for self-hosting. We (the maintainers) do not operate self-hosted instances and do not have access to user data or configurations on third-party deployments. Self-hosters are responsible for securing and operating their instances. This policy describes how to report vulnerabilities affecting the project code and guidance for self-hosters who discover security issues in their deployment.

## Reporting a Vulnerability (preferred)

- Preferred channel: Open a private GitHub Security Advisory for this repository (recommended).
- If you cannot use GitHub Advisories, open a ticket: https://
- Do NOT open a public issue with exploit details.

If you found a problem in your self-hosted instance that appears to be due to misconfiguration, please contact the instance operator/host first. If you believe the issue is caused by a vulnerability in TitanBot code, follow the reporting steps above and indicate whether the report comes from a self-hosted deployment.

## Response timelines (what to expect)

- Acknowledgement: within 72 hours.
- Triage & severity estimate: within 7 days.
- Fix/migration plan:
  - Critical: aim to ship fix or mitigation within 7–14 days.
  - High: aim to ship within 30 days.
  - Medium/Low: addressed in a future release; communicated within 90 days.
- Public disclosure: we will coordinate with the reporter and normally publish an advisory after a patch is released, or within 90 days if unresolved (unless the reporter requests otherwise).

## Safe testing rules (researcher rules of engagement)

- Only test services you own or have explicit permission to test.
- Do not exfiltrate, destroy, or modify user data.
- Do not attempt to escalate to or access Discord user tokens, DMs, or other private user content.
- Provide minimal, safe PoC that reproduces the issue. Redact sensitive data (tokens, PII).
- If the vulnerability requires intrusive testing, contact us first to agree on a plan.

## What to include in your report

- Component affected (e.g., database migration, command parser, OAuth).
- Clear, minimal steps to reproduce.
- Environment: commit SHA, release tag, Docker image tag, or version.
- Whether the issue was observed on a self-hosted deployment (and the deployment configuration).
- PoC (script, HTTP request, logs, screenshots) — sanitize secrets before sharing.
- Impact (data exposure, privilege escalation, RCE, etc.).
- Suggested mitigation (if any).
- Contact info for follow-up.

## Incident reporting from self-hosted deployments

If you operate a self-hosted TitanBot instance and suffer a security incident:

- Immediately rotate any exposed secrets (bot token, DB credentials, API keys).
- Take a snapshot of logs/configuration for investigation (avoid sharing secrets).
- If you need upstream help, file a private security advisory and include sanitized reproduction steps and the TitanBot version/commit.
- The maintainers can only fix vulnerabilities in upstream code; we cannot rotate tokens, restore data, or remediate other hosts' deployments.

## Redis Security

### Self-hosting Redis

If you run Redis independently (not via Railway/Upstash):

- Enable TLS encryption for all Redis connections
- Set a strong password (`requirepass`) in redis.conf
- Bind Redis to localhost or internal network only (`bind 127.0.0.1`)
- Never expose Redis directly to the public internet
- Use Redis with authentication in production environments

### Railway/Upstash Redis

- Railway provides managed Redis with automatic TLS
- Upstash Redis uses REST API with token-based authentication
- Always use the full connection URL with credentials from Railway dashboard
- Rotate Redis access tokens if suspected compromised

## Scope

- In-scope: this repository's code, authentication flows, webhooks provided by this project, and the intended deployment artifacts (Dockerfiles, scripts).
- Out-of-scope: third-party services (Discord itself, hosted DB providers), and instances you do not own without owner consent.

## Maintenance & Hardening advice for self-hosters (recommended defaults)

- Use TLS for all exposed endpoints and webhooks (Let’s Encrypt is fine)
- Do not expose Postgres to the public internet. Use an internal network, VPC, or SSH tunnels
- Run Postgres with authentication, strong passwords, and network restrictions
- Keep secrets out of the repository (use env vars, secret managers, or GitHub Secrets for CI)
- Restrict the bot's Discord intents and permissions to the minimum required
- Enable automatic dependency updates (Dependabot) and security alerts
- Enable secret-scanning for your repo(s) and enable push protection if available
- Rotate bot tokens and API keys when suspected of compromise
- Regular backups for Postgres and test restores regularly
- Monitor logs and alert on suspicious activity (unexpected config changes, mass deletions)
- Use `.env` files for all Redis and database secrets, never commit them

## Disclosure & Credits

- We will credit researchers in release notes/advisories unless you request anonymity
- We may assign a CVE or coordinate with CERT/other bodies for high-severity issues

## Incident reporting from self-hosted deployments

If you operate a self-hosted TitanBot instance and suffer a security incident:

- Immediately rotate any exposed secrets (bot token, DB credentials, API keys)
- Take a snapshot of logs/configuration for investigation (avoid sharing secrets)
- If you need upstream help, file a private security advisory and include sanitized reproduction steps and the TitanBot version/commit
- The maintainers can only fix vulnerabilities in upstream code; we cannot rotate tokens, restore data, or remediate other hosts' deployments

## Redis Implementation Guidance for Railway

When deploying to Railway with Redis:

1. **Redis Setup**:
   - Use Railway's built-in Redis service (redis://redis:6379)
   - Frontend and backend can access via `REDIS_URL="redis://redis:6379"`
   - Enable TLS by configuring Railway's Redis service settings

2. **Environment Variables**:
   ```
   REDIS_URL=redis://redis:6379
   UPSTASH_REDIS_REST_URL=https://redis.upstash.io/your-id
   UPSTASH_REDIS_REST_TOKEN=your-token
   ```

3. **Security Best Practices**:
   - Never store Redis passwords in plain text in deployment configs
   - Use Railway's secret management for Redis credentials
   - Enable Railway's private network for Redis connections
   - Regularly rotate Upstash tokens in the Upstash dashboard
   - Monitor Redis connection usage via Railway logs

4. **Redis Caching Strategy**:
   - PJMEans adds 5-minute TTL to cached response
   - Lrucache for server statistics data transfer
   - Enable `save` events to hash decay functions

## Disclosure & Credits

- We will credit researchers in release notes/advisories unless you request anonymity
- We may assign a CVE or coordinate with CERT/other bodies for high-severity issues

## Privacy & Telemetry

- TitanBot does not phone home or collect usage data by default. (If you plan to add telemetry, it must be opt-in, documented, and transparent.)
- Maintainers do not receive data from self-hosted instances. If you choose to enable any telemetry, document what is collected and how to opt out.

## Contact

- Preferred: GitHub Security Advisory for this repository
- Ticket: https://

Thank you for helping keep TitanBot safe.