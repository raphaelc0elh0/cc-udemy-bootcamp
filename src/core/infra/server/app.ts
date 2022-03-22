import express, { Router, Request, Response } from "express"
const app = express()
const port = process.env.PORT || "3000"

const route = Router()
route.get("/", (req: Request, res: Response) => {
  res.send("Hello World!")
})
app.use(route)

export default {
  start: () => {
    app.listen(port, () => `server running on port ${port}`)
  }
}
