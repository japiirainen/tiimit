# Tiimit

Nopea ja likainen toteutus webbi aplikaatiosta, joka arpoo joukkueet ryhmästä ihmisiä.

## TODO
- make styles at least bearable.
- don't allow empty strings when adding participants to a new group.

## Commands

```bash
yarn dx # runs prisma studio + next
yarn build # runs `prisma generate` + `prisma migrate` + `next build`
yarn test-dev # runs e2e tests on dev
yarn test-start # runs e2e tests on `next start` - build required before
yarn dev-nuke # resets local db
```

## ℹ️ How to switch from SQLite to Postgres

How to switch to postgres

- Remove migrations: `rm -rf ./prisma/migrations`
- Update: `./prisma/schema.prisma` (see commented code)

---
