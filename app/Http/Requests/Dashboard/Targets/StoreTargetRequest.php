<?php

namespace App\Http\Requests\Dashboard\Targets;

use App\Enums\TargetAIFrequencyUnit;
use App\Enums\TargetType;
use App\Rules\IpAddressOrHostname;
use App\Rules\ValidEndpointPort;
use App\Rules\ValidTcpEndpoint;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class StoreTargetRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'type' => ['required', Rule::enum(TargetType::class)],
            'label' => ['nullable', 'string', 'min:3', 'max:255'],
            'endpoint' => ['bail', 'required', 'string', ...$this->endpointRules()],
            'ai_frequency_value' => [Rule::requiredIf($this->input('type') === 'ai'), 'nullable', 'integer', 'min:1', 'max:365'],
            'ai_frequency_unit' => [Rule::requiredIf($this->input('type') === 'ai'), 'nullable', Rule::enum(TargetAIFrequencyUnit::class)],
            'check_uptime' => ['sometimes', 'boolean'],
            'check_certificate_health' => ['sometimes', 'boolean'],
            'check_broken_links' => ['sometimes', 'boolean'],
            'check_mixed_content' => ['sometimes', 'boolean'],
            'check_lighthouse' => ['sometimes', 'boolean'],
            'check_scheduled_tasks' => ['sometimes', 'boolean'],
            'check_application_health' => ['sometimes', 'boolean'],
            'check_sitemap' => ['sometimes', 'boolean'],
            'check_dns' => ['sometimes', 'boolean'],
            'check_domain' => ['sometimes', 'boolean'],
            'check_dns_blocklist' => ['sometimes', 'boolean'],
            'check_open_ports' => ['sometimes', 'boolean'],
        ];
    }

    /**
     * Get endpoint validation rules based on the target type.
     *
     * @return array<int, ValidationRule|array<mixed>|string>
     */
    private function endpointRules(): array
    {
        return match ($this->input('type')) {
            'website', 'ai' => ['url', 'min:10', 'max:2048'],
            'server' => ['min:4', 'max:253', new IpAddressOrHostname],
            'tcpport' => ['min:6', 'max:259', new ValidTcpEndpoint, new ValidEndpointPort],
            default => [],
        };
    }

    /**
     * Get additional validation rules.
     *
     * @return array<int, \Closure>
     */
    public function after(): array
    {
        return [
            function (Validator $validator) {
                if ($validator->errors()->isNotEmpty()) {
                    return;
                }

                $allowedChecks = $this->allowedChecks();

                $allChecks = [
                    'check_uptime',
                    'check_certificate_health',
                    'check_broken_links',
                    'check_mixed_content',
                    'check_lighthouse',
                    'check_scheduled_tasks',
                    'check_application_health',
                    'check_sitemap',
                    'check_dns',
                    'check_domain',
                    'check_dns_blocklist',
                    'check_open_ports',
                ];

                foreach ($allChecks as $field) {
                    if (
                        ! in_array($field, $allowedChecks, true)
                        && $this->boolean($field)
                    ) {
                        $validator->errors()->add(
                            $field,
                            'This check is not supported for the selected target type.',
                        );
                    }
                }
            },
        ];
    }

    /**
     * Get the checks supported by the selected target type.
     *
     * @return array<int, string>
     */
    protected function allowedChecks(): array
    {
        return match ($this->input('type')) {
            'website' => [
                'check_uptime',
                'check_certificate_health',
                'check_broken_links',
                'check_mixed_content',
                'check_lighthouse',
                'check_scheduled_tasks',
                'check_application_health',
                'check_sitemap',
                'check_dns',
                'check_domain',
                'check_dns_blocklist',
            ],

            'server' => [
                'check_uptime',
                'check_scheduled_tasks',
                'check_dns',
                'check_domain',
                'check_dns_blocklist',
                'check_open_ports',
            ],

            'tcpport' => [
                'check_uptime',
                'check_dns',
                'check_domain',
                'check_dns_blocklist',
            ],

            default => [],
        };
    }
}
