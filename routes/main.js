const express = require("express");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51IdwfeH8KzFo5uc9YHKzp2HOPkZJvH0ij0qhWeg0wQ17G73o5fVJYjMkWOfAmWUgjVZe0DesJvrQKbmAPSacXsVP00qMXnEqFr"
);
const { v4: uuidv4 } = require("uuid");
// Getting Module

const User_Model = require("../models/Users");
const Service_Model = require("../models/Services");
const Client_Model = require("../models/Client");
const Ticket_Model = require("../models/Ticket");
const Order_Model = require("../models/Order");
const Invoice_Model = require("../models/Invoice");
const Subscription_Model = require("../models/Subscription");
const TagOrders_Model = require("../models/TagOrders");
const TagTickets_Model = require("../models/TagTickets");

// TEST
// @GET TEST
// GET
router.get("/test", (req, res) => {
  res.send("Working");
});

//--------------
//USER
//--------------

router.post("/register", async (req, res) => {
  const userData = req.body;
  const newUser = new User_Model(userData);
  const email = userData.email;
  const emailCount = await User_Model.countDocuments({ email });
  if (emailCount > 0) res.status(404).json({ message: "Email already exists" });
  else {
    try {
      await newUser.save();
      res.status(200).json({ message: "Service Added" });
    } catch (error) {
      res.status(404).json({ message: "Something went wrong" });
    }
  }
});
router.get("/checkuser/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User_Model.find({ userId: id });
  try {
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

//--------------
//SERVICE
//--------------

router.get("/getservices", async (req, res) => {
  try {
    const allServices = await Service_Model.find({});
    res.status(200).json(allServices);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

router.get("/getservice/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service_Model.findById(id);
    res.status(200).json(service);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

router.delete("/deleteservice/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    await Service_Model.findByIdAndDelete(_id);
    res.status(200).json({ message: "Service Deleted" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

router.post("/saveservice", async (req, res) => {
  const formData = req.body;
  const newService = new Service_Model(formData);
  try {
    await newService.save();
    res.status(200).json({ message: "Service Added" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

//--------------
//CLIENT
//--------------

router.post("/saveclient", async (req, res) => {
  const formData = req.body;
  const email = formData.email;
  const emailCount = await Client_Model.countDocuments({ email });
  console.log(emailCount);
  if (emailCount > 0) res.status(404).json({ message: "Email already exists" });
  else {
    const newClient = new Client_Model(formData);
    try {
      await newClient.save();
      res.status(200).json({ message: "Client Added" });
    } catch (error) {
      res.status(404).json({ message: "Something went wrong" });
    }
  }
});

router.get("/getclient", async (req, res) => {
  try {
    const allClients = await Client_Model.find({});
    res.status(200).json(allClients);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

router.get("/getclient/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const allClients = await Client_Model.findById(id);
    res.status(200).json(allClients);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});
router.get("/getsubforclient/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const client = await Client_Model.find({ email: email });
    const allSubs = await Subscription_Model.find({
      clientId: client[0]._id,
    });
    res.status(200).json(allSubs);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

router.get("/getorderforclient/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const client = await Client_Model.find({ email: email });
    const allOrders = await Order_Model.find({ clientId: client[0]._id });
    res.status(200).json(allOrders);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

router.get("/getinvforclient/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const client = await Client_Model.find({ email: email });
    const allInvoices = await Invoice_Model.find({ clientId: client[0]._id });
    res.status(200).json(allInvoices);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

router.delete("/deleteclient/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Client_Model.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

//--------------
//TICKET
//--------------

router.post("/saveticket", async (req, res) => {
  const formData = req.body;
  const newTicket = new Ticket_Model(formData);
  try {
    await newTicket.save();
    res.status(200).json({ message: "Ticket Added" });
  } catch (error) {
    // console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
});

router.get("/getticketsclient/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const allTickets = await Ticket_Model.find({ toEmail: email });
    // console.log(allTickets);
    res.status(200).json(allTickets);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});
router.get("/gettickets", async (req, res) => {
  try {
    const allTickets = await Ticket_Model.find({});
    res.status(200).json(allTickets);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

router.get("/getticket/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket_Model.findById(id);
    res.status(200).json(ticket);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});
router.delete("/deleteticket/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket_Model.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

router.get("/searchticket", async (req, res) => {
  const { formData } = req.query;
  try {
    const searchTickets = await Ticket_Model.find({ to: formData });
    res.status(200).json(searchTickets);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

//--------------
//ORDER
//--------------

router.post("/saveorder", async (req, res) => {
  const formData = req.body;
  const newOrder = new Order_Model(formData);
  try {
    await newOrder.save();
    res.status(200).json({ message: "Order Added" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

router.patch("/updatestatus", async (req, res) => {
  const { formData, orderId } = req.body;
  try {
    const newOrder = await Order_Model.findById(orderId);
    newOrder.status = formData;
    await newOrder.save();
    res.status(200).json({ message: "Order Updated" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
});
router.patch("/addmessageorder", async (req, res) => {
  const { message, id } = req.body;
  try {
    const newOrder = await Order_Model.findById(id);
    newOrder.userMessage = message;
    await newOrder.save();
    console.log(newOrder);
    res.status(200).json({ message: "Order Updated" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

router.get("/getorders", async (req, res) => {
  try {
    const allOrders = await Order_Model.find({});
    res.status(200).json(allOrders);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

router.get("/getorder/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order_Model.findById(id);
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

router.delete("/deleteorder/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Order_Model.findByIdAndDelete(id);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

router.get("/searchorder", async (req, res) => {
  const { searchQuery } = req.query;

  try {
    const client = new RegExp(searchQuery, "i");
    const searchOrders = await Order_Model.find({
      $or: [{ client }, { service: client }],
    });
    res.status(200).json(searchOrders);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

router.get("/filterorder", async (req, res) => {
  const { client } = req.query;
  try {
    const clientR = new RegExp(client, "i");
    const searchOrders = await Order_Model.find({
      $or: [{ client: clientR }],
    });
    res.status(200).json(searchOrders);
  } catch (error) {
    // console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
});

router.post("/addmessage", async (req, res) => {
  const messageData = req.body;
  const order = await Order_Model.findById(messageData.orderId);
  order.messages.push(messageData);
  try {
    await order.save();
    res.status(200).json({ message: "Tag Added" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});
router.post("/deletemessage", async (req, res) => {
  const { mes, id } = req.body;
  const order = await Order_Model.findById(id);
  order.messages = order.messages.filter((m) => m.id !== mes);
  try {
    await order.save();
    res.status(200).json({ message: "Tag Added" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

//--------------
//INVOICE
//--------------

router.post("/saveinvoice", async (req, res) => {
  const formData = req.body;
  const newInvoice = new Invoice_Model(formData);
  try {
    await newInvoice.save();
    res.status(200).json({ message: "Invoice Added" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

router.get("/getinvoices", async (req, res) => {
  try {
    const allInvoices = await Invoice_Model.find({});
    res.status(200).json(allInvoices);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});
router.get("/getinvoice/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const invoice = await Invoice_Model.findById(id);
    res.status(200).json(invoice);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

//--------------
//SUBSCRIPTION
//--------------

router.post("/savesub", async (req, res) => {
  const formData = req.body;
  const newSub = new Subscription_Model(formData);
  try {
    await newSub.save();
    res.status(200).json({ message: "Invoice Added" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

router.get("/getsubs", async (req, res) => {
  try {
    const allSubs = await Subscription_Model.find({});
    res.status(200).json(allSubs);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

router.get("/getsub/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const sub = await Subscription_Model.findById(id);
    res.status(200).json(sub);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

//////////
//TAGS ORDERS
//////////

router.post("/addtag", async (req, res) => {
  const { tagField, id } = req.body;
  const newTag = new TagOrders_Model({ tag: tagField, orderId: id });
  console.log(newTag);
  try {
    await newTag.save();
    res.status(200).json({ message: "Tag Added" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

router.get("/gettags/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const allTags = await TagOrders_Model.find({ orderId: id });
    res.status(200).json(allTags);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});
//////////
//TAGS TICKETS
//////////

router.post("/addtagtoticket", async (req, res) => {
  const { tagField, id } = req.body;
  const ticket = await Ticket_Model.findById(id);
  ticket.tags.push(tagField);
  await ticket.save();
  try {
    res.status(200).json({ message: "Tag Added" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

module.exports = router;
