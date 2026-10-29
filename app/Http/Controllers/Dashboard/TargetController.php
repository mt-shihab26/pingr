<?php

namespace App\Http\Controllers;

use App\Http\Requests\Dashboard\Targets\StoreTargetRequest;
use App\Http\Requests\Dashboard\Targets\UpdateTargetRequest;
use App\Models\Target;

class TargetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): void
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): void
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTargetRequest $request): void
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Target $target): void
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Target $target): void
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTargetRequest $request, Target $target): void
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Target $target): void
    {
        //
    }
}
