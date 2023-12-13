const mongoose = require("mongoose");
const EventSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: false,
    },
    invitedUserId: {
      type: [String],
      required: false,
    },
    event_images: {
      type: [Object],
      required: false,
    },
    event_title: {
      type: String,
      required: true,
    },
    event_Details: {
      type: String,
      required: true,
    },
    event_clubName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    mapLocation: {
      type: {
        lat: {
          type: String,
          required: true,
        },
        lng: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    event_date: {
      type: {
        date_start: {
          type: String,
          required: false,
        },
        date_end: {
          type: String,
          required: false,
        },
      },
      required: true,
    },
    event_time: {
      type: {
        time_start: {
          type: String,
          required: false,
        },
        time_end: {
          type: String,
          required: false,
        },
      },
      required: true,
    },
    joinedPeople: {
      type: [String],
      required: false,
    },
    sharable: {
      type: String,
      enum: ["Public", "Contact", "Private"],
      default: "Public",
    },
    anOtherParticipants: {
      type: Boolean,
      required: false,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const EventModel = mongoose.model("Event", EventSchema);

module.exports = EventModel;
