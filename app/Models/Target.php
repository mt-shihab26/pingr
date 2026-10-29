<?php

namespace App\Models;

use Database\Factories\TargetFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Target extends Model
{
    /** @use HasFactory<TargetFactory> */
    use HasFactory;
}
