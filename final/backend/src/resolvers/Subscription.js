const Subscription = {
  gameStart: async (parent, { roomID, user1 }, { RoomModel, pubsub }) => {
    return pubsub.subscribe(`room ${roomID}, ${user1}`);
  },
};

export default Subscription;
