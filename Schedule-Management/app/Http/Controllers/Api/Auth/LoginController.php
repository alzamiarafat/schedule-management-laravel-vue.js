<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class LoginController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->except('login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();
        if (!empty($user) && Hash::check($request->password, $user->password)){
            $credentials = $request->only('email','password');
            if (!$token = JWTAuth::attempt($credentials)){
                return response()->json(['success'=>false],401);
            }
            return response()->json(['success'=>true, 'token'=>$token, 'result' => $user],200);
        }else {
            return response()->json(['success'=>false, 'status' => 500]);
        }


    }

    public function check_token()
    {
        return response()->json(['success'=>true],200);
    }
}
