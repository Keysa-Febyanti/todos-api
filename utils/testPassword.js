const mongoose = require("mongoose");
require("dotenv").config();

const User = require("../models/user");

const testPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const user = new User({
      name: "Test User",
      email: `test${Date.now()}@example.com`,
      password: "password123"
    });

    await user.save();

    console.log("Password asli: password123");
    console.log("Password tersimpan:", user.password);
    console.log(
      "Hash berhasil:",
      user.password !== "password123"
    );
    console.log(
      "Password cocok:",
      await user.comparePassword("password123")
    );

    await User.deleteOne({ _id: user._id });
    console.log("Data tes berhasil dihapus.");

  } catch (error) {
    console.error("Tes gagal:", error.message);
  } finally {
    await mongoose.disconnect();
  }
};

testPassword();