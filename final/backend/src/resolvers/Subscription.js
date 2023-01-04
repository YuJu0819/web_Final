const Subscription = {
  usersInRoom: {
    subscribe: (parent, { roomId }, { pubsub }) => {
      //console.log('usersub:', pubsub.subscribe(`usersIn${roomId}`));
      return pubsub.subscribe(`usersIn${roomId}`);
    },
  },

  RoomUpdate: {
    subscribe: (parent, { roomId }, { pubsub }) => {
      //console.log('roomsub:', pubsub.subscribe(`RoomUp${roomId}`));
      return pubsub.subscribe(`RoomUp${roomId}`);
    },
  },
};

export default Subscription;
