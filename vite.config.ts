import { resolve } from "path";
import { bunny } from "laravel-vite-plugin/fonts";
import { defineConfig, lazyPlugins } from "vite-plus";
import { reactCompilerPreset } from "@vitejs/plugin-react";

import inertia from "@inertiajs/vite";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import laravel from "laravel-vite-plugin";

export default defineConfig({
    resolve: {
        alias: [
            {
                find: "ziggy-js",
                replacement: resolve("vendor/tightenco/ziggy"),
            },
        ],
    },
    plugins: lazyPlugins(() => [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.tsx"],
            refresh: true,
            fonts: [
                bunny("Instrument Sans", {
                    weights: [400, 500, 600],
                }),
            ],
        }),
        inertia(),
        react(),
        babel({
            presets: [reactCompilerPreset()],
        }),
        tailwindcss(),
    ]),
    server: {
        watch: {
            ignored: [
                "**/.agents/**",
                "**/.claude/**",
                "**/.cursor/**",
                "**/.junie/**",
                "**/vendor/**",
            ],
        },
    },
    lint: {
        ignorePatterns: [
            "vendor/**",
            "node_modules/**",
            "public/**",
            "bootstrap/ssr/**",
            "tailwind.config.js",
            "resources/js/components/ui/*",
        ],
        options: {
            denyWarnings: true,
            typeAware: true,
        },
    },
    fmt: {
        printWidth: 80,
        tabWidth: 4,
        singleQuote: false,
        semi: true,
        singleAttributePerLine: false,
        htmlWhitespaceSensitivity: "css",
        ignorePatterns: [
            ".github/**",
            "composer.json",
            "resources/js/components/ui/*",
            "resources/views/mail/*",
        ],
        sortTailwindcss: {
            functions: ["clsx", "cn", "cva"],
            stylesheet: "resources/css/app.css",
        },
    },
});
