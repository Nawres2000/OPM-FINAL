const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  authority: {
    type: String,
    default: "admin",
  },
});

// Hash password before saving admin user
adminSchema.pre("save", async function (next) {
  const admin = this;
  if (!admin.isModified("password")) return next();

  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(admin.password, salt);
  admin.password = hash;
  next();
});

const Admin = mongoose.model("Admin", adminSchema);

// // Create admin user with encrypted password
// const admin = new Admin({
//   email: "nawress.bm33@gmail.com",
//   password: "14265401dD",
//   firstName: "Nawress",
//   lastName: "BM",
// });

// admin.save((err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Admin user created");
//   }
// });

module.exports = Admin;
