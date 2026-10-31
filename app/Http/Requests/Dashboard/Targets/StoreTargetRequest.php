<?php

namespace App\Http\Requests\Dashboard\Targets;

use App\Enums\TargetType;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTargetRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // endpoint: string | null;
        // ai_frequency_value: number | null;
        // ai_frequency_unit: TTargetAIFrequencyUnit;
        // check_uptime: boolean;
        // check_certificate_health: boolean;
        // check_broken_links: boolean;
        // check_mixed_content: boolean;
        // check_lighthouse: boolean;
        // check_scheduled_tasks: boolean;
        // check_application_health: boolean;
        // check_sitemap: boolean;
        // check_dns: boolean;
        // check_domain: boolean;
        // check_dns_blocklist: boolean;
        // check_open_ports: boolean;

        return [
            "type" => ["required", Rule::enum(TargetType::class)],
            "label" => ["nullable", "string", "min:3", "max:255"],
            "endpoint" => ["required", "string", "min:3", "max:255"],

        ];
    }
}
