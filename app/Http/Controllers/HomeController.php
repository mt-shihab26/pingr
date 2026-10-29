<?php

namespace App\Http\Controllers;

use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Render the welcome page of the application
     */
    public function index(): Response
    {
        return inertia("welcome");
    }
}
