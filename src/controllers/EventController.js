const EventModel = require("../models/EventModel");

const createEvent = async (req, res) => {
  const eventData = req.body;
  try {
    const { userId, event_title, event_Details, event_clubName } = req.body;

    if (!userId || !event_title || !event_Details || !event_clubName) {
      return res.status(303).json({ message: "All field are required!" });
    }

    const storeData = {
      ...eventData,
    };

    const event = await EventModel.create(storeData);

    return res.status(200).json({
      message: "Event Created Successful",
      event,
    });
  } catch (err) {
    // console.log("createEvent ", err);
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
    // console.log("findAllEvents ", err);
    return res.status(403).json({
      errorMessage: "There was a problem getting the events",
    });
  }
};

const invitedInvent = async (req, res) => {
  const { id } = req.params;
  // console.log("invitedInvent id -> ", id);

  try {
    const events = await EventModel.find({ invitedUserId: id });
    const total = await EventModel.countDocuments({ invitedUserId: id });

    res.status(200).json({
      message: "My Invited Events",
      total: total,
      data: events,
    });
  } catch (err) {
    // console.log("invitedInvent ", err);
    return res.status(403).json({
      errorMessage: "There was a problem getting the events",
    });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await EventModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "Event Deleted",
      data: response,
    });
  } catch (err) {
    // console.log("invitedInvent ", err);
    return res.status(403).json({
      errorMessage: "There was a problem deleting the events",
    });
  }
};

const eventDetails = async (req, res) => {
  const { id } = req.params;
  // console.log("eventDetails id -> ", id);

  try {
    const event = await EventModel.findById(id);

    res.status(200).json({
      message: "My Invited Events",
      data: event,
    });
  } catch (err) {
    // console.log("eventDetails ", err);
    return res.status(403).json({
      errorMessage: "There was a problem getting the events",
    });
  }
};

const joinAnEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await EventModel.findById(id);
    // console.log(event);
    const alreadyJoined = event.joinedPeople;
    // console.log(alreadyJoined);
    const newJoined = [...alreadyJoined, req.body?.email];
    const updated = await EventModel.findByIdAndUpdate(
      id,
      {
        $set: {
          joinedPeople: newJoined,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      message: "Joined Event",
      data: updated,
    });
  } catch (error) {
    return res.status(403).json({
      errorMessage: "There was a problem joining the events",
    });
  }
};

const myEvent = async (req, res) => {
  const { id } = req.params;
  // console.log("invitedInvent id -> ", id);

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
    // console.log("invitedInvent ", err);
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
  deleteEvent,
  joinAnEvent,
};
