<?php

namespace App\Enums;

enum TargetType: string
{
    case Website = "website";
    case Server = "server";
    case Tcpport = "tcpport";
    case Ai = "ai";
}
