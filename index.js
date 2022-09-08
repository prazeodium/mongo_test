// @ts-nocheck
const mongoose = require("mongoose");
const fs = require("fs");
require("dotenv").config();
const FirstModel = require("./first.model");
const SecondModel = require("./second.model");

const MONGO_URI =
    process.env.MONGO_URI; /* || 'mongodb://127.0.0.1:27017/test' */

const firstRawData = JSON.parse(fs.readFileSync("./first.json", "utf-8"));
const secondRawData = JSON.parse(fs.readFileSync("./second.json", "utf-8"));

async function main() {
    try {
        mongoose.connect(MONGO_URI);
    } catch (error) {
        console.log(error);
    }

    await FirstModel.insertMany(firstRawData);
    await SecondModel.insertMany(secondRawData);

    await FirstModel.aggregate([
        {
            $addFields: {
                longitude: { $arrayElemAt: ["$location.ll", 0] },
                latitude: { $arrayElemAt: ["$location.ll", 1] },
            },
        },
        {
            $lookup: {
                from: "seconds",
                let: { country: "$country" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$$country", "$country"],
                            },
                        },
                    },
                    {
                        $project: {
                            overallStudents: 1,
                            _id: 0,
                        },
                    },
                ],
                as: "total",
            },
        },
        {
            $set: {
                total: {
                    $arrayElemAt: ["$total.overallStudents", 0],
                },
            },
        },
        {
            $addFields: {
                Diffs: {
                    $map: {
                        input: "$students",
                        as: "student",
                        in: {
                            $subtract: ["$total", "$$student.number"],
                        },
                    },
                },
            },
        },
        {
            $group: {
                _id: "$country",
                count: { $count: {} },
                allDiffs: { $push: "$Diffs" },
                longitude: { $push: "$longitude" },
                latitude: { $push: "$latitude" },
            },
        },
        {
            $addFields: {
                allDiffs: {
                    $reduce: {
                        input: "$allDiffs",
                        initialValue: [],
                        in: { $concatArrays: ["$$value", "$$this"] },
                    },
                },
            },
        },
        {
            $out: "third",
        },
    ]);
}

main()
    .then(() => process.exit(0))
    .catch((err) => console.log(err));
