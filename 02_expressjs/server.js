import express from "express";

const app = express();
const port = 3000;

const router = express.Router();

app.use(express.json()); // parse json from incoming request bodies so we can read it

app.use((req, res, next) => {
    const timestamp = new Date().toISOString();

    console.log(`[${timestamp}] ${req.method} ${req.url}`);

    next();
})

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

    const {make, model, year, price} = req.body;

    const id = Number(req.params.id);

    if(!make || !model || !year || !price)
        {
            return res.status(400).json({error: "Missing Fields"});
        }

    const newCar = {
        id: cars.length + 1,
        make,
        model,
        year: Number(year),
        price: Number(price)
    };
    
    cars.push(newCar);

    res.status(201).json(newCar);
})

// /api/v1/cars/123
router.put("/:id", (req, res) => {
   
    const id = Number(req.params.id);
    const index = cars.findIndex(c => c.id == id);

    if(index == -1)
        {
            return res.status(404).json({error: "car not found"});
        }
    
    const { make, model, year, price} = req.body;
    
    if(make) cars[index].make = make;
    if(model) cars[index].model = model;
    if(year) cars[index].year = Number(year);
    if(price) cars[index].price = Number(price);

    req.json(cars[index]);
})

router.delete("/:id", (req, res) => {
   const id = Number(req.params.id);
   const car = cars.find((car) => car.id == id);

   if(!car) return res.status(404).send("car not found");

   const index = cars.find(car);
   cars.splice(index, 1)[0];

   res.json(car);
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