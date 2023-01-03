const Subscription = {
  usersInRoom: {
    subscribe: (parent, { roomId }, { pubsub }) => {
      console.log('sub:', pubsub.subscribe(`usersIn${roomId}`));
      return pubsub.subscribe(`usersIn${roomId}`);
    },
  },
};

export default Subscription;
