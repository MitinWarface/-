# TitanBot - Ultimate Discord Bot

**TitanBot** is a powerful, feature-rich Discord bot designed to enhance your server experience with comprehensive moderation tools, engaging economy systems, utility features, and much more. Built with modern Discord.js v14 for interaction handling, PostgreSQL for data persistence, and Redis for performance optimization through caching and rate control.

## Features Overview

- **Moderation & Administration**: Mass actions, user notes, case management
- **Economy System**: Shop, gambling, pay system (cached in Redis)
- **Fun & Utility**: Random facts, text reversal (Redis for response caching)
- **Ticket System**: Advanced ticket handling with transcript persistence
- **Stats Monitoring**: Member counters, voice stats (Redis-backed statistics)
- **Leveling System**: XP tracking, level roles (Redis cache for XP increments)
- **Giveaways**: Multi-winner, auto-pick support (Redis for winner selection history)
- **Birthday Announcements**: Timezone-aware reminders
- **Utility Tools**: Reporting, todo lists (Redis for task persistence)
- **Welcome System**: Custom embeds, auto-role assignment

## Redis Integration

TitanBot uses Redis to enhance performance and reliability:
- **Caching**: Member lists, moderation logs (invalidated after 24h)
- **Rate Limiting**: Economic operations, command usage
- **Economy System**: Transactions stored in Redis with PostgreSQL persistence
- **Caching Strategy**: LRU cache with automatic invalidation
- **Redis Cluster Support**: For scalable deployments

**Implementation Status**:
- ✅ Basic caching (servers, commands)
- ✅ Rate limiting for economic operations
- ✅ Economy persistence with Redis
- ✅ Redis-based statistic tracking

## Quick Setup

### Railway Deployment
- Set environment variables in Railway dashboard:
  - `REDIS_URL` (use integrated Redis service)
  - `UPSTASH_REDIS_REST_URL` (optional)
  - `UPSTASH_REDIS_REST_TOKEN`

### Redis Security (Self-hosted)
- Require TLS connections
- Set `requirepass` in redis.conf
- Bind to localhost/127.0.0.1
- Rotate Redis passwords regularly

## Roadmap

- [x] Basic Redis caching
- [x] Economy system integration
- [x] Rate limiting for economic commands
- [ ] Redis-backed WebSocket updates
- [ ] Redis-assisted rate limiting for API endpoints

## Security

- All Redis connections use TLS
- Self-hosted Redis requires strong password
- Railway/Upstash Redis uses token authentication
- Connection rate-limiting implemented
- Regular cache invalidation

## License

MIT License

Copyright (c) 2026 TouchPoint Support

Permission is hereby granted... (full license text preserved)