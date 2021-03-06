const { Contact: db } = require("../../models");
const { User: udb } = require("../../models");
const { Event: edb } = require("../../models");

module.exports = {
  clearAllCues: () => {
    udb.User.update({}, { $set: { cues: [] } }, { multi: true }, function(
      error,
      properties
    ) {
      if (error) {
        console.log("clearAllCues error: ", error);
      } else {
        console.log(properties);
      }
    });
  },

  // find all contacts with a birthday of a given month & day (and return with owning User)
  cueContactsByBirthdate: (month, day) => {
    dbContacts = db.Contact.find({
      birthMonth: month,
      birthDay: day,
    }).then(dbContacts => {
      // For each Contact found,  identify their parent
      dbContacts.map(contact => {
        console.log("contact userID:", contact.userID);

        // for each parent,  add a cue for this contact's birthday
        console.log(
          "Birthday found: [" + contact.userID,
          +" " + contact.firstName + " " + contact.lastName + " " + "]"
        );

        // Add it to the user's database of cues
        const cueStr =
          contact.firstName.trim() +
          " " +
          contact.lastName.trim() +
          " has a birthday today";

        udb.User.update(
          { _id: contact.userID },
          { $push: { cues: cueStr } },
          () => {
            console.log("completed user update for birthday cues");
          }
        );
      });
    });
  },

  // find all contacts with a birthday of a given month & day (and return with owning User)
  cueEventsByDate: date => {
    dbEvents = edb.Event.find({
      date: date,
      // cues enabled
    }).then(dbEvents => {
      // For each Contact found,  identify their parent
      dbEvents.map(event => {
        console.log("event userID:", event.userID);

        // for each parent,  add a cue for this contact's birthday
        // console.log(
        //   "Event found: [" + event.userID,
        //   +" " + event.title + " " + "]"
        // );

        // Add it to the user's database of cues
        // const cueStr =
        //   contact.firstName.trim() +
        //   " " +
        //   contact.lastName.trim() +
        //   " is happening today";

        // udb.User.update(
        //   { _id: event.userID },
        //   { $push: { cues: cueStr } },
        //   () => {
        //     console.log("completed user update for event cues");
        //   }
        // );
      });
    });
  },
};
