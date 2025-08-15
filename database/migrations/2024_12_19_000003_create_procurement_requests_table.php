<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('procurement_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('venue_id')->constrained();
            $table->date('tanggal_permintaan')->comment('Request date');
            $table->string('nama_barang')->comment('Item name');
            $table->integer('jumlah_barang')->comment('Item quantity');
            $table->integer('sisa_barang')->nullable()->comment('Remaining quantity');
            $table->text('penggunaan')->comment('Usage description');
            $table->string('pic_penerima')->comment('Recipient PIC');
            $table->text('link_barang')->nullable()->comment('Item link');
            $table->text('note')->nullable()->comment('Additional notes');
            $table->text('keterangan')->nullable()->comment('Description/remarks');
            $table->enum('status', ['menunggu_persetujuan', 'disetujui', 'ditolak', 'sudah_diterima'])
                ->default('menunggu_persetujuan')
                ->comment('Request status');
            $table->timestamps();
            
            // Add indexes for performance
            $table->index('user_id');
            $table->index('venue_id');
            $table->index('status');
            $table->index('tanggal_permintaan');
            $table->index(['status', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('procurement_requests');
    }
};