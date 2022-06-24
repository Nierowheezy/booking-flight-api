const { Flights } = require("../models/Flight");
const { v4: uuid } = require("uuid");

exports.example = (req, res) => {
  console.log("example");
  res.send("Flight example");
};

//Get All Flights
exports.getFlights = async (req, res) => {
  try {
    const flights = Flights;
    res.status(200).json({
      message: "All Flights",
      flights,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get Single Flight
exports.getFlight = async (req, res) => {
  try {
    let id = req.params.id;

    const flight = Flights.find((flight) => flight.id === id);

    res.status(200).json({
      message: "Flight Found",
      flight,
    });
  } catch (error) {
    // res.status(500).json({ message: error.message });
  }
};

//Add New Flight
exports.addFlight = async (req, res) => {
  try {
    const { title, time, price, date } = await req.body;

    const newFlight = {
      id: uuid(),
      title,
      time,
      price,
      date,
    };

    Flights.push(newFlight);

    res.status(201).json({
      message: "New Flight Created",
      newFlight,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update Flight
exports.updateFlight = async (req, res) => {
  try {
    let id = req.params.id;

    const flight = Flights.find((flight) => flight.id === id);
    const { title, time, price, date } = await req.body;

    flight.title = title;
    flight.time = time;
    flight.price = price;
    flight.date = date;

    res.status(200).json({
      message: "Flight Updated",
      flight,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Delete Flight
exports.deleteFlight = async (req, res) => {
  try {
    let id = req.params.id;
    const flight = Flights.find((flight) => flight.id === id);
    Flights.splice(Flights.splice(flight), 1);

    res.status(200).json({
      message: "Flight Deleted",
      flight,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
