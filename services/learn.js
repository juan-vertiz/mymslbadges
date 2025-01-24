const axios = require('axios');

module.exports = class LearnAPI {
    constructor() {
        this.baseUrl = 'https://learn.microsoft.com/api';
    }

    async fetch_transcript(transcript_id, locale='en-us', isModuleAssessment=true) {
        try {
            const response = await axios.get(`${this.baseUrl}/profiles/transcript/share/${transcript_id}`, {
                params: {
                    'locale': locale,
                    'isModuleAssessment': isModuleAssessment,
                }
            });
            return response.data;
        } catch (error) {
            console.error(`${error.message} | transcript_id = ${transcript_id}`);
            throw error;
        }
    }

    async fetch_module(module_uid, locale='en-us') {
        try {
            const response = await axios.get(`${this.baseUrl}/hierarchy/modules/${module_uid}`, {
                params: {
                    'locale': locale,
                }
            });
            return response.data;
        } catch (error) {
            console.error(`${error.message} | module_uid = ${module_uid}`);
            throw error;
        }
    }
}
