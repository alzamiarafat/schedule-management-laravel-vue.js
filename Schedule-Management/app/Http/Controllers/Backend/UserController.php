<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index()
    {
        $users = User::with('roles')->get();
        return response()->json(['success'=>true, 'result'=>$users]);
    }

    public function store(Request $request)
    {
        $user = new User();
        $user->name = $request->data['name'];
        $user->email = $request->data['email'];
        $user->contact_no = $request->data['contact_no'];
        $user->password = Hash::make($request->data['password']);

        $user->assignRole($request->data['role']);
        $user->givePermissionTo($request->data['permission']);

        $user->save();

        return response()->json(['success'=>true, 'result'=> "User has been created successfully"], 201);
    }
}
