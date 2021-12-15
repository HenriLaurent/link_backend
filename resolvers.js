const db = require('./config/database');
const User = require('./models/user');
const Interest = require('./models/interest');
const Event = require('./models/event');

const haversine = require('haversine')



const resolvers = {
    Query: {
        async user(root, { google_id }, { models }) {
            console.log(typeof google_id, google_id, 'test')
            return User.findOne({ where: { google_id: google_id } })
        },
        async users(root, args, { models }) {
            console.log(root, 'root');
            return User.findAll()
        },
        async interest(root, { id }, { models }) {
            return Interest.findByPk(id)
        },
        async interests(root, args, { models }) {
            return Interest.findAll()
        },
        async searchInterest(root, { title }, { models }) {
            return Interest.findAll({ where: { title: db.where(db.fn('LOWER', db.col('title')), 'LIKE', title.toLowerCase() + '%') } })
        },
        async event(root, { id }) {
            return Event.findByPk(id);
        },
        async events() {
            return Event.findAll()
        },
        async usersByCity(root, args) {
            return User.findAll({
                where: { city: args.city },
                limit: 50
            });
        },
        async usersByLocation(root, args) {
            const users = await User.findAll();
            console.log(args, 'users');
            let array = [];
            users.map((user) => {
                
                console.log(user.latitude, user.longitude, args.latitude, args.longitude , 'latitude')
                let start = {
                    latitude: args.latitude,
                    longitude: args.longitude
                }
                let end = {
                    latitude: user.latitude,
                    longitude: user.longitude
                }
                console.log(haversine(start, end), 'haversine')
                if (haversine(start, end) < 10) {
                    console.log(user, 'user test');
                    if(user.dataValues.id.toString() !== args.user_id) {
                        console.log(user.dataValues.id, args.user_id, 'id')
                        array.push({
                            user,
                            distance: Math.ceil(haversine(start, end))
                        });
                    }
                }
            });
            console.log(array, 'test');
            return array;
        }
    },
    Mutation: {
        async createUser(root, { google_id, first_name, last_name, email, city, gender, phone, age, nbr_friend, latitude, longitude }, { models }) {
            console.log('create user ')
            return User.create({
                google_id,
                first_name,
                last_name,
                email,
                city,
                gender,
                phone,
                age,
                nbr_friend,
                latitude,
                longitude
            });
        },
        async updateUser(root, { id, gender, phone_number }, { models }) {
            return User.findByPk(id).then(user => {
                return user.update({
                    gender,
                    phone_number,
                })
            })
        },

        async deleteUser(root, { id }, { models }) {
            return User.findByPk(id).then(user => {
                user.destroy();
                return user;
            })
        },

        async addInterestToUser(root, args, { models }) {
            return User.findByPk(args.userId).then(user => {
                return Interest.findByPk(args.interestId).then(interest => {
                    user.addInterest(interest);
                    return user.save();
                })
            })
        },

        async removeInterestToUser(root, args, { models }) {
            return User.findByPk(args.userId).then(user => {
                return Interest.findByPk(args.interestId).then(interest => {
                    user.removeInterest(interest);
                    return user.save();
                })
            })
        },

        async like(root, args, { models }) {
            return User.findByPk(args.user_id).then(user => {
                return User.findByPk(args.friend_id).then(friend => {
                    /* console.log(user, 'user')
                    console.log(friend, 'friend') */
                    user.addUser(friend);
                    return friend.save()
                })
            })
        },

        async addUserToEvent(root, args) {
            console.log(args.userId, args.eventId, args, 'args')
            return Event.findByPk(args.eventId).then(event => {
                console.log(event, 'event');
                return User.findByPk(args.userId).then(user => {
                    console.log(user, 'user')
                    event.addUser(user);
                    return event.save()
                })
            })
        },

        async deleteUserFromEvent(root, args) {
            return Event.findByPk(args.eventId).then(event => {
                return User.findByPk(args.userId).then(user => {
                    event.removeUser(user);
                    return event.save()
                })
            })
        },

        async createEvent(root, { title, description, picture, location, date, creator }, { models }) {
            return Event.create({
                title,
                description,
                picture,
                location,
                date,
                creator,
            });
        },

        async createInterest(root, { title }) {
            return Interest.create({
                title
            });
        },

    },
    User: {
        interests(user) {
            return user.getInterest();
        },
        events(user) {
            return user.getEvent();
        },
        likes(user) {
            return user.getUser();
        },
        matchs(user) {

            return user.getUser().then((users) => {
                const usersArray =  users.map(async (userData) => {
                    console.log('mapping')
                    const userInfos = await userData.getUser();
                    const filter = userInfos.filter(userLiked => userLiked.dataValues.id === user.dataValues.id);
                    if(filter.length > 0) {
                        console.log(filter.length, 'ok')
                        return userData;
                    }
                    
                });
                return Promise.all(usersArray).then((array) => {
                    console.log(array, 'array')
                    return array.filter(element => element )
                }); 
            });

        },
    },
    Interest: {
        users(interest) {
            return interest.getUser();
        }
    },
    Event: {
        users(event) {
            return event.getUser();
        }
    }

}

module.exports = resolvers;