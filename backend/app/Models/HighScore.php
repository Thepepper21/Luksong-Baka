<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HighScore extends Model
{
    protected $fillable = [
        'player_name',
        'score'
    ];

    protected $casts = [
        'score' => 'integer',
    ];

    /**
     * Get the top high scores
     */
    public static function getTopScores($limit = 10)
    {
        return static::orderBy('score', 'desc')
                    ->orderBy('created_at', 'asc')
                    ->limit($limit)
                    ->get();
    }

    /**
     * Validate score is reasonable (prevent cheating)
     */
    public static function isValidScore($score)
    {
        return $score >= 0 && $score <= 999999; // Max reasonable score
    }
}
