const {
  createEvent,
  findAllEvents,
  invitedInvent,
  myEvent,
  eventDetails,
} = require("../controllers/EventController");

const router = require("express").Router();

router.post("/create-event", createEvent);
router.get("/all-events", findAllEvents);
router.get("/invited-invent/:id", invitedInvent);
router.get("/event-details/:id", eventDetails);
router.get("/my-events/:id", myEvent);

module.exports = router;
