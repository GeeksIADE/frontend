export const Log = (message, level = 'debug') => {
    const logLevel = process.env.NODE_ENV === 'production' ? 'info' : 'debug';
    if (level === logLevel) {
        console.log(`[${level.toUpperCase()}] ${message}`);
    }
};

