<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Translation\PotentiallyTranslatedString;

class IpAddressOrHostname implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  Closure(string, ?string=): PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $isIp = filter_var($value, FILTER_VALIDATE_IP);

        $isHostname = filter_var(
            $value,
            FILTER_VALIDATE_DOMAIN,
            FILTER_FLAG_HOSTNAME,
        );

        if (! $isIp && ! $isHostname) {
            $fail('The endpoint must be a valid IP address or hostname.');
        }
    }
}
