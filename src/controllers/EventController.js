const EventModel = require("../models/EventModel");

const event = {
  userId: "456234532",
  invitedUserId: ["877777", "7184378920"],
  event_thermel: "www.image.url",
  event_title: "This is Event Title",
  event_Details:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi dicta nostrum nihil pariatur inventore quam mollitia expedita asperiores aperiam distinctio, officia doloribus exercitationem quis reprehenderit laboriosam cupiditate perferendis beatae tempore.",
  event_clubName: "This is Club Name",
  location: "Pabna, BanglaDesh",
  mapLocation: {
    lat: "87ss89sdfsdf",
    lng: "786da89sd0fs",
  },
  event_date: "01-01-2024",
  event_time: {
    time_start: "7:00 am",
    time_end: "10:00 pm",
  },
  joinedPeople: ["82734839", "28739"],
};
const data = [
  {
    _id: "655ca281977540ad77962527",
    userId: "456234532",
    invitedUserId: ["877777", "7184378920"],
    event_thermel: "www.image.url",
    event_title: "This is Event Title",
    createdAt: "2023-11-21T12:28:49.037Z",
    updatedAt: "2023-11-21T12:28:49.037Z",
    __v: 0,
  },
  {
    _id: "655ca699b0bee16760a39f55",
    userId: "456234532",
    invitedUserId: ["877777", "7184378920", "877777534"],
    event_thermel: "www.image.url",
    event_title: "This is testing Event Title",
    createdAt: "2023-11-21T12:46:17.729Z",
    updatedAt: "2023-11-21T12:46:17.729Z",
    __v: 0,
  },
];

const createEvent = async (req, res) => {
  try {
    const {
      userId,
      invitedUserId, // remove
      event_thermel,
      event_title,
      event_Details,
      event_clubName,
      location,
      mapLocation: { lat, lng },
      event_date,
      event_time: { time_start, time_end },
      joinedPeople,
    } = req.body;

    if (
      !event_thermel ||
      !userId ||
      !event_title ||
      !event_Details ||
      !event_date ||
      !event_clubName
    ) {
      return res.status(303).send("All field are required!");
    }

    const storeData = {
      userId,
      invitedUserId,
      event_thermel,
      event_title,
      event_Details,
      event_clubName,
      location,
      mapLocation: { lat, lng },
      event_date,
      event_time: { time_start, time_end },
      joinedPeople,
    };

    const event = await EventModel.create(storeData);

    return res.status(200).json({
      message: "Event Created Successful",
      event,
    });
  } catch (err) {
    console.log("createEvent ", err);
    res.status(403).json({
      errorMessage: "Server Broken",
    });
  }
};

const findAllEvents = async (req, res) => {
  try {
    const events = await EventModel.find();
    const total = await EventModel.countDocuments();

    res.status(200).json({
      message: "All Events",
      total: total,
      data: events,
    });
  } catch (err) {
    console.log("findAllEvents ", err);
    return res.status(403).json({
      errorMessage: "There was a problem getting the events",
    });
  }
};

const invitedInvent = async (req, res) => {
  const { id } = req.params;
  console.log("invitedInvent id -> ", id);

  try {
    const events = await EventModel.find({ invitedUserId: id });
    const total = await EventModel.countDocuments({ invitedUserId: id });

    res.status(200).json({
      message: "My Invited Events",
      total: total,
      data: events,
    });
  } catch (err) {
    console.log("invitedInvent ", err);
    return res.status(403).json({
      errorMessage: "There was a problem getting the events",
    });
  }
};

const eventDetails = async (req, res) => {
  const { id } = req.params;
  console.log("eventDetails id -> ", id);

  try {
    const event = await EventModel.findById(id);

    res.status(200).json({
      message: "My Invited Events",
      data: event,
    });
  } catch (err) {
    console.log("eventDetails ", err);
    return res.status(403).json({
      errorMessage: "There was a problem getting the events",
    });
  }
};

const myEvent = async (req, res) => {
  const { id } = req.params;
  console.log("invitedInvent id -> ", id);

  try {
    let events = {};
    let total = 0;

    const ownEvents = await EventModel.find({ userId: id });
    const ownEventsTotal = await EventModel.countDocuments({ userId: id });

    const invitedEvents = await EventModel.find({ invitedUserId: id });
    const invitedEventsTotal = await EventModel.countDocuments({
      invitedUserId: id,
    });

    const joinedEvents = await EventModel.find({ joinedPeople: id });
    const joinedEventsTotal = await EventModel.countDocuments({
      joinedPeople: id,
    });

    events = {
      ownEvents: { total: ownEventsTotal, ownEvents },
      invitedEvents: { total: invitedEventsTotal, invitedEvents },
      joinedEvents: { total: joinedEventsTotal, joinedEvents },
    };

    total = ownEventsTotal + invitedEventsTotal + joinedEventsTotal;

    res.status(200).json({
      message: "My all Events",
      totalEvent: total,
      data: events,
    });
  } catch (err) {
    console.log("invitedInvent ", err);
    return res.status(403).json({
      errorMessage: "There was a problem getting the events",
    });
  }
};

module.exports = {
  createEvent,
  findAllEvents,
  invitedInvent,
  eventDetails,
  myEvent,
};
