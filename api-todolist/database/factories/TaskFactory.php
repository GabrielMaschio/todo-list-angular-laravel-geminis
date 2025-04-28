<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use app\Models\Task;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    protected $model = Task::class;

    public function definition()
    {
        return [
            'title' => $this->faker->words(2, true),
            'description' => $this->faker->text(168),
            'priority' => $this->faker->numberBetween(1, 3),
            'status' => $this->faker->boolean(40),
        ];
    }
}
