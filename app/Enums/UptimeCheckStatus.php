<?php

namespace App\Enums;

enum UptimeCheckStatus: string
{
    case Up = "up";
    case Degraded = "degraded";
    case Down = "down";
}
