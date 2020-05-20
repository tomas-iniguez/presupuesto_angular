<?php


namespace App\Http\Controllers;

class PresupuestoController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }
    public function componentes(){
        $arrPlan = [];
        $arrInmueble = [];

        $tipoPlanes =  \App\TipoPlan::orderBy('id', 'asc')->get();
        foreach($tipoPlanes as $plan){
            $arrPlan [] = array('id' => $plan->id, 'nombre' => $plan->nombre);
        }

        $tipoInmuebles =  \App\TipoInmueble::orderBy('id', 'asc')->get();
        foreach($tipoInmuebles  as $inmueble){
            $arrInmueble [] = array('id' => $inmueble->id, 'nombre' => $inmueble->nombre);
        }
        
        if(count($arrPlan) > 0 && count($arrInmueble) > 0 ){
            return response()->json(['estado' => true ,'tipoPlan' => $arrPlan, 'tipoInmueble' => $arrInmueble ], 200);
        }
        return response()->json([ 'estado' => false, 'mensaje' => 'Sin datos disponible' ], 404);
    }
    public function contacto(\Illuminate\Http\Request $request){
        try {
            $createdAt = date('Y-m-d H:i:s');
        
            \App\Contacto::insert([
                'tipo_plan_id'      =>  $request->tipoPlan,
                'tipo_inmueble_id'  =>  $request->tipoInmueble,
                'mt2'               =>  $request->mt2,
                'nombre'            =>  $request->contacto['nombre'],
                'email'             =>  $request->contacto['email'],
                'telefono'          =>  $request->contacto['telefono'],
                'termino'           =>  $request->contacto['termino'],
                'created_at'        =>  $createdAt
            ]);

            return response()->json(['estado'=> true, 'resultado' => 'Datos enviados'], 200);
        } catch ( \Exception $e) {
            return response()->json(['estado'=> false, 'resultado' => 'Los datos no fueron enviados'], 404);
        }
    }
}
