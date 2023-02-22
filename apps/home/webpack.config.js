const { ModuleFederationPlugin } = require('webpack').container;

/** @type {require('webpack').Configuration} */
module.exports = {
    output: {
        publicPath: 'auto', // we setup the `publicHost` in `angular.json` file
        uniqueName: 'home',
    },
    optimization: {
        runtimeChunk: false,
    },
    experiments: {
        // Allow output javascript files as module source type.
        outputModule: true,
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'home',
            filename: 'remoteEntry.js',
            library: {
                // because Angular v14 will output ESModule
                type: 'module',
            },
            exposes: {
                './HomePageModule': 'apps/home/src/app/modules/home-page/home-page.module.ts'
            },
            /**
             * shared can be an object of type SharedConfig
             * you can change this to select something can be shared
             */
            shared: ['@angular/core', '@angular/common', '@angular/router'],
        }),
    ],
    devServer:{
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
    }
};
