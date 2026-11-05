export const setupPrompt = {
    title: "Setup prompt",
    summary:
        "Set up scheduled-task (cron) monitoring for this project with Pingr (https://pingr.app), a monitoring service that alerts the team when a scheduled task doesn't run on time or fails. Tasks report in by pinging Pingr when they run. This works in any project, in any language or framework: detect the stack and use the idiomatic approach. Do everything in code yourself. When a step can only be done by a person in the Pingr dashboard (such as creating an API token), ask the human for the value and continue.",
    details: `

Steps:
1. Find every scheduled task in this project (cron entries, framework schedulers, queue workers).
2. Sync the full list of tasks to Pingr with their schedule and a sensible grace period.
3. Make each task ping Pingr when it starts, when it finishes, and when it fails.
4. On Laravel, install and configure spatie/laravel-schedule-monitor instead of wiring pings by hand.

When done, list every task you registered with its schedule.`,
};
