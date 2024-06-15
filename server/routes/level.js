const mongoose = require('mongoose');


// Define the schema
const levelSchema = new mongoose.Schema({
    // I am using the default _id as the level_id and it is being used as the primary key.
    player_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    level_score: { type: Number, required: true },
    level_villian: { type: String, required: true }
});

// Create the model
const Level = mongoose.model('Level', levelSchema);

// Create  a new level
async function createLevel(level) {
    try {
        const newLevel = new Level({
            player_id: new mongoose.Types.ObjectId("60c72b2f9b1d8e7f5f6a8d1a"),
            level_score: 1000,
            level_villian: "Dragon"
        });
        const result = await newLevel.save();
        result.status(200).json(result)
    } catch (err) {
        console.error('Error creating level:', err);
    }
}

// Update a level by ID
async function updateLevel(level_id, updateData) {
    try {
        const result = await Level.findByIdAndUpdate(level_id, {
            player_id: new mongoose.Types.ObjectId("60c72b2f9b1d8e7f5f6a8d1a"),
            level_score: 3000,
            level_villian: "Thanos"
        }, { new: true });
        result.status(200).json(result)
    } catch (err) {
        console.error('Error updating level:', err);
    }
}

module.exports = (createLevel, updateLevel, Level)
