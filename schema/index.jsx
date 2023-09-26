export  const schema = {
  type: "object",
  properties: {
    location: { type: "string" },
    location_coordinates: {
      type: "object",
      properties: {
        lat: { type: "number" },
        long: { type: "number" },
      },
    },
    location_description: { type: "string" },
    reviews: {
      type: "array",
      items: {
        type: "object",
        properties: {
          review: { type: "string" },
          rating: { type: "number" },
          client_name: { type: "string" },
        },
      },
    },
    top_places_nearby: {
      type: "array",
      quantity: 5,
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          rating: { type: "number" },
          address: { type: "string" },
        },
      },
    },
  },
  required: [
    "location",
    "location_coordinates",
    "location_description",
    "reviews",
    "top_places_nearby",
  ],
};

