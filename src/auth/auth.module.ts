import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SupabaseAuthStrategy } from 'nestjs-supabase-auth';
import { SupabseStrategy } from './supabase.strategy';
@Module({
  imports: [PassportModule],
  providers: [SupabseStrategy],
  exports: [SupabaseAuthStrategy],
})
export class AuthModule {}
