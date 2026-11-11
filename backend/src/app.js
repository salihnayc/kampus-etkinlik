import express from "express"
import cors from "cors"
import eventRoutes from "./routes/event-routes"

const app = express();
app.use(cors());
app.use(express.json());

app.use("/events", eventRoutes)

app.use((req, ress) => {
    ress.status(404).json({ error: { message: "Route not found" } });
});

export default app