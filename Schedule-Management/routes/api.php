<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\LogoutController;
use App\Http\Controllers\Backend\AdminController;
use App\Http\Controllers\Api\Auth\RegistrationController;
use App\Http\Controllers\Backend\EmployeeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
   return $request->user();
});

Route::group(['namespace'=>'Api'],function (){

    Route::post('registration', [RegistrationController::class, 'registration']);
    Route::post('login', [LoginController::class, 'login']);
    Route::post('check-token', [LoginController::class, 'check_token']);
    Route::post('logout', [LogoutController::class, 'logout']);

    Route::prefix('/employees')->middleware('auth:api')->group( function() {
        //employee
        Route::post('/', [EmployeeController::class, 'index']);
        Route::post('/store', [EmployeeController::class, 'store']);
        Route::post('/change-status', [EmployeeController::class, 'change_status']);
    });
});
