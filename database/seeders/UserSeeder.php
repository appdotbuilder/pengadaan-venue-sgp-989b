<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a superadmin user
        User::create([
            'name' => 'Super Admin',
            'email' => 'admin@sgpgroup.com',
            'password' => Hash::make('admin123'),
            'role' => 'superadmin',
            'email_verified_at' => now(),
        ]);

        // Create a regular user
        User::create([
            'name' => 'Regular User',
            'email' => 'user@sgpgroup.com',
            'password' => Hash::make('user123'),
            'role' => 'user',
            'email_verified_at' => now(),
        ]);
    }
}