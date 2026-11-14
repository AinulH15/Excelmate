<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('formulas', function (Blueprint $table) {
            $table->json('case_table_before')->nullable()->after('study_result');
            $table->json('case_table_after')->nullable()->after('case_table_before');
        });
    }

    public function down(): void
    {
        Schema::table('formulas', function (Blueprint $table) {
            $table->dropColumn(['case_table_before', 'case_table_after']);
        });
    }
};