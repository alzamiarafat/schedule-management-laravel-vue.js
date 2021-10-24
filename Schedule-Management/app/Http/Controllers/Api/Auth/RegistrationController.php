<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegistrationController extends Controller
{
    public function registration(Request $request)
    {
        User::create([
           'name' => $request->data['name'],
           'email' => $request->data['email'],
           'password' => Hash::make($request->data['password']),
        ]);

        return response()->json(['success'=>true, 'result'=>"User has been successfully created"],201);

    }
}
