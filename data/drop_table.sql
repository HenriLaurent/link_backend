BEGIN;



DROP TABLE IF EXISTS
    "user",
    "interest",
    "user_has_liked",
    "user_has_disliked",
    "event",
    "user_is_friend_with",
    "event_has_user",
    "user_has_interest" CASCADE;

COMMIT;