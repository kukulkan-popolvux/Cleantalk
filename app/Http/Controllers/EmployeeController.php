<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Http\Requests\EmployeeRequest;

class EmployeeController extends Controller
{
    public function index()
    {
        return response()->json(Employee::paginate(50));
    }

    public function show(Employee $employee)
    {
        return response()->json($employee);
    }

    public function store(EmployeeRequest $requesr)
    {
        return response()->json(Employee::create($requesr->all()));
    }

    public function update(EmployeeRequest $request, Employee $employee)
    {
        return response()->json($employee->update($request->all()));
    }

    public function destroy(Employee $employee)
    {
        return response()->json($employee->delete());
    }

    public function getEmployeeTree()
    {
        return response()->json(Employee::with('subordinates')->whereNull('boss_id')->get());
    }
}
