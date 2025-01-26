<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $required = $this->method() === 'POST' ? 'required' : '';

        return [
            'boss_id' => ['nullable', 'integer', 'numeric', 'min:1', 'exists:employees,id'],
            'name' => ['string', 'max:255', $required],
            'surname' => ['string', 'max:255', $required],
            'position' => ['string', 'max:255', $required],
            'email' => ['string', 'email', 'max:255', 'unique:employees,id', $required],
            'home_phone' => ['nullable', 'string', 'min:5', 'max:255',],
            'notes' => ['nullable', 'string', 'min:3', 'max:2000',],
        ];
    }
}
