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
      type: String,
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
      enum: ["public", "contract", "private"],
      default: "private",
    },
    anOtherParticipants: {
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const EventModel = mongoose.model("Event", EventSchema);

module.exports = EventModel;
