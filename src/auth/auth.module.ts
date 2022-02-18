import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SupabseStrategy } from './supabase.strategy';
@Module({
  imports: [PassportModule],
  providers: [SupabseStrategy],
  exports: [SupabaseStrategy],
})
export class AuthModule {}
