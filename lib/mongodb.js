const mongoose = require('mongoose');
const config = require('../config');
const EnvVar = require('./mongodbenv');

const defaultEnvVariables = [
    { key: 'ALIVE_IMG', value: 'https://i.ibb.co/hgf2p9M/repository-open-graph-templatefdf.png' },
    { key: 'PREFIX', value: '.' },
    { key: 'AUTO_READ_STATUS', value: 'true' },
    { key: 'MODE', value: 'public' },
    { key: 'STATUS_READ_MSG', value: 'DEW-MD 💚' },
    { key: 'AUTO_VOICE', value: 'true' },
    { key: 'AUTO_REACT_STATUS', value: 'true' },
    { key: 'AUTO_STATUS_REPLY', value: 'true' },
    { key: 'OWNER_NUMBER', value: '94701515609' },
    { key: 'AUTO_REACT', value: 'true' },
    { key: 'IMAGE_LIMIT', value: '3' },
    { key: 'ALWAYS_ONLINE', value: 'true' },
    { key: 'AUTO_TYPING', value: 'true' },
    { key: 'FOOTER', value: 'DEW-MD 💚' },
];

// MongoDB connection function
const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGODB);
        console.log('🛜 MongoDB Connected ✅');

        // Check and create default environment variables
        for (const envVar of defaultEnvVariables) {
            const existingVar = await EnvVar.findOne({ key: envVar.key });

            if (!existingVar) {
                // Create new environment variable with default value
                await EnvVar.create(envVar);
                console.log(`➕ Created default env var: ${envVar.key}`);
            }
        }

    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
