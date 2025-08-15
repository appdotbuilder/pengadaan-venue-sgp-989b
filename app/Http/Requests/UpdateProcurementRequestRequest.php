<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProcurementRequestRequest extends FormRequest
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
        return [
            'venue_id' => 'required|exists:venues,id',
            'tanggal_permintaan' => 'required|date',
            'nama_barang' => 'required|string|max:255',
            'jumlah_barang' => 'required|integer|min:1',
            'sisa_barang' => 'nullable|integer|min:0',
            'penggunaan' => 'required|string',
            'pic_penerima' => 'required|string|max:255',
            'link_barang' => 'nullable|url',
            'note' => 'nullable|string',
            'keterangan' => 'nullable|string',
            'status' => 'required|in:menunggu_persetujuan,disetujui,ditolak,sudah_diterima',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'venue_id.required' => 'Venue harus dipilih.',
            'venue_id.exists' => 'Venue tidak valid.',
            'tanggal_permintaan.required' => 'Tanggal permintaan harus diisi.',
            'tanggal_permintaan.date' => 'Tanggal permintaan tidak valid.',
            'nama_barang.required' => 'Nama barang harus diisi.',
            'jumlah_barang.required' => 'Jumlah barang harus diisi.',
            'jumlah_barang.integer' => 'Jumlah barang harus berupa angka.',
            'jumlah_barang.min' => 'Jumlah barang minimal 1.',
            'penggunaan.required' => 'Penggunaan harus diisi.',
            'pic_penerima.required' => 'PIC Penerima harus diisi.',
            'link_barang.url' => 'Link barang harus berupa URL yang valid.',
            'status.required' => 'Status harus dipilih.',
            'status.in' => 'Status tidak valid.',
        ];
    }
}