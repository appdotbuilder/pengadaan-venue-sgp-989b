<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\ProcurementRequest
 *
 * @property int $id
 * @property int $user_id
 * @property int $venue_id
 * @property string $tanggal_permintaan
 * @property string $nama_barang
 * @property int $jumlah_barang
 * @property int|null $sisa_barang
 * @property string $penggunaan
 * @property string $pic_penerima
 * @property string|null $link_barang
 * @property string|null $note
 * @property string|null $keterangan
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @property-read \App\Models\Venue $venue
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest whereJumlahBarang($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest whereKeterangan($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest whereLinkBarang($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest whereNamaBarang($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest whereNote($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest wherePenggunaan($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest wherePicPenerima($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest whereSisaBarang($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest whereTanggalPermintaan($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest whereVenueId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest pending()
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest approved()
 * @method static \Database\Factories\ProcurementRequestFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class ProcurementRequest extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'venue_id',
        'tanggal_permintaan',
        'nama_barang',
        'jumlah_barang',
        'sisa_barang',
        'penggunaan',
        'pic_penerima',
        'link_barang',
        'note',
        'keterangan',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'tanggal_permintaan' => 'date',
        'jumlah_barang' => 'integer',
        'sisa_barang' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Status constants
     */
    public const STATUS_PENDING = 'menunggu_persetujuan';
    public const STATUS_APPROVED = 'disetujui';
    public const STATUS_REJECTED = 'ditolak';
    public const STATUS_RECEIVED = 'sudah_diterima';

    /**
     * Get status label
     */
    public function getStatusLabelAttribute(): string
    {
        return match($this->status) {
            self::STATUS_PENDING => 'Menunggu Persetujuan',
            self::STATUS_APPROVED => 'Disetujui',
            self::STATUS_REJECTED => 'Ditolak',
            self::STATUS_RECEIVED => 'Sudah Diterima',
            default => $this->status,
        };
    }

    /**
     * Scope a query to only include pending requests.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePending($query)
    {
        return $query->where('status', self::STATUS_PENDING);
    }

    /**
     * Scope a query to only include approved requests.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeApproved($query)
    {
        return $query->where('status', self::STATUS_APPROVED);
    }

    /**
     * Get the user that owns the procurement request
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the venue that owns the procurement request
     */
    public function venue(): BelongsTo
    {
        return $this->belongsTo(Venue::class);
    }
}