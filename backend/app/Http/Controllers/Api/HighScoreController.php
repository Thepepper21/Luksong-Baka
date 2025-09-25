<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HighScore;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class HighScoreController extends Controller
{
    /**
     * Get the top high scores
     */
    public function index(Request $request): JsonResponse
    {
        $limit = $request->query('limit', 10);
        $limit = min(max($limit, 1), 50); // Limit between 1-50
        
        $highScores = HighScore::getTopScores($limit);
        
        return response()->json([
            'success' => true,
            'data' => $highScores->map(function ($score) {
                return [
                    'id' => $score->id,
                    'player_name' => $score->player_name,
                    'score' => $score->score,
                    'created_at' => $score->created_at->toISOString(),
                ];
            })
        ]);
    }

    /**
     * Store a new high score
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'player_name' => 'required|string|min:1|max:50|regex:/^[a-zA-Z0-9\s\-_]+$/',
            'score' => 'required|integer|min:0'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();
        
        // Additional score validation
        if (!HighScore::isValidScore($data['score'])) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid score value'
            ], 422);
        }

        // Sanitize player name
        $data['player_name'] = trim(strip_tags($data['player_name']));

        try {
            $highScore = HighScore::create($data);
            
            return response()->json([
                'success' => true,
                'message' => 'High score saved successfully',
                'data' => [
                    'id' => $highScore->id,
                    'player_name' => $highScore->player_name,
                    'score' => $highScore->score,
                    'created_at' => $highScore->created_at->toISOString(),
                ]
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to save high score'
            ], 500);
        }
    }
}
