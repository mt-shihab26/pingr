<?php

namespace App\Http\Requests\Dashboard\Targets;

use Illuminate\Contracts\Validation\ValidationRule;

class UpdateTargetRequest extends StoreTargetRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return parent::rules();
    }
}
