<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Employee;
use Faker\Factory as Faker;

class EmployeeSeeder extends Seeder
{
    const TOTAL = 10000;
    
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $employees = [];
        $employeeHierarchy = [];

        for ($i = 1; $i <= self::TOTAL; $i++) {
            $employee = [
                'id' => $i,
                'name' => $faker->firstName(),
                'surname' => $faker->lastName(),
                'position' => $faker->jobTitle(),
                'email' => $faker->unique()->safeEmail(),
                'home_phone' => $faker->phoneNumber(),
                'notes' => $faker->sentence(),
                'boss_id' => null,
            ];

            $possibleBosses = array_filter($employees, function($emp) use ($employee) {
                return $emp['id'] < $employee['id'];
            });

            if (!empty($possibleBosses)) {
                $randomBoss = $faker->randomElement($possibleBosses);
                $employee['boss_id'] = $randomBoss['id'];

                $employeeHierarchy[$employee['id']] = $randomBoss['id'];

                if ($this->hasCircularRelationship($employee['id'], $employee['boss_id'], $employeeHierarchy)) {
                    $employee['boss_id'] = null;
                }
            }

            $employees[] = $employee;
        }

        foreach (array_chunk($employees, 500) as $chunk) {
            Employee::insert($chunk);
        }
    }

    private function hasCircularRelationship($employeeId, $bossId, $employeeHierarchy)
    {
        while ($bossId) {
            if ($bossId == $employeeId) {
                return true;
            }

            $bossId = $employeeHierarchy[$bossId] ?? null;
        }

        return false;
    }
}
