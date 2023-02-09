# seo-payload

## Getting started

1. Follow instructions to [install mongodb](https://www.mongodb.com/docs/manual/installation/)
2. Run `nx run seo-payload:serve`
3. Open browser http://localhost:9101/admin

## Some other development experience.

It's not needed when setup development env, just record here in case needed.

### How to copy database from prod env to stage env

https://www.mongodb.com/docs/v4.0/release-notes/4.0-compatibility/#deprecate-copydb-clone-cmds

1. dump data from prod db: mongodump --uri="xxx" --archive="payload-prod" --db=test
2. restore data to stage db: mongorestore --uri="xxx" --archive="payload-prod" --nsFrom=`test.*` --nsTo=`copy-from-prod-2023-02-07.*`
