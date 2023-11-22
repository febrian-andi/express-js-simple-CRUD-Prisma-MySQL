module.exports = {
    apps: [
        {
            name: 'simple-crud-api',
            script: './bin/www',
            instances: max,
            watch: true,
            exec_mode: 'cluster',
        }
    ]
};
