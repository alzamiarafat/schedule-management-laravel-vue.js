<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use http\Env\Response;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class LoginController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->except('login');
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email','password');
        if (!$token = JWTAuth::attempt($credentials)){
            return response()->json(['success'=>false],401);
        }
        return response()->json(['success'=>true, 'token'=>$token],200);
    }

    public function check_token()
    {
        return response()->json(['success'=>true],200);
    }
}
