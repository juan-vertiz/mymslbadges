const axios = require('axios');
const winston = require('../services/winston-logger');

const logger = winston.loggers.get('app-service');

module.exports = class LearnAPI {
    constructor() {
        this.baseUrl = 'https://learn.microsoft.com/api';
    }

    async fetch_transcript(transcript_id, locale='en-us', isModuleAssessment=true) {
        try {
            logger.info(`Fetching transcript "${transcript_id}"`);
            const response = await axios.get(`${this.baseUrl}/profiles/transcript/share/${transcript_id}`, {
                params: {
                    'locale': locale,
                    'isModuleAssessment': isModuleAssessment,
                }
            });
            return response.data;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async fetch_module(module_uid, locale='en-us') {
        try {
            logger.info(`Fetching module "${module_uid}"`);
            const response = await axios.get(`${this.baseUrl}/hierarchy/modules/${module_uid}`, {
                params: {
                    'locale': locale,
                }
            });
            return response.data;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
}
