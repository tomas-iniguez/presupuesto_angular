<?php

use Illuminate\Http\Response;
use Illuminate\Http\Request;

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

        $tipoPlanes =  \App\TipoPlan::all();
        foreach($tipoPlanes as $plan){
            $arrPlan [] = array('id' => $plan->id, 'nombre' => $plan->nombre);
        }

        $tipoInmuebles =  \App\TipoInmueble::all();
        foreach($tipoInmuebles  as $inmueble){
            $arrInmueble [] = array('id' => $inmueble->id, 'nombre' => $inmueble->nombre);
        }
        
        if(count($arrPlan) > 0 && count($arrInmueble) > 0 ){
            return response()->json(['estado' => true ,'tipoPlan' => $arrPlan, 'tipoInmueble' => $arrInmueble ], 200);
        }
        return response()->json([ 'estado' => false, 'mensaje' => 'Sin datos disponible' ], 404);
    }
}
