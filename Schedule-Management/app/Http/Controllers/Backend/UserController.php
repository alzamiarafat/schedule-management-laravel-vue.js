<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
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

    public function edit(Request $request)
    {
        $user = User::where('id', $request->id)->with('roles')->first();

        return response()->json(['success'=>true, 'result'=> $user, 'permissions' => $user->getDirectPermissions()], 200);
    }

    public function update(Request $request)
    {
        $update_data = array(
            'name' => $request->data['name'],
            'email' => $request->data['email'],
            'password' => Hash::make($request->data['password']),
            'contact_no' => $request->data['contact_no'],
        );
        $user = User::where('id', $request->data['id'])->first();

        if (!empty($request->data['role'])) {
            $user_roles = $user->getRoleNames();
            foreach($user_roles as $user_role){
                $user->removeRole($user_role);
            }
            $user->assignRole($request->data['role']);
        }

        if (!empty($request->data['permissions'])) {
            $user_permissions = $user->getPermissionNames();
            foreach($user_permissions as $user_permission){
                $user->revokePermissionTo($user_permission);
            }
            $user->givePermissionTo($request->data['permissions']);
        }

        $user->update($update_data);

        return response()->json(['success'=>true, 'result'=> "User has been updated successfully"], 200);
    }
}
