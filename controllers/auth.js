const { response } = require("express");

const login = async (req, res = response) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }
};
