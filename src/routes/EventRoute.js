const {
  createEvent,
  findAllEvents,
  invitedInvent,
  myEvent,
  eventDetails,
  deleteEvent,
  joinAnEvent,
  addImagesToEvent,
  updateAnEvent,
} = require("../controllers/EventController");

const router = require("express").Router();

router.post("/create-event", createEvent);
router.get("/all-events", findAllEvents);
router.get("/invited-invent/:id", invitedInvent);
router.get("/event-details/:id", eventDetails);
router.get("/my-events/:id", myEvent);
router.delete("/events/:id", deleteEvent);
router.put("/join/:id", joinAnEvent);
router.put("/addImages/:id", addImagesToEvent);
router.put("/update-event/:id", updateAnEvent);

module.exports = router;
