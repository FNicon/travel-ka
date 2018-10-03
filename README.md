# travel-ka

A site for managing trains and their schedules.

By:

- 13515029 Finiko Kasula Novenda ([FNicon](https://github.com/FNicon))
- 13515046 Lathifah Nurrahmah ([tifahnurr](https://github.com/tifahnurr))
- 13515071 Daniel Pintara ([nieltg](https://github.com/nieltg))
- 13515089 Vincent Hendryanto Halim ([vincenthend](https://github.com/vincenthend))

## Getting Started

### Requirements

To get started with this project, you need these:

- [Node.js](https://nodejs.org/en/download) as the runtime.
- [Yarn](https://yarnpkg.com/en/docs/install) package manager.
- [pg](https://github.com/brianc/node-postgres) node-postgre
- [knex](https://knexjs.org/#Installation) sql query builder

### Development

To prepare this project:

```
$ yarn
```

To connect your local database (Don't forget to create the database)
```
$ set DATABASE_URL=postgres://user:pass@localhost/dbname
```

To update local database
```
$ npx knex migrate:latest
```

Development server can be started by:

```
$ yarn start:dev
```

You can edit the code in `src` directory and the changes will be reflected soon.

# License

[MIT](LICENSE)
