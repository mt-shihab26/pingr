# Pingr

## Overview

Pingr is an uptime monitoring app with public status pages. Teams add the websites and APIs they care about, Pingr checks them on a schedule from background workers, and the dashboard updates live the moment something goes down. When a monitor fails, the team is alerted by email, Slack, or webhook, and customers can follow along on a branded public status page.

## How It Works

**Add a Monitor** – Enter a URL, pick a check interval (1, 5, or 15 minutes), and optionally set the expected status code, a keyword that must appear in the response, and a timeout.

**Background Checks** – The scheduler dispatches a queued job for every monitor that is due. Each job records the status code, response time, and any error, and retries before marking a monitor as down to avoid false alarms.

**Live Dashboard** – Status changes are broadcast over Laravel Reverb, so monitors flip from green to red in the browser instantly without a page refresh.

**Alerts & Incidents** – When a monitor goes down, an incident opens automatically and notifications go out on every channel the team has configured. When it recovers, the incident closes and a recovery alert is sent with the total downtime.

**Public Status Page** – Each team gets a status page at `/status/{team}` showing current status, 90-day uptime bars, and incident history with updates the team posts.

## Features

**HTTP & Keyword Monitors** – Check status codes, response time, and the presence of a keyword in the response body

**SSL Certificate Expiry** – Daily check that warns the team 14 and 3 days before a certificate expires

**Real-Time Dashboard** – Live status, response-time sparklines, and uptime percentages pushed over WebSockets

**Response-Time & Uptime Charts** – 24-hour, 7-day, and 30-day charts with average, p95, and uptime percentage

**Incident Management** – Automatic incidents on downtime, plus manual incident updates (investigating, identified, monitoring, resolved)

**Multi-Channel Notifications** – Email, Slack, and signed webhooks, configurable per monitor

**Public Status Pages** – Branded page per team with uptime history, incident timeline, and server-side rendering for fast loads and SEO

**Maintenance Windows** – Schedule maintenance so checks pause and alerts stay quiet

**Teams & Roles** – Invite members by email with Owner, Admin, and Viewer roles enforced through policies

**REST API** – Manage monitors and read check results with personal API tokens, versioned resources, and rate limiting

**Plans & Billing** – Free plan with 5 monitors at 5-minute intervals; Pro plan with unlimited monitors and 1-minute checks, billed through Stripe

**Data Retention** – Raw check results are rolled up into hourly and daily aggregates, and old raw data is pruned on a schedule

**Admin Dashboard** – Overview of users, teams, monitors, queue health, and revenue

## Laravel Highlights

- **Queues & Horizon** – Check jobs with retries, backoff, and rate-limited middleware, monitored through Horizon
- **Task Scheduling** – Dispatches due checks every minute, runs SSL checks daily, and prunes old data nightly
- **Broadcasting** – Private team channels on Laravel Reverb, consumed with Laravel Echo in React
- **Events & Notifications** – `MonitorWentDown` and `MonitorRecovered` events fan out to mail, Slack, and webhook notification channels
- **Authorization** – Policies and gates scope every monitor, incident, and status page to the current team
- **Sanctum** – Token-based authentication for the REST API
- **Cashier** – Stripe subscriptions with plan limits enforced in middleware
- **Testing** – Pest feature tests using `Http::fake()`, `Queue::fake()`, `Notification::fake()`, and `Event::fake()`

## Tech Stack

- **Backend:** Laravel + PHP (queues, scheduler, Reverb, Sanctum, Cashier)
- **Frontend:** React + TypeScript with Inertia.js (SSR for status pages)
- **Styling:** TailwindCSS + shadcn/ui
- **Charts:** Recharts
- **Database & Queue:** MySQL + Redis
- **Payments:** Stripe
- **Testing:** Pest

## Live Application

Visit the live application at [pingr.developershihab.com](https://pingr.developershihab.com)
