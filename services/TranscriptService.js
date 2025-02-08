const LearnAPI = require('./LearnApiService');
const ogGenerator = require('./OgGeneratorUtility');

const msl = new LearnAPI();

async function fetchTranscript(transcriptId) {
    try {
        return await msl.fetchTranscript(transcriptId);
    } catch (error) {
        throw new Error('Error fetching transcript');
    }
}

async function fetchModuleIcon(completedModule) {
    try {
        const module = await msl.fetchModule(completedModule['uid']);
        return `https://learn.microsoft.com${module['iconUrl']}`;
    } catch (error) {
        return 'https://learn.microsoft.com/en-us/training/achievements/generic-badge.svg';
    }
}

async function generateErrorSvg(res) {
    const svg = await ogGenerator(res, 'error');
    res.setHeader('Content-Type', 'image/svg+xml');
    return res.send(svg);
}

async function generateTranscriptSvg(res, transcript) {
    const latestModules = transcript['modulesCompleted'].slice(0, 6);
    for (const completedModule of latestModules) {
        completedModule['icon'] = await fetchModuleIcon(completedModule);
    }

    const data = {
        'userName': transcript['userName'] || 'Unknown user',
        'totalModulesCompleted': transcript['totalModulesCompleted'] || 0,
        'totalTrainingMinutes': transcript['totalTrainingMinutes'] || 0,
        'latestModules': latestModules,
    };

    const svg = await ogGenerator(res, 'transcript', data);
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg);
}

module.exports = {
    fetchTranscript,
    fetchModuleIcon,
    generateErrorSvg,
    generateTranscriptSvg,
};
