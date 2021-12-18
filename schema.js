const {gql} = require('apollo-server-express');

const typeDefs = gql` 

scalar Date

type User {
    id: ID!
    google_id:String!
    first_name:String!
    last_name:String!
    bio: String
    email:String!
    city:String!
    phone: String!
    gender: String!
    age: Int!
    nbr_friend: Int!
    latitude: Float!
    longitude:Float!
    interests:[Interest]
    events:[Event]
    likes:[User]
    matchs:[User]
}

type UserDistance {
    user:User!
    distance:Int!
}

type Interest {
    id:ID!
    title:String!
    users: [User]
}

type Event {
    id: ID!,
    title:String!,
    description:String!
    location:String!
    date:String!
    picture:String!
    creator:String!
    createdAt: Date!
    updatedAt: Date!
    users:[User]

}


type Query {
    user(google_id: String!): User
    usersByCity(city: String!): [User]
    usersByLocation(user_id: ID!,latitude: Float!, longitude: Float!): [UserDistance]
    hello: String
    users: [User]!
    interest(id:ID!): Interest
    interests: [Interest]!
    searchInterest(title: String!): [Interest]
    event(id:ID!): Event
    events: [Event]!
}

type Mutation {
    createUser (google_id:String!,first_name:String!, last_name: String!, email:String!, age:Int!, gender:String!,city:String!,phone:String!, nbr_friend:Int!, latitude:Float!, longitude:Float!): User!
    updateUser(id: ID! gender: String!, phone_number: String!): User!
    deleteUser(id:ID!): User!
    createInterest(title:String!): Interest!
    addInterestToUser(userId: ID!, interestId: ID!): User!
    removeInterestToUser(userId: ID!, interestId: ID!): User!
    addUserToEvent(eventId:ID!, userId:ID!): Event!
    deleteUserFromEvent(eventId:ID!,userId:ID!): Event!
    createEvent(title:String!, description:String!,picture:String!,location:String!,date:String!,creator:Int!) : Event!
    deleteEvent(id:ID!): String
    like(user_id: ID!, friend_id:ID!) : User!
    removeFriendFromUser(user_id: ID!, friend_id:ID!) :User!

}`;

module.exports = typeDefs;