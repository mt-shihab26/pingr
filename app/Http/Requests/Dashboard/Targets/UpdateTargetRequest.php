<?php

namespace App\Http\Requests\Dashboard\Targets;

use Illuminate\Contracts\Validation\ValidationRule;

class UpdateTargetRequest extends StoreTargetRequest
{
    /**
     * Clear saved checks that the selected target type cannot support.
     */
    protected function prepareForValidation(): void
    {
        $allowedChecks = $this->allowedChecks();

        foreach (array_keys(parent::rules()) as $field) {
            if (
                str_starts_with($field, 'check_')
                && ! in_array(substr($field, 6), $allowedChecks, true)
                && ! $this->exists($field)
            ) {
                $this->merge([$field => false]);
            }
        }
    }

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
