<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Translation\PotentiallyTranslatedString;

class ValidTcpEndpoint implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  Closure(string, ?string=): PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (! is_string($value) || ! preg_match('/^(?:[a-zA-Z0-9.-]+|\[[0-9a-fA-F:]+\]):([1-9][0-9]{0,4})$/', $value)) {
            $fail('validation.regex')->translate();
        }
    }
}
