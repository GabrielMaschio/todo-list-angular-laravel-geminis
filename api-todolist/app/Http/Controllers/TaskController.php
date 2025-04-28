<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Exception;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        try{
            $query = Task::query();

            if ($request->has('status')) {
                $query->where('status', (bool) $request->status);
            }

            if ($request->has('priority')) {
                $query->where('priority', $request->priority);
            }

            $tasks = $query->orderBy('priority', 'asc')->orderBy('status', 'asc')->get();

            return response()->json(['data' => $tasks], 200);

        } catch(Exception $e) {
            return response()->json([
                'error' => 'TaskController - Index: Erro Interno!',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:16',
                'priority' => 'required|integer|between:1,3',
                'description' => 'required|string|max:168',
            ]);

            $task = Task::create($validated);

            return response()->json(['data' => $task], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'error' => 'Dados inválidos!',
                'message' => $e->errors(),
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'TaskController - Store: Erro Interno!',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, Task $task)
    {
        try {
            $validated = $request->validate([
                'title' => 'sometimes|required|string|max:16',
                'priority' => 'sometimes|required|integer|between:1,3',
                'status' => 'sometimes|required|boolean',
                'description' => 'sometimes|required|string|max:168',
            ]);

            $task->update($validated);

            return response()->json([
                'data' => $task
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'error' => 'Dados inválidos!',
                'message' => $e->errors(),
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'TaskController - Update: Erro Interno!',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy(Task $task)
    {
        try {
            $task->delete();

            return response()->json([
                'message' => 'Tarefa removida com sucesso.'
            ], 204);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'TaskController - Destroy: Erro Interno!',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
