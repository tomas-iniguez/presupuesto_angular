<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Contacto extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(){
        Schema::create('contacto', function (Blueprint $table) {
            $table->id();
            $table->integer('tipo_plan_id')->unsigned();
            $table->integer('tipo_inmueble_id')->unsigned();
            $table->integer('mt2');
            $table->string('nombre');
            $table->string('email');
            $table->string('telefono');
            $table->boolean('termino');
            $table->dateTime('created_at');

            $table->foreign('tipo_plan_id')->references('id')->on('tipo_plan');
            $table->foreign('tipo_inmueble_id')->references('id')->on('tipo_inmueble');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(){
        Schema::drop('contacto');
    }
}
