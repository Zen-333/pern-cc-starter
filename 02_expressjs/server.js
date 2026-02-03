import express from "express";

const app = express();
const port = 3000;

const router = express.Router();

app.use(express.json()); // parse json from incoming request bodies so we can read it

let cars = [
    {id: 1, make: "Toyota", model: "ccc", year: 2022, price: 99},
    {id: 2, make: "lambo", model: "lll", year: 2072, price: 3144315},
    {id: 3, make: "ferari", model: "fff", year: 2432, price: 2441345},
]

app.get("/", (req, res) => {
    res.send("Hello from the Cars API");
})

router.get("/", (req, res) => {
    res.json(cars);
})

router.post("/", (req, res) => {
    res.send("new car");
})

// /api/v1/cars/123
router.put("/:id", (req, res) => {
    req.send("update car");
})

router.delete("/:id", (req, res) => {
    req.send("Delete car");
})

router.get("/:id", (req, res) => { // router adds default "/api/v1" before /:id
   const id = Number(req.params.id); // everything we get is in string format so we need to convert it into a number
   const car = cars.find((car) => car.id == id);

   if(!car) return res.status(404).send("car not found");

   res.json(car);
})

/* 
app.delete("/api/v1/cars/:id", (req, res) => {
    req.send("Delete car");
})

app.get("/api/v1/cars/:id", (req, res) => {
    res.send("get car");
})
*/
app.use("/api/v1/cars", router);

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));