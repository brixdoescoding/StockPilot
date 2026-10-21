<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        $permissions = [
            'view products',
            'create products',
            'edit products',
            'delete products',
            'view categories',
            'manage categories',
            'view suppliers',
            'manage suppliers',
            'view inventory transactions',
            'create inventory transactions',
            'view users',
            'manage users',
        ];

        foreach ($permissions as $permission)
        {
            Permission::firstOrCreate([
                'name' => $permission,
                'guard_name' => 'web',
            ]);
        }

        $admin = Role::findByName('Admin', 'web');
        $staff = Role::findByName('Staff', 'web');

        $admin->syncPermissions($permissions);

        $staff->syncPermissions([
            'view products',
            'view categories',
            'view suppliers',
            'view inventory transactions',
            'create inventory transactions',
        ]);

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }
}
