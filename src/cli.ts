import { build } from "./app"

build()
  .then(app => {
    const port = Number(process.env.PORT) || 8000

    app.listen(port)
    console.log(`App is listening on ${port}`)
  })
  .catch(err => {
    console.error(err)
  })
