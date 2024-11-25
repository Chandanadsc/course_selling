const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds

const plainPassword = 'Aman';

// Hashing the password
bcrypt.hash(plainPassword, saltRounds, function (err, hash) {
    if (err) {
        console.error('Error while hashing password:', err);
    } else {
        console.log('Hashed password:', hash);

        // You can store `hash` in your database for later use
        // For example:
        // YourDatabase.saveHashedPassword(hash);
    }
});

