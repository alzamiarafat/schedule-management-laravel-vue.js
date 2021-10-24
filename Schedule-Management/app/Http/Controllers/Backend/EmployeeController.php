<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of the resource.
     *
     * @return null
     */
    public function index()
    {
        $employees = Employee::all();
        return response()->json(['success'=>true, 'result' => $employees]);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function change_status(Request $request)
    {
        $employee = Employee::where('id', $request->id)->first();
        if ($employee->status == 1) {
            $employee->update(['status' => 0 ]);
            return response()->json(['success'=>true, 'result' => 'Employee has been deactived successfully']);
        }else {
            $employee->update(['status' => 1 ]);
            return response()->json(['success'=>true, 'result' => 'Employee has been actived successfully']);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $validated = $request->validate([
        //     'name' => 'required',
        //     'designation' => 'required',
        //     'phone_number' => 'required',
        //     'address' => 'required',
        // ]);
        // $data = $request->only('name','designation','phone_number', 'address');
        // if (!$validated) {
            Employee::create([
                'name' => $request->data['name'],
                'designation' => $request->data['designation'],
                'phone_number' => $request->data['phone_number'],
                'address' => $request->data['address'],
            ]);
            return response()->json(['success'=>true, 'result'=>"Employee has been successfully created"],201);
            // return response()->json(['success'=>true, 'token'=>$request->data['name']],201);
        // }else {
        //     return response()->json(['success'=>false],400);
        // }


    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $employee = Employee::where('id', $request->id)->first();

        return response()->json(['success'=>true, 'result' => $employee],201);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        $employee = Employee::where('id', $request->id)->first();

        return response()->json(['success'=>true, 'result' => $employee],201);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        // $employee = Employee::where('id', $request->id)->first();

        // return response()->json(['success'=>true, 'result' => $employee],201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
