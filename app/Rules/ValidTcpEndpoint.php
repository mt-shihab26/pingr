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
        if (! is_string($value) || ! preg_match('/^(\[[0-9a-fA-F:]+\]|[a-zA-Z0-9.-]+):([1-9][0-9]{0,4})\z/', $value, $matches)) {
            $fail('validation.regex')->translate();

            return;
        }

        $host = $matches[1];

        if (str_starts_with($host, '[')) {
            $validHost = filter_var(substr($host, 1, -1), FILTER_VALIDATE_IP, FILTER_FLAG_IPV6);
        } elseif (preg_match('/^[0-9.]+\z/', $host)) {
            $validHost = filter_var($host, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4);
        } else {
            $validHost = filter_var($host, FILTER_VALIDATE_DOMAIN, FILTER_FLAG_HOSTNAME);
        }

        if (! $validHost) {
            $fail('validation.regex')->translate();
        }
    }
}
