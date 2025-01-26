<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\EmployeeController;

Route::get('/employee-tree', [EmployeeController::class, 'getEmployeeTree']);

Route::resource('employees', EmployeeController::class)->except(['create', 'edit',]);
