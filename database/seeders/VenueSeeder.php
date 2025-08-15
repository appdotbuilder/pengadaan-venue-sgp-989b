<?php

namespace Database\Seeders;

use App\Models\Venue;
use Illuminate\Database\Seeder;

class VenueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $venues = [
            'Patrajasa Slipi',
            'Brin Gatsu',
            'Lippo',
            'Brin Thamrin',
            'Dharmagati',
            'Seskoad',
            'Samisara',
            'Bripens',
            'Paramita',
        ];

        foreach ($venues as $venueName) {
            Venue::create([
                'name' => $venueName,
                'status' => 'active',
            ]);
        }
    }
}