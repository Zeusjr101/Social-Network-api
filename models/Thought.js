const { Schema, model } = require("mongoose");

const ReactionIdSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      required: true,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      require: true,
      max_length: 280,
    },
    username: {
      type: String,
      require: true,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      require: true,
      minlength: 1,
      max_length: 280,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      require: true,
    },
    reactions: [ReactionIdSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const thought = model("thought", ThoughtSchema);

module.exports = thought;
