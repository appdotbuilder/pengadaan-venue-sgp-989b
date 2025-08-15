<?php

namespace Database\Factories;

use App\Models\ProcurementRequest;
use App\Models\User;
use App\Models\Venue;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProcurementRequest>
 */
class ProcurementRequestFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\ProcurementRequest>
     */
    protected $model = ProcurementRequest::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $jumlahBarang = $this->faker->numberBetween(1, 100);
        
        return [
            'user_id' => User::factory(),
            'venue_id' => Venue::factory(),
            'tanggal_permintaan' => $this->faker->dateTimeBetween('-1 month', '+1 week'),
            'nama_barang' => $this->faker->randomElement([
                'Komputer Desktop',
                'Printer Laser',
                'Kursi Kantor',
                'Meja Kerja',
                'Monitor LCD',
                'Keyboard',
                'Mouse',
                'Speaker',
                'Kamera CCTV',
                'Router WiFi'
            ]),
            'jumlah_barang' => $jumlahBarang,
            'sisa_barang' => $this->faker->optional(0.7)->numberBetween(0, $jumlahBarang),
            'penggunaan' => $this->faker->paragraph(),
            'pic_penerima' => $this->faker->name(),
            'link_barang' => $this->faker->optional(0.6)->url(),
            'note' => $this->faker->optional(0.5)->sentence(),
            'keterangan' => $this->faker->optional(0.8)->paragraph(),
            'status' => $this->faker->randomElement([
                ProcurementRequest::STATUS_PENDING,
                ProcurementRequest::STATUS_APPROVED,
                ProcurementRequest::STATUS_REJECTED,
                ProcurementRequest::STATUS_RECEIVED
            ]),
        ];
    }

    /**
     * Indicate that the procurement request is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => ProcurementRequest::STATUS_PENDING,
        ]);
    }

    /**
     * Indicate that the procurement request is approved.
     */
    public function approved(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => ProcurementRequest::STATUS_APPROVED,
        ]);
    }

    /**
     * Indicate that the procurement request is rejected.
     */
    public function rejected(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => ProcurementRequest::STATUS_REJECTED,
        ]);
    }

    /**
     * Indicate that the procurement request is received.
     */
    public function received(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => ProcurementRequest::STATUS_RECEIVED,
        ]);
    }
}