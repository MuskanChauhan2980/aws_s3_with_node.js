const express = require('express');
const { getSignatureKey, hash } = require("../awsSigV4Utils");
const router= express.Router();
const crypto= require("crypto");


require("dotenv").config();
